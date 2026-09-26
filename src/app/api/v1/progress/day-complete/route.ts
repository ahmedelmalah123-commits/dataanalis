// src/app/api/v1/progress/day-complete/route.ts
// POST /api/v1/progress/day-complete

import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { markDayComplete } from "@/lib/progress-engine"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  dayNumber: z.number().int().min(1).max(90),
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

  const { dayNumber } = parsed.data

  // Get the day
  const day = await prisma.day.findUnique({
    where: { dayNumber },
    select: { id: true, status: true },
  })

  if (!day || day.status !== "published") {
    return errorResponse(ErrorCodes.DAY_NOT_FOUND, "Day not found or not available", 404)
  }

  // Check the user has access to this day
  const progress = await prisma.userProgress.findUnique({
    where: { userId_dayId: { userId: session.user.id, dayId: day.id } },
  })

  if (!progress || progress.status === "locked") {
    return errorResponse(ErrorCodes.DAY_LOCKED, "This day is locked.", 403)
  }

  const result = await markDayComplete(session.user.id, day.id, dayNumber)

  if (!result.success) {
    return errorResponse(
      ErrorCodes.COMPLETION_CRITERIA_NOT_MET,
      "Day completion criteria not yet met.",
      400,
      { missing: result.missing }
    )
  }

  // Track analytics
  await prisma.analyticsEvent.create({
    data: {
      userId: session.user.id,
      eventType: "day_completed",
      dayId: day.id,
      metadata: { dayNumber },
    },
  })

  return successResponse({ completed: true, dayNumber })
}
