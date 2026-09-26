// src/lib/progress-engine.ts
// Core server-side progress calculation logic (TASK-012)

import { prisma } from "@/lib/prisma"
import { QUIZ_PASS_SCORE, QUIZ_MAX_ATTEMPTS, QUIZ_COOLDOWN_HOURS, LESSON_READ_THRESHOLD, MIN_EXERCISES_REQUIRED } from "@/lib/constants"

// ============================================================
// DAY COMPLETION CHECK
// ============================================================

export interface CompletionStatus {
  canComplete: boolean
  lessonRead: boolean
  quizPassed: boolean
  exercisesDone: boolean
  missionSubmitted: boolean
  missingCriteria: string[]
}

export async function checkDayCompletion(
  userId: string,
  dayId: number
): Promise<CompletionStatus> {
  const progress = await prisma.userProgress.findUnique({
    where: { userId_dayId: { userId, dayId } },
  })

  const missing: string[] = []

  const lessonRead = (progress?.lessonReadPct ?? 0) >= LESSON_READ_THRESHOLD
  const quizPassed = progress?.quizPassed ?? false
  const exercisesDone = (progress?.exercisesDone ?? 0) >= MIN_EXERCISES_REQUIRED
  const missionSubmitted = progress?.missionSubmitted ?? false

  if (!lessonRead) missing.push("Read at least 80% of the lesson")
  if (!quizPassed) missing.push("Pass the quiz (70% or higher)")
  if (!exercisesDone) missing.push("Complete at least 1 practice exercise")
  if (!missionSubmitted) missing.push("Submit today's mission")

  return {
    canComplete: missing.length === 0,
    lessonRead,
    quizPassed,
    exercisesDone,
    missionSubmitted,
    missingCriteria: missing,
  }
}

// ============================================================
// MARK DAY COMPLETE
// ============================================================

export async function markDayComplete(userId: string, dayId: number, dayNumber: number) {
  const completion = await checkDayCompletion(userId, dayId)
  if (!completion.canComplete) {
    return { success: false, missing: completion.missingCriteria }
  }

  // Update this day's progress
  await prisma.userProgress.update({
    where: { userId_dayId: { userId, dayId } },
    data: {
      status: "completed",
      completedAt: new Date(),
    },
  })

  // Unlock next day if it exists
  const nextDay = await prisma.day.findUnique({
    where: { dayNumber: dayNumber + 1 },
  })

  if (nextDay) {
    await prisma.userProgress.upsert({
      where: { userId_dayId: { userId, dayId: nextDay.id } },
      update: { status: "available", lastAccessed: null },
      create: {
        userId,
        dayId: nextDay.id,
        status: "available",
      },
    })
  }

  // Update profile's currentDay
  await prisma.profile.update({
    where: { userId },
    data: { currentDay: Math.max(dayNumber + 1, 1) },
  })

  // Update streak
  await updateStreak(userId)

  // Award XP
  const day = await prisma.day.findUnique({ where: { id: dayId } })
  if (day) {
    await prisma.profile.update({
      where: { userId },
      data: { totalXp: { increment: day.xpReward } },
    })
  }

  // Check phase completion achievements
  await checkPhaseAchievements(userId, dayNumber)

  return { success: true }
}

// ============================================================
// STREAK LOGIC
// ============================================================

export async function updateStreak(userId: string) {
  const profile = await prisma.profile.findUnique({ where: { userId } })
  if (!profile) return

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Check if there was any progress yesterday
  const yesterdayProgress = await prisma.userProgress.findFirst({
    where: {
      userId,
      lastAccessed: {
        gte: yesterday,
        lt: today,
      },
    },
  })

  // Check if there was any progress today already
  const todayProgress = await prisma.userProgress.findFirst({
    where: {
      userId,
      lastAccessed: {
        gte: today,
      },
    },
  })

  let newStreak = profile.streak

  if (todayProgress && !yesterdayProgress && profile.streak === 0) {
    // Starting fresh streak
    newStreak = 1
  } else if (todayProgress && yesterdayProgress) {
    // Continuing streak
    newStreak = profile.streak + 1
  } else if (!yesterdayProgress && !todayProgress) {
    // Missed a day — reset
    newStreak = 0
  }

  await prisma.profile.update({
    where: { userId },
    data: {
      streak: newStreak,
      longestStreak: Math.max(newStreak, profile.longestStreak),
    },
  })

  // Check streak achievements
  if (newStreak === 7) await awardAchievement(userId, "streak_7_days")
  if (newStreak === 30) await awardAchievement(userId, "streak_30_days")
}

