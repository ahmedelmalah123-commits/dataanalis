// src/components/landing/LandingCurriculum.tsx

const ARABIC_PHASES = [
  { number: 1, name: "أساسيات تحليل البيانات وسياق الأعمال", startDay: 1, endDay: 7, desc: "فهم دور المحلل، أنواع البيانات، وكيف تفكر الشركات تجارياً." },
  { number: 2, name: "إكسل المتقدم و Power Query للمحللين", startDay: 8, endDay: 20, desc: "معادلات البحث المتقدمة، الجداول المحورية (Pivot Tables)، وتنظيف الملفات الضخمة." },
  { number: 3, name: "لغة SQL للبيانات وقواعد البيانات العلائقية", startDay: 21, endDay: 35, desc: "من جمل SELECT وحتى الدوال التجميعية و Window Functions و CTEs." },
  { number: 4, name: "الإحصاء التطبيقي ومؤشرات الأداء (KPIs)", startDay: 36, endDay: 42, desc: "مقاييس النزعة المركزية والتشتت، واكتشاف القيم الشاذة، وتحليل الاتجاهات." },
  { number: 5, name: "ذكاء الأعمال ولوحات تحكم Power BI", startDay: 43, endDay: 55, desc: "نمذجة البيانات بنظام Star Schema، معادلات DAX المتقدمة، وسرد القصة بالبيانات." },
  { number: 6, name: "بايثون للتحليل ومكتبات Pandas & NumPy", startDay: 56, endDay: 65, desc: "تنظيف ومعالجة الجداول الكبيرة، والتعامل مع التواريخ والقيم المفقودة." },
  { number: 7, name: "تحليل نظم الأعمال ومتطلبات الإدارة", startDay: 66, endDay: 72, desc: "ترجمة متطلبات الإدارة إلى مواصفات فنية، وتحليل مسارات العمل التشغيلية." },
  { number: 8, name: "تنفيذ وتسليم مشاريع البورتفوليو الثلاثة", startDay: 73, endDay: 82, desc: "تطبيق عملي كامل على بيانات التجارة والاتصالات وبناء ملف أعمال قوي." },
  { number: 9, name: "الاستعداد لمقابلات العمل التقنية", startDay: 83, endDay: 87, desc: "مراجعة الأسئلة الشائعة في مصر والخليج، وتجهيز السيرة الذاتية الاحترافية." },
  { number: 10, name: "إطلاق التقديمات والتسويق الشخصي على LinkedIn", startDay: 88, endDay: 90, desc: "استراتيجيات التقديم المباشر وشبكة العلاقات للحصول على أول عرض عمل." },
]

export function LandingCurriculum() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200 text-right" id="curriculum">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          خريطة المنهج في 90 يوماً
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">
          10 مراحل متسلسلة من البداية وحتى التوظيف
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARABIC_PHASES.map((phase) => (
          <div
            key={phase.number}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 flex items-start gap-4 shadow-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 font-mono">
              {phase.number}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono font-medium">
                  الأيام {phase.startDay}–{phase.endDay}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{phase.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
