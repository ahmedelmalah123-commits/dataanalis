"use client"

import { useState } from "react"
import {
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react"

interface SettingsClientProps {
  user: {
    name: string
    email: string
  }
  profile: {
    careerGoal: string
    country: string
    timezone: string
    currentDay: number
  }
}

export function SettingsClient({ user, profile }: SettingsClientProps) {
  const [name, setName] = useState(user.name)
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal)
  const [country, setCountry] = useState(profile.country)
  const [timezone, setTimezone] = useState(profile.timezone)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSavedSuccess(false)

    try {
      const res = await fetch("/api/v1/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          careerGoal,
          country,
          timezone,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update profile")
      }

      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating settings")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto text-right">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
          <Settings className="w-3.5 h-3.5 text-slate-700" />
          <span>تفضيلات الحساب ومسار التعلم</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          إعدادات الحساب والمسار الوظيفي
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          خصّص دورك الوظيفي المستهدف، الدولة، وتفضيلات نظام التشغيل المهني الخاص بك.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>تم حفظ الإعدادات والتفضيلات بنجاح!</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-700" />
            <span>البيانات الشخصية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">الاسم الكامل:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">البريد الإلكتروني:</label>
              <input
                type="email"
                disabled
                dir="ltr"
                value={user.email}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed text-left"
              />
            </div>
          </div>
        </div>

        {/* Career Track Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-700" />
            <span>المسار الوظيفي المستهدف وسوق العمل</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">الدور الوظيفي المستهدف:</label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
              >
                <option value="data_analyst">محلل بيانات (Data Analyst)</option>
                <option value="bi_analyst">مطور ذكاء أعمال (BI Developer / Analyst)</option>
                <option value="business_analyst">محلل أعمال ونظم (Business / MIS Analyst)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">سوق العمل المستهدف للتقديم:</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
              >
                <option value="EG">مصر (القاهرة، الإسكندرية)</option>
                <option value="SA">المملكة العربية السعودية (الرياض، جدة)</option>
                <option value="AE">الإمارات والعمل عن بعد بالخليج</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all text-xs shadow-sm disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
