// src/app/(auth)/layout.tsx
// Minimal layout for auth pages (login, register, verify)

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "تسجيل الدخول | Analyst.OS",
  description: "سجّل دخولك لمنصة Analyst.OS لمتابعة رحلة الـ 90 يوماً نحو احتراف تحليل البيانات.",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Logo bar */}
      <header className="flex items-center justify-center pt-8 pb-4">
        <Link href="/" dir="ltr" className="text-slate-900 font-bold text-2xl tracking-tight flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-sm">
            A
          </span>
          <span className="font-mono">Analyst.OS</span>
        </Link>
      </header>

      {/* Auth content */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        {children}
      </main>

      <footer className="py-6 text-center text-slate-500 text-xs border-t border-slate-200 bg-white">
        © 2026 Analyst.OS — نظام التشغيل المهني لخريجي نظم المعلومات ومحللي البيانات
      </footer>
    </div>
  )
}
