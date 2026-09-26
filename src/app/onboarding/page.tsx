"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Zap,
  Target,
  BarChart3,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react"

const CAREER_GOALS = [
  {
    id: "data_analyst",
    title: "محلل بيانات (Data Analyst)",
    description: "استخراج وتنظيف وتحليل البيانات باستخدام SQL وبايثون، وإعداد التقارير التحليلية لمساعدة الإدارة في اتخاذ القرار.",
    icon: BarChart3,
    badge: "الأكثر طلباً",
  },
  {
    id: "bi_analyst",
    title: "مطور ومحلل ذكاء أعمال (BI Analyst)",
    description: "تصميم لوحات تحكم تفاعلية متقدمة في Power BI، وبناء نماذج البيانات ومقاييس DAX لدعم القيادات والمديرين.",
    icon: TrendingUp,
    badge: "رواتب مرتفعة",
  },
  {
    id: "business_analyst",
    title: "محلل أعمال ونظم (Business / MIS Analyst)",
    description: "الربط بين احتياجات الأعمال والإدارة من جهة والحلول التقنية والأنظمة من جهة أخرى، وتحليل مسارات العمل التشغيلية.",
    icon: BrainCircuit,
    badge: "تخصص MIS الأصيل",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState("data_analyst")
  const [commitment, setCommitment] = useState("1-2")
  const [country, setCountry] = useState("EG")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/v1/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerGoal: selectedGoal,
          country,
          timezone: country === "EG" ? "Africa/Cairo" : "Asia/Riyadh",
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error?.message || "فشل إعداد الحساب")
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ ما")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-right">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-bold text-2xl text-slate-900">
            Analyst.OS
          </span>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            تخصيص نظام التشغيل المهني الخاص بك
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            أخبرنا بالمسار المهني الذي تطمح إليه لكي نُكيّف مهامك اليومية، مشاريع البورتفوليو، ومسار التقديمات وفقاً له.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Step 1: Career Role */}
          <div className="flex flex-col gap-3">
            <label className="block text-xs font-bold text-slate-900">
              1. ما هو المسار الوظيفي المستهدف؟
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {CAREER_GOALS.map((goal) => {
                const Icon = goal.icon
                const isSelected = selectedGoal === goal.id
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl text-right border transition-all ${
                      isSelected
                        ? "bg-slate-50 border-slate-900 ring-1 ring-slate-900"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          {goal.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {goal.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {goal.description}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0 self-center" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Daily Commitment */}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900">
              2. كم من الوقت تستطيع تخصيصه يومياً للدراسة والتطبيق؟
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "1", label: "45-60 دقيقة", sub: "وتيرة تدريجية" },
                { id: "1-2", label: "1-2 ساعة", sub: "المعدل الموصى به" },
                { id: "3+", label: "3+ ساعات", sub: "إنجاز مكثف" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCommitment(item.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    commitment === item.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Clock className={`w-4 h-4 mx-auto mb-1 ${commitment === item.id ? "text-white" : "text-slate-500"}`} />
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className={`text-[10px] mt-0.5 ${commitment === item.id ? "text-slate-300" : "text-slate-500"}`}>{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Location */}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900">
              3. سوق العمل المستهدف للتقديمات
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "EG", label: "مصر (القاهرة والإسكندرية)" },
                { id: "SA", label: "المملكة العربية السعودية" },
                { id: "AE", label: "الإمارات والعمل عن بعد" },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setCountry(loc.id)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    country === loc.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 flex items-center justify-center gap-2 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <span>جاري ضبط المنصة...</span>
            ) : (
              <>
                <span>بدء نظام تشغيل المحلل الآن</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
