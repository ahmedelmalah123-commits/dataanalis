// src/app/api/v1/progress/lesson-read/route.ts
// POST /api/v1/progress/lesson-read — update lesson read percentage

import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"
import { z } from "zod"

const schema = z.object({
  dayId: z.number().int(),
  percentage: z.number().min(0).max(100),
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

  const { dayId, percentage } = parsed.data

  await prisma.userProgress.upsert({
    where: { userId_dayId: { userId: session.user.id, dayId } },
    update: {
      lessonReadPct: percentage,
      lastAccessed: new Date(),
      status: "in_progress",
    },
    create: {
      userId: session.user.id,
      dayId,
      lessonReadPct: percentage,
      status: "in_progress",
      lastAccessed: new Date(),
    },
  })

  return successResponse({ updated: true, percentage })
}
