// src/app/api/v1/onboarding/route.ts
// POST /api/v1/onboarding — Completes user onboarding & initializes Day 1 progress

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"
import { z } from "zod"

const onboardingSchema = z.object({
  careerGoal: z.enum(["data_analyst", "bi_analyst", "business_analyst"]).default("data_analyst"),
  country: z.string().default("EG"),
  timezone: z.string().default("Africa/Cairo"),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const userId = session.user.id

  try {
    const body = await request.json().catch(() => ({}))
    const validated = onboardingSchema.parse(body)

    // Upsert user profile
    await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        careerGoal: validated.careerGoal,
        country: validated.country,
        timezone: validated.timezone,
        onboardingDone: true,
        currentDay: 1,
      },
      update: {
        careerGoal: validated.careerGoal,
        country: validated.country,
        timezone: validated.timezone,
        onboardingDone: true,
        currentDay: 1,
      },
    })

    // Find day 1 to unlock it in UserProgress
    const day1 = await prisma.day.findUnique({
      where: { dayNumber: 1 },
    })

    if (day1) {
      await prisma.userProgress.upsert({
        where: {
          userId_dayId: {
            userId,
            dayId: day1.id,
          },
        },
        create: {
          userId,
          dayId: day1.id,
          status: "in_progress",
        },
        update: {
          status: "in_progress",
        },
      })
    }

    return successResponse({ success: true, message: "Onboarding complete" })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save onboarding"
    return errorResponse(ErrorCodes.INTERNAL_ERROR, message, 500)
  }
}
