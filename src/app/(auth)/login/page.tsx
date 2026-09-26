// src/app/(auth)/login/page.tsx
import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "تسجيل الدخول | Analyst.OS",
  description: "سجّل دخولك لحسابك في Analyst.OS وتابع رحلتك اليومية نحو احتراف تحليل البيانات.",
}

export default function LoginPage() {
  return <LoginForm />
}
