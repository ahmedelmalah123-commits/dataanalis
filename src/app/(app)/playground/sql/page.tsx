// src/app/(app)/playground/sql/page.tsx
import type { Metadata } from "next"
import { SqlStudio } from "@/components/playground/SqlStudio"

export const metadata: Metadata = {
  title: "SQL Studio | Analyst.OS",
  description: "Interactive SQL playground with embedded RetailCore and TelecomX datasets",
}

export default function SqlPlaygroundPage() {
  return <SqlStudio />
}
