// src/app/api/v1/curriculum/route.ts
// GET /api/v1/curriculum — all phases with day summaries

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const [phases, userProgress] = await Promise.all([
    prisma.phase.findMany({
      include: {
        days: {
          where: { status: "published" },
          orderBy: { dayNumber: "asc" },
          select: {
            id: true,
            dayNumber: true,
            title: true,
            subtitle: true,
            skill: true,
            estimatedMinutes: true,
            difficulty: true,
            xpReward: true,
          },
        },
      },
      orderBy: { number: "asc" },
    }),
    prisma.userProgress.findMany({
      where: { userId: session.user.id },
      select: { dayId: true, status: true, lessonReadPct: true },
    }),
  ])

  const progressMap = new Map(userProgress.map((p) => [p.dayId, p]))

  const curriculum = phases.map((phase) => ({
    id: phase.id,
    number: phase.number,
    name: phase.name,
    description: phase.description,
    colorHex: phase.colorHex,
    startDay: phase.startDay,
    endDay: phase.endDay,
    days: phase.days.map((day) => {
      const prog = progressMap.get(day.id)
      return {
        ...day,
        userStatus: prog?.status ?? "locked",
        completionPercentage: prog?.lessonReadPct ?? 0,
      }
    }),
  }))

  return successResponse(curriculum)
}
