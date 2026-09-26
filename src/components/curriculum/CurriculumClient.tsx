"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface DayItem {
  id: number
  dayNumber: number
  title: string
  subtitle?: string | null
  skill: string
  estimatedMinutes: number
  difficulty: string
  xpReward: number
  status: string
  userStatus: string
  lessonReadPct: number
}

interface PhaseItem {
  id: number
  number: number
  name: string
  description: string
  colorHex: string
  startDay: number
  endDay: number
  days: DayItem[]
}

export function CurriculumClient({ phases }: { phases: PhaseItem[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  })

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseNum]: !prev[phaseNum] }))
  }

  const filteredPhases = useMemo(() => {
    return phases
      .map((phase) => {
        const matchingDays = phase.days.filter((day) => {
          return (
            searchQuery.trim() === "" ||
            day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (day.subtitle && day.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
            `اليوم ${day.dayNumber}`.includes(searchQuery) ||
            `day ${day.dayNumber}`.includes(searchQuery.toLowerCase())
          )
        })
        return { ...phase, days: matchingDays }
      })
      .filter((phase) => phase.days.length > 0 || searchQuery === "")
  }, [phases, searchQuery])

  const totalDays = phases.reduce((acc, p) => acc + p.days.length, 0)
  const completedDays = phases.reduce(
    (acc, p) => acc + p.days.filter((d) => d.userStatus === "completed").length,
    0
  )

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 text-slate-900 text-right font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">خريطة المنهج والمسار</h1>
          <p className="text-xs text-slate-500 mt-1">
            رحلة 90 يوماً مقسمة إلى 10 مراحل وفصول متدرجة من البداية وحتى الجاهزية للعمل.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
          المكتمل: <strong className="text-slate-900 font-mono font-bold">{completedDays}</strong> من أصل {totalDays || 90} يوماً
        </div>
      </div>

      {/* البحث السريع */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="ابحث في الدروس أو بالكلمات المفتاحية (مثل 'JOIN', 'Pivot', 'DAX', 'Pandas')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-sm"
        />
      </div>

      {/* استعراض المراحل */}
      <div className="space-y-4">
        {filteredPhases.map((phase) => {
          const isExpanded = expandedPhases[phase.number] ?? false
          const phaseCompleted = phase.days.filter((d) => d.userStatus === "completed").length

          return (
            <div
              key={phase.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => togglePhase(phase.number)}
                className="w-full p-5 text-right flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-xs text-slate-500 font-mono">
                    المرحلة {phase.number} · الأيام {phase.startDay}–{phase.endDay}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">{phase.name}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium">
                    {phaseCompleted} / {phase.days.length} مكتمل
                  </span>
                  <div className="p-1 rounded text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-2">
                  {phase.days.map((day) => {
                    const isDone = day.userStatus === "completed"
                    const isLocked = day.userStatus === "locked" && day.dayNumber !== 1

                    return (
                      <Link
                        key={day.id}
                        href={isLocked ? "#" : `/days/${day.dayNumber}`}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          isDone
                            ? "bg-white border-slate-200 hover:border-slate-300"
                            : isLocked
                            ? "bg-slate-100/60 border-slate-200/50 opacity-60 cursor-not-allowed"
                            : "bg-white border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-mono font-bold text-slate-500 shrink-0 w-16">
                            اليوم {day.dayNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {day.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                          <span className="hidden sm:flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-slate-400" /> ~{day.estimatedMinutes} د
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isLocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
