// src/app/api/auth/register/route.ts
import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        "Invalid registration data",
        400,
        { fields: parsed.error.flatten().fieldErrors }
      )
    }

    const { name, email, password } = parsed.data

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return errorResponse(
        ErrorCodes.EMAIL_ALREADY_EXISTS,
        "An account with this email already exists.",
        409
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        authProvider: "email",
      },
      select: { id: true, name: true, email: true },
    })

    // Create email verification token
    const token = crypto.randomUUID()
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
      },
    })

    // Send verification email
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    try {
      if (resend) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM ?? "Analyst.OS <noreply@analystem.io>",
          to: email,
          subject: "Verify your Analyst.OS account",
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2>Welcome to Analyst.OS, ${name}!</h2>
              <p>Click the link below to verify your email and start your 90-day journey:</p>
              <a href="${verifyUrl}" style="display:inline-block;background:#6366F1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;">
                Verify Email & Start Learning
              </a>
              <p style="color:#94A3B8;font-size:13px;">This link expires in 24 hours.</p>
            </div>
          `,
        })
      }
    } catch {
      // Don't fail registration if email fails — log and continue
      console.error("Failed to send verification email")
    }

    return successResponse(
      {
        userId: user.id,
        message: "Account created. Please check your email to verify your account.",
      },
      201
    )
  } catch (error) {
    console.error("Registration error:", error)
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Registration failed. Please try again.", 500)
  }
}
