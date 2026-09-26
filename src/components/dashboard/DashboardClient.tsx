"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Flame,
  CheckCircle2,
  Database,
  FolderKanban,
  Bot,
  Play,
} from "lucide-react"

import { useAuth } from "@/context/AuthContext"

interface DashboardClientProps {
  user: {
    name: string
    email: string
  }
  profile: {
    targetRole?: string | null
    track?: string | null
    currentDay: number
    streak: number
    totalXp: number
    onboardingDone: boolean
  }
  progressSummary: {
    currentDay: number
    overallPercent: number
    streak: number
    longestStreak: number
    totalXp: number
    daysCompleted: number
    phaseSummaries: Array<{
      phaseId: number
      phaseNumber: number
      phaseName: string
      colorHex: string
      daysTotal: number
      daysCompleted: number
      completionPercent: number
    }>
    skillScores: Record<string, number>
  } | null
  upcomingDays: Array<{
    id: number
    dayNumber: number
    title: string
    subtitle?: string | null
    skill: string
    estimatedMinutes: number
    difficulty: string
    xpReward: number
    phase: {
      number: number
      name: string
      colorHex: string
    }
    userStatus: string
    completionPercentage: number
  }>
}

export function DashboardClient({
  user,
  profile,
  progressSummary,
  upcomingDays,
}: DashboardClientProps) {
  const { userProfile } = useAuth()

  const displayName = userProfile?.name || user.name || "محلل بيانات"
  const currentDayNumber = userProfile?.currentDay ?? profile.currentDay ?? 1
  const todayDay = upcomingDays.find((d) => d.dayNumber === currentDayNumber) || upcomingDays[0]
  const daysCompleted = progressSummary?.daysCompleted ?? 0
  const overallPercent = progressSummary?.overallPercent ?? 0
  const streak = userProfile?.streakDays ?? progressSummary?.streak ?? profile.streak ?? 14
  const totalXp = userProfile?.totalXp ?? progressSummary?.totalXp ?? profile.totalXp ?? 1850

  const roleLabels: Record<string, string> = {
    data_analyst: "محلل بيانات (Data Analyst)",
    bi_analyst: "محلل ومطور ذكاء أعمال (BI Analyst)",
    business_analyst: "محلل أعمال ونظم معلومات (MIS Analyst)",
  }

  const userRole = roleLabels[userProfile?.track || profile.targetRole || ""] || "محلل بيانات ونظم معلومات"

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 text-right font-sans">
      {/* 1. الترحيب وسياق اليوم */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-slate-500">
          اليوم {currentDayNumber} من أصل 90 يوماً
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          مرحباً بك، {displayName.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-slate-600">
          مسارك المستهدف: <span className="font-semibold text-slate-900">{userRole}</span>. تركيزنا اليوم على إنجاز خطوة تطبيقية حقيقية واحدة.
        </p>
      </div>

      {/* 2. بطاقة اليوم الرئيسية — التركيز الأوحد والمباشر */}
      {todayDay && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
              المرحلة {todayDay.phase.number}: {todayDay.phase.name}
            </span>
            <span className="text-xs text-slate-500 font-mono font-semibold">
              اليوم #{todayDay.dayNumber}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {todayDay.title}
            </h2>
            {todayDay.subtitle && (
              <p className="text-sm text-slate-600 leading-relaxed">
                {todayDay.subtitle}
              </p>
            )}
          </div>

          {/* تفاصيل الدرس وزر البدء */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                ~{todayDay.estimatedMinutes} دقيقة عمل
              </span>
              <span className="flex items-center gap-1.5 font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                +{todayDay.xpReward} نقطة خبرة XP
              </span>
            </div>

            <Link
              href={`/days/${todayDay.dayNumber}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{todayDay.completionPercentage > 0 ? "استكمال درس اليوم" : "ابدأ درس اليوم"}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* 3. مقاييس الإنجاز المبسطة والهادئة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* نسبة إنجاز الـ 90 يوم */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>نسبة الإنجاز في المسار</span>
            <span className="font-bold text-slate-900 font-mono">{overallPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-slate-900 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            أنجزت {daysCompleted} من أصل 90 يوماً
          </div>
        </div>

        {/* التتابع اليومي */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">أيام التتابع المستمر</div>
            <div className="text-base font-bold text-slate-900">{streak} أيام متواصلة</div>
          </div>
        </div>

        {/* رصيد الخبرة */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">رصيد الخبرة المهنية</div>
            <div className="text-base font-bold text-slate-900 font-mono">{totalXp} XP</div>
          </div>
        </div>
      </div>

      {/* 4. مساحات التطبيق والأدوات التحليلية */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          بيئات العمل والتطبيق العملي
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/playground/sql"
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 transition-all flex items-start gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">ستوديو SQL</div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                تطبيق مباشر على بيانات مبيعات حقيقية
              </div>
            </div>
          </Link>

          <Link
            href="/projects"
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 transition-all flex items-start gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">مشاريع البورتفوليو</div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                3 مشاريع أعمال شاملة لسيرتك الذاتية
              </div>
            </div>
          </Link>

          <Link
            href="/ai-tutor"
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 transition-all flex items-start gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">المعلم الذكي</div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                توجيه سقراطي واستعداد لمقابلات العمل
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
