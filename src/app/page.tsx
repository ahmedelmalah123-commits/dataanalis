// src/app/page.tsx
// Landing page — marketing page, no auth required

import type { Metadata } from "next"
import Link from "next/link"
import { LandingHero } from "@/components/landing/LandingHero"
import { LandingFeatures } from "@/components/landing/LandingFeatures"
import { LandingCurriculum } from "@/components/landing/LandingCurriculum"
import { LandingDemo } from "@/components/landing/LandingDemo"
import { LandingCTA } from "@/components/landing/LandingCTA"
import { LandingNav } from "@/components/landing/LandingNav"

export const metadata: Metadata = {
  title: "Analyst.OS — من خريج نظم معلومات إلى محلل بيانات في 90 يوماً",
  description:
    "نظام تشغيل مهني متكامل لخريجي نظم المعلومات الإدارية والمبتدئين. لا حاجة لدورات خارجية — إكسل، SQL، Power BI، بايثون، والاستعداد للتوظيف في منصة واحدة.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingCurriculum />
        <LandingDemo />
        <LandingCTA />
      </main>
      <footer className="border-t border-slate-200 py-10 mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold text-sm">Analyst.OS</span>
            <span>© 2026 — منصة إعداد محللي البيانات ونظم المعلومات</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">الشروط والأحكام</Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">سياسة الخصوصية</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">تواصل معنا</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
