// src/app/api/v1/progress/quiz-submit/route.ts
// POST /api/v1/progress/quiz-submit

import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { checkQuizEligibility } from "@/lib/progress-engine"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"
import { QUIZ_PASS_SCORE } from "@/lib/constants"
import { z } from "zod"

const schema = z.object({
  dayId: z.number().int(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.string(),
    })
  ),
})

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, "Invalid request", 400)
  }

  const { dayId, answers } = parsed.data

  // Check attempt eligibility
  const eligibility = await checkQuizEligibility(session.user.id, dayId)
  if (!eligibility.canAttempt) {
    return errorResponse(
      ErrorCodes.QUIZ_COOLDOWN_ACTIVE,
      "Quiz is on cooldown. Please wait before retrying.",
      429,
      { nextAttemptAt: eligibility.nextAttemptAt }
    )
  }

  // Get questions for this day
  const questions = await prisma.quizQuestion.findMany({
    where: { dayId },
    orderBy: { orderIndex: "asc" },
  })

  if (questions.length === 0) {
    return errorResponse(ErrorCodes.NOT_FOUND, "No quiz questions found for this day", 404)
  }

  // Grade answers
  const results = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId)
    if (!question) return null

    const correct = gradeAnswer(question.type, answer.answer, question.correctAnswer)

    return {
      questionId: answer.questionId,
      correct,
      explanation: question.explanation,
    }
  }).filter(Boolean) as Array<{ questionId: string; correct: boolean; explanation: string }>

  const correctCount = results.filter((r) => r.correct).length
  const score = Math.round((correctCount / questions.length) * 100)
  const passed = score >= QUIZ_PASS_SCORE

  // Store each attempt
  await prisma.$transaction(
    answers.map((answer) => {
      const result = results.find((r) => r.questionId === answer.questionId)
      return prisma.quizAttempt.create({
        data: {
          userId: session.user.id,
          questionId: answer.questionId,
          dayId,
          answer: answer.answer,
          correct: result?.correct ?? false,
          score,
          attemptNum: (eligibility.attemptsRemaining
            ? 3 - eligibility.attemptsRemaining + 1
            : 1),
        },
      })
    })
  )

  // Update progress
  await prisma.userProgress.upsert({
    where: { userId_dayId: { userId: session.user.id, dayId } },
    update: {
      quizAttempts: { increment: 1 },
      quizPassed: passed ? true : undefined,
      quizBestScore: passed ? score : undefined,
      lastAccessed: new Date(),
    },
    create: {
      userId: session.user.id,
      dayId,
      quizAttempts: 1,
      quizPassed: passed,
      quizBestScore: score,
      status: "in_progress",
      lastAccessed: new Date(),
    },
  })

  // Track event
  await prisma.analyticsEvent.create({
    data: {
      userId: session.user.id,
      eventType: passed ? "quiz_passed" : "quiz_failed",
      dayId,
      metadata: { score, passed },
    },
  })

  return successResponse({
    score,
    passed,
    results,
    attemptsRemaining: Math.max(0, (eligibility.attemptsRemaining ?? 3) - 1),
    nextAttemptAt: null,
  })
}

function gradeAnswer(type: string, given: string, correct: string): boolean {
  switch (type) {
    case "mcq":
    case "multi_select":
    case "ordering":
      return given.trim().toLowerCase() === correct.trim().toLowerCase()
    case "sql_fill":
    case "fill_blank":
      // Normalize SQL whitespace and case
      return given.trim().toLowerCase().replace(/\s+/g, " ") ===
        correct.trim().toLowerCase().replace(/\s+/g, " ")
    case "matching":
      return given.trim() === correct.trim()
    default:
      return false
  }
}
