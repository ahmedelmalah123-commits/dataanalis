// src/app/(app)/playground/python/page.tsx
import type { Metadata } from "next"
import { PythonStudio } from "@/components/playground/PythonStudio"

export const metadata: Metadata = {
  title: "Python Data Analysis Studio | Analyst.OS",
  description: "Interactive Python and Pandas environment for data cleaning and statistical exploration",
}

export default function PythonPlaygroundPage() {
  return <PythonStudio />
}
