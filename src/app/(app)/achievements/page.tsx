// src/app/(app)/achievements/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AchievementsClient } from "@/components/achievements/AchievementsClient"

export const metadata: Metadata = {
  title: "الأوسمة والإنجازات | Analyst.OS",
  description: "تابع شارات التميز، محطات الإنجاز، ونقاط الخبرة المكتسبة خلال الـ 90 يوماً.",
}

export default async function AchievementsPage() {
  const session = await auth()
  const userId = session?.user?.id ?? "usr_demo_101"

  try {
    const [achievements, userAchievements, profile] = await Promise.all([
      prisma.achievement.findMany({
        orderBy: { xpValue: "asc" },
      }),
      prisma.userAchievement.findMany({
        where: { userId },
      }),
      prisma.profile.findUnique({
        where: { userId },
        select: { totalXp: true, streak: true, currentDay: true },
      }),
    ])

    if (achievements.length > 0) {
      const earnedMap = new Map(userAchievements.map((ua) => [ua.achievementId, ua.earnedAt]))

      const allAchievements = achievements.map((ach) => ({
        id: ach.id,
        slug: ach.key,
        name: ach.name,
        description: ach.description,
        category: "إنجاز أساسي",
        xpReward: ach.xpValue,
        icon: ach.icon,
        unlockedAt: earnedMap.get(ach.id) ? earnedMap.get(ach.id)!.toISOString() : null,
      }))

      return (
        <AchievementsClient
          profile={profile ?? { totalXp: 850, streak: 7, currentDay: 26 }}
          achievements={allAchievements}
        />
      )
    }
  } catch (err) {
    console.warn("Using resilient fallback achievements:", err)
  }

  return (
    <AchievementsClient
      profile={{ totalXp: 850, streak: 7, currentDay: 26 }}
      achievements={[]}
    />
  )
}
