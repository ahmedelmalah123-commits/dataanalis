// src/components/landing/LandingHero.tsx
"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react"

export function LandingHero() {
  return (
    <section className="pt-20 pb-16 px-6 max-w-5xl mx-auto text-center space-y-8">
      {/* شارة التميز */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>مُصمم خصيصاً لخريجي نظم المعلومات الإدارية (MIS) والمبتدئين</span>
      </div>

      {/* العنوان الرئيسي */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.3]">
          من خريج نظم معلومات إلى محلل بيانات جاهز لسوق العمل في 90 يوماً.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          لن تحتاج إلى كورسات متفرقة وفيديوهات مسجلة غير منتهية. Analyst.OS هو نظام تشغيل يومي متكامل يأخذك خطوة بخطوة من الصفر لإتقان SQL و Power BI و Excel والبايثون مع بناء بورتفوليو مشاريع حقيقي.
        </p>
      </div>

      {/* أزرار الإجراء الرئيسي */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/register"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-sm"
        >
          <span>ابدأ اليوم الأول مجاناً</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <Link
          href="#curriculum"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
        >
          <span>استكشف خطة الـ 90 يوماً</span>
        </Link>
      </div>

      {/* شريط الإحصائيات والأرقام */}
      <div className="pt-8 border-t border-slate-200/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">90 يوماً</div>
          <div className="text-xs text-slate-500 mt-0.5">خطة يومية واضحة ومحددة</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">10 مراحل</div>
          <div className="text-xs text-slate-500 mt-0.5">من المفاهيم وحتى التوظيف</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">3 مشاريع</div>
          <div className="text-xs text-slate-500 mt-0.5">بورتفوليو شركات واقعي</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 font-mono">تطبيق 100%</div>
          <div className="text-xs text-slate-500 mt-0.5">محرر SQL وبايثون مدمج</div>
        </div>
      </div>

      {/* نافذة المحاكاة اليومية الهادئة */}
      <div className="pt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-lg shadow-slate-200/50 text-right max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-xs font-mono text-slate-400 mr-2">Analyst.OS · اليوم 26</span>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              مرحلة احتراف SQL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-bold text-slate-500">مهمة اليوم التطبيقية</div>
              <h3 className="text-lg font-bold text-slate-900">
                اليوم 26: التجميعات المتقدمة في SQL باستخدام GROUP BY و HAVING
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تعلم كيف تلخص الشركات مئات الآلاف من حركات البيع في أرقام دقيقة. احسب إجمالي الطلبات، إجمالي الإيرادات، ومتوسط سلة المشتريات لكل منطقة في مصر والخليج.
              </p>
              <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> تمت قراءة الشرح
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> تمرينان محلولان
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  ○ المهمة قيد الإنجاز
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-500">المرحلة الحالية</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">المرحلة 3: لغة SQL للبيانات</div>
                <div className="text-xs text-slate-500 mt-2">نسبة إنجاز المنهج</div>
                <div className="text-lg font-bold text-slate-900 font-mono flex items-center gap-1.5">
                  <span dir="ltr">28%</span>
                  <span className="text-xs text-slate-500 font-sans font-normal">(<span dir="ltr">26 / 90</span> يوماً)</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: "28%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
