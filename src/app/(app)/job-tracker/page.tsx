// src/app/(app)/job-tracker/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { JobTrackerClient } from "@/components/jobs/JobTrackerClient"

export const metadata: Metadata = {
  title: "Job Application Tracker | Analyst.OS",
  description: "Track and organize your data and BI analyst job applications across Egypt and MENA",
}

export default async function JobTrackerPage() {
  const session = await auth()
  const userId = session?.user?.id

  const applications = userId
    ? await prisma.jobApplication.findMany({
        where: { userId },
        orderBy: { appliedDate: "desc" },
      })
    : []

  const formattedApps = applications.map((app) => ({
    id: app.id,
    company: app.company,
    roleTitle: app.jobTitle,
    location: app.source || "Cairo, Egypt",
    status: app.status,
    appliedDate: app.appliedDate ? app.appliedDate.toISOString() : null,
    notes: app.notes || "",
    salary: "",
  }))

  return <JobTrackerClient initialApplications={formattedApps} />
}
