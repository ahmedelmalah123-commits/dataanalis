// src/app/(app)/ai-tutor/page.tsx
import type { Metadata } from "next"
import { AiTutorClient } from "@/components/ai/AiTutorClient"

export const metadata: Metadata = {
  title: "AI Senior Analyst Tutor | Analyst.OS",
  description: "Socratic AI mentoring for SQL, Power BI, business modeling, and interview prep",
}

export default function AiTutorPage() {
  return <AiTutorClient />
}