// ============================================================
// PROGRESS SUMMARY
// ============================================================

export async function getProgressSummary(userId: string) {
  const [profile, allProgress, phases] = await Promise.all([
    prisma.profile.findUnique({ where: { userId } }),
    prisma.userProgress.findMany({
      where: { userId },
      include: { day: { include: { phase: true } } },
    }),
    prisma.phase.findMany({ orderBy: { number: "asc" } }),
  ])

  if (!profile) return null

  const daysCompleted = allProgress.filter((p) => p.status === "completed").length
  const overallPercent = Math.round((daysCompleted / 90) * 100)

  // Phase summaries
  const phaseSummaries = phases.map((phase) => {
    const phaseDays = allProgress.filter((p) => p.day.phaseId === phase.id)
    const phaseCompleted = phaseDays.filter((p) => p.status === "completed").length
    const phaseTotal = phase.endDay - phase.startDay + 1

    return {
      phaseId: phase.id,
      phaseNumber: phase.number,
      phaseName: phase.name,
      colorHex: phase.colorHex,
      daysTotal: phaseTotal,
      daysCompleted: phaseCompleted,
      completionPercent: Math.round((phaseCompleted / phaseTotal) * 100),
    }
  })

  // Skill scores (simplified — based on completion within skill phases)
  const skillScores = calculateSkillScores(allProgress)

  return {
    currentDay: profile.currentDay,
    overallPercent,
    streak: profile.streak,
    longestStreak: profile.longestStreak,
    totalXp: profile.totalXp,
    daysCompleted,
    phaseSummaries,
    skillScores,
  }
}

function calculateSkillScores(
  progress: Array<{
    status: string
    quizBestScore: number
    exercisesDone: number
    day: { skill: string }
  }>
) {
  const skills = ["foundations", "excel", "sql", "statistics", "power_bi", "python", "business_analysis", "projects", "job_prep", "job_launch"]
  const scores: Record<string, number> = {}

  for (const skill of skills) {
    const skillDays = progress.filter((p) => p.day.skill === skill)
    if (skillDays.length === 0) {
      scores[skill] = 0
      continue
    }

    const completionRate = skillDays.filter((p) => p.status === "completed").length / skillDays.length
    const avgQuizScore = skillDays.reduce((sum, p) => sum + p.quizBestScore, 0) / skillDays.length
    const exerciseRate = Math.min(1, skillDays.reduce((sum, p) => sum + p.exercisesDone, 0) / (skillDays.length * 2))

    scores[skill] = Math.round(
      completionRate * 0.5 * 100 + (avgQuizScore / 100) * 0.3 * 100 + exerciseRate * 0.2 * 100
    )
  }

  return scores
}

// ============================================================
// QUIZ ATTEMPT MANAGEMENT
// ============================================================

