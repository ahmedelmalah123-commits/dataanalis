// src/app/(app)/projects/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProjectsClient } from "@/components/projects/ProjectsClient"

export const metadata: Metadata = {
  title: "Portfolio Projects | Analyst.OS",
  description: "3 portfolio projects designed to demonstrate job-ready analyst competency",
}

export default async function ProjectsPage() {
  const session = await auth()
  const userId = session?.user?.id

  const profile = userId
    ? await prisma.profile.findUnique({
        where: { userId },
        select: { currentDay: true },
      })
    : null

  const currentDay = profile?.currentDay ?? 1

  return <ProjectsClient currentDay={currentDay} />
}
