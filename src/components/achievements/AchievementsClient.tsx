"use client"

import { useState } from "react"
import {
  Trophy,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Zap,
  Target,
  Database,
  BarChart3,
  Calendar,
} from "lucide-react"

interface AchievementItem {
  id: string
  slug: string
  name: string
  description: string
  category: string
  xpReward: number
  icon: string
  unlockedAt: string | null
}

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "a_1",
    slug: "day_1_complete",
    name: "بداية الرحلة المهنية",
    description: "أكملت اليوم الأول من منهج الـ 90 يوماً. بداية التحول من التشتت إلى الاحتراف.",
    category: "إنجاز أساسي",
    xpReward: 100,
    icon: "zap",
    unlockedAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "a_2",
    slug: "streak_7_days",
    name: "شعلة الالتزام الأسبوعي",
    description: "حافظت على التعلم والتطبيق لـ 7 أيام متتالية دون انقطاع.",
    category: "استمرارية",
    xpReward: 250,
    icon: "flame",
    unlockedAt: "2024-02-07T00:00:00.000Z",
  },
  {
    id: "a_3",
    slug: "excel_mastery",
    name: "خبير إكسل و Power Query",
    description: "أتممت جميع فصول إكسل المتقدم والجداول المحورية ومعادلات البحث.",
    category: "مهارة تقنية",
    xpReward: 300,
    icon: "table",
    unlockedAt: null,
  },
  {
    id: "a_4",
    slug: "first_sql_query",
    name: "مهندس استعلامات SQL",
    description: "كتبت ونفّذت أول استعلام متعدد الجداول باستخدام JOIN و GROUP BY في ستوديو SQL.",
    category: "مهارة تقنية",
    xpReward: 150,
    icon: "database",
    unlockedAt: "2024-02-15T00:00:00.000Z",
  },
  {
    id: "a_5",
    slug: "project_1_delivered",
    name: "تسليم مشروع التجزئة الأول",
    description: "سلّمت بنجاح مشروع تحليل مبيعات RetailCore وبنيت أول دراسة حالة في البورتفوليو.",
    category: "بورتفوليو",
    xpReward: 500,
    icon: "award",
    unlockedAt: null,
  },
  {
    id: "a_6",
    slug: "power_bi_cockpit",
    name: "محترف لوحات تحكم Power BI",
    description: "أتقنت نمذجة البيانات بنظام Star Schema وكتابة مقاييس DAX التفاعلية.",
    category: "مهارة تقنية",
    xpReward: 400,
    icon: "barchart",
    unlockedAt: null,
  },
  {
    id: "a_7",
    slug: "interview_ready",
    name: "الجاهزية التامة لسوق العمل",
    description: "أتممت المشاريع الثلاثة وجهّزت سيرة ذاتية وحساب LinkedIn احترافي للتوظيف في مصر والخليج.",
    category: "المسار الوظيفي",
    xpReward: 1000,
    icon: "trophy",
    unlockedAt: null,
  },
]

export function AchievementsClient({
  profile,
  achievements,
}: {
  profile: { totalXp: number; streak: number; currentDay: number } | null
  achievements: AchievementItem[]
}) {
  const items = achievements.length > 0 ? achievements : DEFAULT_ACHIEVEMENTS
  const [filter, setFilter] = useState("all")

  const unlockedCount = items.filter((a) => a.unlockedAt !== null).length
  const totalXp = profile?.totalXp ?? 450

  const filtered = items.filter((a) => {
    if (filter === "earned") return a.unlockedAt !== null
    if (filter === "locked") return a.unlockedAt === null
    return true
  })

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>محطات التميز والمهارات المهنية</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            أوسمة الإنجاز ونقاط الخبرة
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            احصل على أوسمة معتمدة تثبت تقدمك مع كل مرحلة ومهمة عملية تسلّمها بنجاح.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <div>
              <div className="text-[10px] text-slate-500">الأوسمة المكتسبة</div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                {unlockedCount} / {items.length}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
            <Zap className="w-4 h-4 text-slate-800" />
            <div>
              <div className="text-[10px] text-slate-500">مجموع نقاط XP</div>
              <div className="text-sm font-bold text-slate-900 font-mono">{totalXp} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: "all", label: `جميع الأوسمة (${items.length})` },
          { id: "earned", label: `المكتسبة (${unlockedCount})` },
          { id: "locked", label: `قيد الإنجاز (${items.length - unlockedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => {
          const isUnlocked = item.unlockedAt !== null

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                isUnlocked
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-slate-50 border-slate-200/80 opacity-75"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUnlocked
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-400 border-slate-200"
                }`}
              >
                {isUnlocked ? (
                  <Trophy className="w-5 h-5" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 font-mono flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
                    <Sparkles className="w-2.5 h-2.5" /> +{item.xpReward} XP
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 truncate">{item.name}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {isUnlocked && (
                  <div className="pt-1.5 text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>تم الحصول عليه في {new Date(item.unlockedAt!).toLocaleDateString("ar-EG")}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
