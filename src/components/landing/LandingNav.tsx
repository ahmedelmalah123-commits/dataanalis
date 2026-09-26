// src/components/landing/LandingNav.tsx
"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { ArrowLeft, Zap } from "lucide-react"

export function LandingNav() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">
            Analyst.OS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <Link href="#curriculum" className="hover:text-slate-900 transition-colors">
            خريطة المنهج
          </Link>
          <Link href="#features" className="hover:text-slate-900 transition-colors">
            لماذا المنصة؟
          </Link>
          <Link href="#demo" className="hover:text-slate-900 transition-colors">
            تجربة SQL الحية
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <span>لوحة التحكم</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-3 py-1.5 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                <span>ابدأ رحلة الـ 90 يوماً</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
