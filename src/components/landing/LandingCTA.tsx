// src/components/landing/LandingCTA.tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200 text-center">
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          جاهز لبدء رحلتك المهنية في تحليل البيانات؟
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          انضم لخريجي نظم المعلومات الذين تحولوا من الحيرة والتشتت إلى بناء مهارات حقيقية ومشاريع بورتفوليو فعلية تفتح لهم أبواب التوظيف.
        </p>

        <div className="pt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md"
          >
            <span>ابدأ اليوم الأول مجاناً الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
