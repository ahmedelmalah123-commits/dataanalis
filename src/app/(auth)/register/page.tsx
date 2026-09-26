// src/app/(auth)/register/page.tsx
import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | Analyst.OS",
  description: "أنشئ حسابك المجاني في منصة Analyst.OS وابدأ رحلة الـ 90 يوماً لتصبح محلل بيانات جاهزاً لسوق العمل.",
}

export default function RegisterPage() {
  return <RegisterForm />
}
