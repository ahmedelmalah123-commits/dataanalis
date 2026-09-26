// src/app/api/v1/me/route.ts
// GET /api/v1/me — current user + profile

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      isAdmin: true,
      createdAt: true,
      lastActive: true,
      profile: true,
    },
  })

  if (!user) {
    return errorResponse(ErrorCodes.NOT_FOUND, "User not found", 404)
  }

  return successResponse(user)
}

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const body = await request.json()
  const { name, careerGoal, country, timezone, avatarUrl } = body

  const updates: Record<string, unknown> = {}
  if (name) updates.name = name

  if (Object.keys(updates).length > 0) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: updates,
    })
  }

  const profileUpdates: Record<string, unknown> = {}
  if (careerGoal) profileUpdates.careerGoal = careerGoal
  if (country) profileUpdates.country = country
  if (timezone) profileUpdates.timezone = timezone
  if (avatarUrl !== undefined) profileUpdates.avatarUrl = avatarUrl

  if (Object.keys(profileUpdates).length > 0) {
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: profileUpdates,
    })
  }

  return successResponse({ updated: true })
}
