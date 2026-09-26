// src/app/(app)/settings/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SettingsClient } from "@/components/settings/SettingsClient"

export const metadata: Metadata = {
  title: "Account Settings | Analyst.OS",
  description: "Manage your profile, target role, timezone, and preferences",
}

export default async function SettingsPage() {
  const session = await auth()
  const userId = session?.user?.id

  const profile = userId
    ? await prisma.profile.findUnique({
        where: { userId },
        include: {
          user: {
            select: { name: true, email: true, createdAt: true },
          },
        },
      })
    : null

  return (
    <SettingsClient
      user={{
        name: profile?.user.name || session?.user?.name || "Analyst Learner",
        email: profile?.user.email || session?.user?.email || "learner@analyst.os",
      }}
      profile={{
        careerGoal: profile?.careerGoal || "data_analyst",
        country: profile?.country || "EG",
        timezone: profile?.timezone || "Africa/Cairo",
        currentDay: profile?.currentDay || 1,
      }}
    />
  )
}
