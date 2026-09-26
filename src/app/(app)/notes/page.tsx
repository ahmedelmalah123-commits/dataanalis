// src/app/(app)/notes/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NotesClient } from "@/components/notes/NotesClient"

export const metadata: Metadata = {
  title: "My Notes & Bookmarks | Analyst.OS",
  description: "Review your saved analyst notes, key formula summaries, and bookmarks",
}

export default async function NotesPage() {
  const session = await auth()
  const userId = session?.user?.id

  const notes = userId
    ? await prisma.note.findMany({
        where: { userId },
        include: { day: { select: { dayNumber: true, title: true } } },
        orderBy: { updatedAt: "desc" },
      })
    : []

  const formattedNotes = notes.map((n) => ({
    id: n.id,
    content: n.content,
    dayNumber: n.day.dayNumber,
    dayTitle: n.day.title,
    updatedAt: n.updatedAt.toISOString(),
  }))

  return <NotesClient initialNotes={formattedNotes} />
}
