// src/components/app/AppHeader.tsx
"use client"

import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut, User, ChevronDown, Flame } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { useAuth } from "@/context/AuthContext"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "لوحة التحكم",
  "/curriculum": "خريطة المنهج والمسار",
  "/calendar": "جدول الالتزام اليومي",
  "/projects": "مشاريع البورتفوليو",
  "/achievements": "الأوسمة والإنجازات",
  "/notes": "الملاحظات والمفاهيم",
  "/job-tracker": "متابعة التقديم على الوظائف",
  "/ai-tutor": "المعلم الذكي لمحللي البيانات",
  "/settings": "الإعدادات",
  "/playground/sql": "ستوديو SQL التفاعلي",
  "/playground/python": "مختبر بايثون وبانداس",
}

interface AppHeaderProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname()
  const { userProfile, signOutUser } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const activeName = userProfile?.name || user.name || "محلل بيانات"
  const activeEmail = userProfile?.email || user.email || "user@analyst.os"
  const streak = userProfile?.streakDays ?? 14

  const title = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname === path || pathname.startsWith(path + "/")
  )?.[1] ?? "Analyst.OS"

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-6">
      <h1 className="font-bold text-slate-900 text-sm">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Streak indicator */}
        <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-800">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>{streak} يوماً مستمراً</span>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            id="user-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-slate-50 px-2 py-1.5 rounded-xl transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold">
              {activeName.charAt(0) || "م"}
            </div>
            <span className="hidden sm:block text-slate-700 text-xs font-semibold max-w-[120px] truncate">
              {activeName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-lg z-20 py-1.5 overflow-hidden text-right">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-slate-900 text-xs font-bold truncate">{activeName}</p>
                  <p className="text-slate-400 text-[11px] truncate">{activeEmail}</p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 text-xs font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>إعدادات الحساب</span>
                </Link>

                <button
                  id="sign-out-button"
                  onClick={async () => {
                    await signOutUser()
                    signOut({ callbackUrl: "/" })
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors text-right"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
