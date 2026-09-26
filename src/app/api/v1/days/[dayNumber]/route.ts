// src/app/api/v1/days/[dayNumber]/route.ts
// GET /api/v1/days/:dayNumber — day + lesson + exercises + quiz + mission

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ dayNumber: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return errorResponse(ErrorCodes.UNAUTHORIZED, "Authentication required", 401)
  }

  const { dayNumber: dayNumberParam } = await params

  const dayNumber = parseInt(dayNumberParam, 10)

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 90) {
    return errorResponse(ErrorCodes.VALIDATION_ERROR, "Invalid day number", 400)
  }

  const day = await prisma.day.findUnique({
    where: { dayNumber },
    include: {
      phase: true,
      lesson: true,
      exercises: { orderBy: { orderIndex: "asc" } },
      quizQuestions: { orderBy: { orderIndex: "asc" } },
      mission: true,
    },
  })

  if (!day) {
    return errorResponse(ErrorCodes.DAY_NOT_FOUND, "Day not found", 404)
  }

  if (day.status !== "published") {
    // Admins can see drafts
    if (!session.user.isAdmin) {
      return errorResponse(ErrorCodes.NOT_FOUND, "Day not available yet", 404)
    }
  }

  // Check user access (day must not be locked)
  const progress = await prisma.userProgress.findUnique({
    where: { userId_dayId: { userId: session.user.id, dayId: day.id } },
  })

  if (!session.user.isAdmin && (!progress || progress.status === "locked")) {
    return errorResponse(ErrorCodes.DAY_LOCKED, "Complete the previous day to unlock this one.", 403)
  }

  // Don't expose solution in exercises to client
  const safeExercises = day.exercises.map(({ solution: _solution, ...e }) => e)
  // Don't expose correct answers in quiz to client
  const safeQuiz = day.quizQuestions.map(({ correctAnswer: _ca, ...q }) => q)

  return successResponse({
    ...day,
    exercises: safeExercises,
    quizQuestions: safeQuiz,
    userProgress: progress ?? null,
  })
}
