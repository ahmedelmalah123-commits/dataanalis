// src/lib/api-response.ts
// Standard API response helpers for all Route Handlers

import { NextResponse } from "next/server"

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    },
    { status }
  )
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, unknown>
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status }
  )
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  perPage: number,
  total: number
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  })
}

// Error codes
export const ErrorCodes = {
  // Auth
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Progress
  DAY_LOCKED: "DAY_LOCKED",
  DAY_NOT_FOUND: "DAY_NOT_FOUND",
  QUIZ_ATTEMPT_LIMIT: "QUIZ_ATTEMPT_LIMIT",
  QUIZ_COOLDOWN_ACTIVE: "QUIZ_COOLDOWN_ACTIVE",
  COMPLETION_CRITERIA_NOT_MET: "COMPLETION_CRITERIA_NOT_MET",

  // Content
  LESSON_NOT_FOUND: "LESSON_NOT_FOUND",
  EXERCISE_NOT_FOUND: "EXERCISE_NOT_FOUND",
  MISSION_NOT_FOUND: "MISSION_NOT_FOUND",
  PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND",
  DATASET_NOT_FOUND: "DATASET_NOT_FOUND",

  // Uploads
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",

  // AI
  AI_RATE_LIMIT: "AI_RATE_LIMIT",
  AI_UNAVAILABLE: "AI_UNAVAILABLE",

  // General
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  NOT_FOUND: "NOT_FOUND",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
} as const
