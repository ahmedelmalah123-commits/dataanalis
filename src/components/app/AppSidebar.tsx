// src/components/app/AppSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  FolderKanban,
  Trophy,
  StickyNote,
  Briefcase,
  Bot,
  Settings,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/curriculum", label: "خريطة المنهج", icon: BookOpen },
  { href: "/calendar", label: "جدول الالتزام", icon: CalendarDays },
  { href: "/projects", label: "مشاريع البورتفوليو", icon: FolderKanban },
  { href: "/achievements", label: "الأوسمة والإنجازات", icon: Trophy },
  { href: "/notes", label: "ملاحظاتي", icon: StickyNote },
  { href: "/job-tracker", label: "متابعة الوظائف", icon: Briefcase },
  { href: "/ai-tutor", label: "المعلم الذكي", icon: Bot },
]

interface AppSidebarProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const { userProfile } = useAuth()

  const activeName = userProfile?.name || user.name || "محلل بيانات"
  const activeEmail = userProfile?.email || user.email || "user@analyst.os"

  return (
    <>
      {/* Desktop Arabic Sidebar on the right */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-60 flex-col border-l border-slate-200 bg-white md:flex">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2.5 px-5 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Analyst.OS
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-slate-900" : "text-slate-400")} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Footer */}
        <div className="border-t border-slate-100 p-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shrink-0">
              {activeName.charAt(0) || "م"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 text-xs font-bold truncate">{activeName}</div>
              <div className="text-slate-400 text-[11px] truncate">{activeEmail}</div>
            </div>
            <Settings className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
          </Link>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-slate-200 bg-white md:hidden">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]",
                isActive ? "text-slate-900 font-bold" : "text-slate-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label.split(" ")[0]}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
