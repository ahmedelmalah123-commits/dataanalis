// src/app/api/v1/me/progress/route.ts
// GET /api/v1/me/progress — full progress summary

import { auth } from "@/lib/auth"
import { getProgressSummary } from "@/lib/progress-engine"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const summary = await getProgressSummary(session.user.id)
  if (!summary) {
    return errorResponse(ErrorCodes.NOT_FOUND, "Profile not found", 404)
  }

  return successResponse(summary)
}
