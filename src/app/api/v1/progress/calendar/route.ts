// src/app/api/v1/progress/calendar/route.ts
// GET /api/v1/progress/calendar

import { auth } from "@/lib/auth"
import { getCalendarData } from "@/lib/progress-engine"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const calendarData = await getCalendarData(session.user.id)
  return successResponse(calendarData)
}
