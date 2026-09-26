// src/components/landing/LandingFeatures.tsx
import { Target, Database, BarChart2, Briefcase, Code, CheckCircle2 } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "1. خطة يومية محددة بدون تشتت",
    description: "كل يوم له درس واحد ومهمة واحدة. تعرف دائماً ماذا تدرس، ماذا تطبق، ومتى ينتهي إنجاز يومك.",
  },
  {
    icon: Database,
    title: "2. ممارسة SQL حقيقية بالمتصفح",
    description: "كتابة استعلامات حقيقية مع SELECT و JOIN و GROUP BY على بيانات تجارة إلكترونية فعلية دون تعقيدات تثبيت البرامج.",
  },
  {
    icon: BarChart2,
    title: "3. لوحات تحكم Power BI احترافية",
    description: "بناء تقارير تنفيذية حقيقية بنماذج Star Schema ومعادلات DAX تجيب على تساؤلات الإدارة وصناع القرار.",
  },
  {
    icon: Code,
    title: "4. بايثون وبانداس موجهة للتحليل",
    description: "بدون تعقيدات هندسة البرمجيات النظرية. نركز على أهم 20% في بايثون لتنظيف الداتا واكتشاف الأنماط الإحصائية.",
  },
  {
    icon: Briefcase,
    title: "5. ثلاثة مشاريع بورتفوليو واقعية",
    description: "تتخرج ومعك 3 دراسات حالة متكاملة في سيرتك الذاتية و GitHub يطلبها مسؤولو التوظيف في مصر والخليج.",
  },
  {
    icon: CheckCircle2,
    title: "6. مسار إطلاق وظيفي واستعداد للمقابلات",
    description: "متابعة التقديم على الشركات، التدريب على أسئلة المقابلات التقنية الشائعة، وتجهيز بروفايل LinkedIn قوي.",
  },
]

export function LandingFeatures() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200" id="features">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          لماذا تنجح منظومة Analyst.OS؟
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">
          كل ما تحتاجه للتوظيف، بدون حشو أو تكرار
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-sm hover:border-slate-300 transition-colors text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