export async function checkQuizEligibility(userId: string, dayId: number) {
  const progress = await prisma.userProgress.findUnique({
    where: { userId_dayId: { userId, dayId } },
  })

  if (!progress) return { canAttempt: true, attemptsRemaining: QUIZ_MAX_ATTEMPTS, nextAttemptAt: null }

  if (progress.quizPassed) {
    return { canAttempt: true, attemptsRemaining: QUIZ_MAX_ATTEMPTS, nextAttemptAt: null, alreadyPassed: true }
  }

  if (progress.quizAttempts >= QUIZ_MAX_ATTEMPTS) {
    // Check cooldown
    const lastAttempt = await prisma.quizAttempt.findFirst({
      where: { userId, dayId },
      orderBy: { createdAt: "desc" },
    })

    if (lastAttempt) {
      const cooldownEnd = new Date(lastAttempt.createdAt.getTime() + QUIZ_COOLDOWN_HOURS * 60 * 60 * 1000)
      if (new Date() < cooldownEnd) {
        return {
          canAttempt: false,
          attemptsRemaining: 0,
          nextAttemptAt: cooldownEnd.toISOString(),
        }
      } else {
        // Cooldown expired — reset attempts
        await prisma.userProgress.update({
          where: { userId_dayId: { userId, dayId } },
          data: { quizAttempts: 0 },
        })
        return { canAttempt: true, attemptsRemaining: QUIZ_MAX_ATTEMPTS, nextAttemptAt: null }
      }
    }
  }

  return {
    canAttempt: true,
    attemptsRemaining: QUIZ_MAX_ATTEMPTS - (progress.quizAttempts ?? 0),
    nextAttemptAt: null,
  }
}

// ============================================================
// ACHIEVEMENT HELPERS
// ============================================================

export async function awardAchievement(userId: string, achievementKey: string) {
  const achievement = await prisma.achievement.findUnique({ where: { key: achievementKey } })
  if (!achievement) return

  await prisma.userAchievement
    .create({
      data: { userId, achievementId: achievement.id },
    })
    .catch(() => {
      // Already earned — ignore unique constraint
    })

  // Award XP
  await prisma.profile.update({
    where: { userId },
    data: { totalXp: { increment: achievement.xpValue } },
  })
}

async function checkPhaseAchievements(userId: string, completedDayNumber: number) {
  const phaseAchievementMap: Record<number, string> = {
    7: "phase_1_complete",
    20: "phase_2_complete",
    35: "phase_3_complete",
    42: "phase_4_complete",
    55: "phase_5_complete",
    65: "phase_6_complete",
    72: "phase_7_complete",
    90: "journey_complete",
  }

  const achievementKey = phaseAchievementMap[completedDayNumber]
  if (achievementKey) {
    await awardAchievement(userId, achievementKey)
  }
}

// ============================================================
// CALENDAR DATA
// ============================================================

export async function getCalendarData(userId: string) {
  const [profile, allProgress, allDays] = await Promise.all([
    prisma.profile.findUnique({ where: { userId } }),
    prisma.userProgress.findMany({
      where: { userId },
      select: {
        dayId: true,
        status: true,
        completedAt: true,
        lessonReadPct: true,
      },
    }),
    prisma.day.findMany({
      where: { status: "published" },
      include: { phase: true },
      orderBy: { dayNumber: "asc" },
    }),
  ])

  if (!profile) return []

  const progressMap = new Map(allProgress.map((p) => [p.dayId, p]))
  const startDate = new Date(profile.startDate)

  return allDays.map((day) => {
    const progress = progressMap.get(day.id)
    const targetDate = new Date(startDate)
    targetDate.setDate(startDate.getDate() + day.dayNumber - 1)

    return {
      dayNumber: day.dayNumber,
      title: day.title,
      skill: day.skill,
      estimatedMinutes: day.estimatedMinutes,
      difficulty: day.difficulty,
      phaseNumber: day.phase.number,
      phaseName: day.phase.name,
      colorHex: day.phase.colorHex,
      targetDate: targetDate.toISOString().split("T")[0],
      status: progress?.status ?? "locked",
      completionPercentage: progress
        ? calculateDayPercent(progress.lessonReadPct, progress.status === "completed")
        : 0,
      completedAt: progress?.completedAt?.toISOString() ?? null,
    }
  })
}

function calculateDayPercent(lessonReadPct: number, completed: boolean): number {
  if (completed) return 100
  return Math.round(lessonReadPct * 0.4) // partial reading counts as progress
}
