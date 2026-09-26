"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar as CalendarIcon,
  Flame,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react"

interface DayCalendarItem {
  id: number
  dayNumber: number
  title: string
  skill: string
  phaseName: string
  phaseColor: string
  status: string
  completedAt: string | null
  lessonReadPct: number
}

interface CalendarClientProps {
  profile: {
    currentDay: number
    streak: number
    longestStreak: number
    totalXp: number
  } | null
  days: DayCalendarItem[]
}

export function CalendarClient({ profile, days }: CalendarClientProps) {
  const currentDay = profile?.currentDay ?? 1
  const streak = profile?.streak ?? 0
  const longestStreak = profile?.longestStreak ?? 0
  const [selectedDay, setSelectedDay] = useState<DayCalendarItem | null>(() => {
    return days.find((d) => d.dayNumber === currentDay) || days[0] || null
  })

  const completedCount = days.filter((d) => d.status === "completed").length

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-700" />
            <span>جدول الالتزام اليومي لـ 90 يوماً</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            مصفوفة الأيام ومتابعة الاستمرارية
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            الالتزام اليومي بساعة واحدة من التطبيق العملي يبني مستقبلك المهني كمحلل بيانات.
          </p>
        </div>

        {/* Streak Metrics */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-sm">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500">أيام الاستمرارية</div>
              <div className="text-sm font-bold text-slate-900 font-mono">{streak} يوم</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500">أفضل رقم</div>
              <div className="text-sm font-bold text-slate-900 font-mono">{longestStreak} يوم</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 90-Day Matrix Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">
                مصفوفة إنجاز الـ 90 يوماً ({completedCount} / 90 مكتمل)
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> مكتمل
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-900" /> اليوم الحالي
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300" /> قادم
                </span>
              </div>
            </div>

            {/* Matrix of days */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {days.map((day) => {
                const isCompleted = day.status === "completed"
                const isCurrent = day.dayNumber === currentDay
                const isSelected = selectedDay?.id === day.id

                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`h-11 rounded-xl font-mono text-xs font-bold flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? "ring-2 ring-slate-900 shadow-sm"
                        : "hover:bg-slate-100"
                    } ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isCurrent
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span>{day.dayNumber}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5" />
                    ) : isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5 animate-pulse" />
                    ) : (
                      <span className="text-[9px] text-slate-400 mt-0.5">يوم</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Day Inspector Panel */}
        <div>
          {selectedDay ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 sticky top-20">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedDay.phaseName}
                  </span>
                  <span className="font-mono text-slate-400 font-bold">
                    اليوم {selectedDay.dayNumber} من 90
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 pt-1 leading-snug">
                  {selectedDay.title}
                </h3>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>الحالة:</span>
                  <span className="font-bold text-slate-900">
                    {selectedDay.status === "completed"
                      ? "مكتمل ✓"
                      : selectedDay.dayNumber === currentDay
                      ? "قيد التنفيذ اليوم"
                      : "قادم في الخطة"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>المهارة المستهدفة:</span>
                  <span className="font-bold text-slate-900">
                    {selectedDay.skill}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>نسبة قراءة الدرس:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {selectedDay.lessonReadPct}%
                  </span>
                </div>

                {selectedDay.completedAt && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span>تاريخ الإنجاز:</span>
                    <span className="font-bold text-emerald-600 font-mono">
                      {new Date(selectedDay.completedAt).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                )}
              </div>

              {selectedDay.status === "locked" && selectedDay.dayNumber !== 1 ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
                  <Lock className="w-4 h-4 shrink-0 text-slate-400" />
                  <span>أكمل الأيام السابقة لفتح هذا اليوم.</span>
                </div>
              ) : (
                <Link
                  href={`/days/${selectedDay.dayNumber}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>فتح درس ومهمة اليوم {selectedDay.dayNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-xs">
              اضغط على أي يوم في المصفوفة لعرض تفاصيله
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
