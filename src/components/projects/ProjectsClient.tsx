"use client"

import { useState } from "react"
import {
  FolderKanban,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  BarChart3,
  Code2,
  Sparkles,
} from "lucide-react"

const ARABIC_PROJECTS = [
  {
    id: "proj_1",
    number: 1,
    title: "تحليل مبيعات متجر RetailCore الإلكتروني باستخدام SQL",
    unlockDay: 30,
    tools: ["SQL", "Excel", "Data Modeling"],
    category: "تحليل البيانات العلائقية والمبيعات",
    scenario:
      "شركة RetailCore متجر تجزئة إلكتروني يمتلك أكثر من 120,000 عملية بيع في مصر والخليج. بصفتك محلل بيانات مبتدئ في الفريق، طُلب منك فحص معدلات بقاء العملاء (Retention)، ومعرفة سبب تراجع ولاء عملاء الشريحة الذهبية (VIP)، وتقديم توصيات لرفع القيمة الدائمة للعميل (CLV).",
    deliverables: [
      "ملف استعلامات SQL يحتوي على CTEs و Window Functions لتحليل مجموعات العملاء (Cohort Retention).",
      "ملخص تنفيذي من صفحة واحدة يوضح أهم 3 أسباب لانخفاض المبيعات.",
      "مصفوفة تقسيم العملاء (RFM Segmentation).",
    ],
    xpReward: 500,
  },
  {
    id: "proj_2",
    number: 2,
    title: "لوحة تحكم TelecomX التنفيذية باستخدام Power BI",
    unlockDay: 60,
    tools: ["Power BI", "DAX", "Data Modeling", "UI/UX"],
    category: "ذكاء الأعمال وسرد القصة بالبيانات",
    scenario:
      "شركة اتصالات وإنترنت منزلي تحتاج إلى لوحة مؤشرات تنفيذية لمتابعة الإيرادات الشهرية المتكررة (MRR)، متوسط العائد لكل مشترك (ARPU)، ومعدل دوران العملاء (Churn) عبر القاهرة والإسكندرية والجيزة.",
    deliverables: [
      "لوحة تحكم تفاعلية من 3 صفحات في Power BI (نظرة عامة، سلوك المشتركين، أداء الشبكة).",
      "نموذج بيانات قياسي Star Schema يربط بين جدولي حقائق و 4 جداول أبعاد.",
      "5 معادلات DAX متقدمة لقياس النمو الشهري والمتوسط المتحرك.",
    ],
    xpReward: 750,
  },
  {
    id: "proj_3",
    number: 3,
    title: "مشروع التخرج الشامل لمحلل البيانات (Full-Stack Capstone)",
    unlockDay: 75,
    tools: ["Python", "Pandas", "SQL", "Power BI", "Portfolio"],
    category: "مشروع التخرج الشامل للبورتفوليو",
    scenario:
      "مشروع التخرج النهائي. ستقوم بأخذ ملف بيانات خام ضخم غير منسق، تنظيفه والتعامل مع القيم المفقودة ببايثون (Pandas)، تخزينه في قاعدة بيانات SQL معيارية، ثم بناء داشبورد تفاعلية وتجهيز مستودع GitHub احترافي مع فيديو توضيحي مصغر.",
    deliverables: [
      "نوت بوك بايثون يوثق خطوات التنظيف واكتشاف الشذوذ الإحصائي.",
      "مخطط قاعدة بيانات SQL واستعلامات تحويل المعطيات.",
      "رابط تقرير تفاعلي منشور متاح لمعاينة مسؤولي التوظيف.",
      "مستودع GitHub منسق بملف README مصمم لجذب شركات التوظيف.",
    ],
    xpReward: 1000,
  },
]

export function ProjectsClient({ currentDay }: { currentDay: number }) {
  const [selectedProject, setSelectedProject] = useState(ARABIC_PROJECTS[0])
  const [submissionUrl, setSubmissionUrl] = useState("")
  const [summaryNotes, setSummaryNotes] = useState("")
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!submissionUrl.trim()) return
    setSubmitted((prev) => ({ ...prev, [selectedProject.id]: true }))
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 text-slate-900 text-right font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">مشاريع البورتفوليو العملية</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          الشركات لا توظف بناءً على الشهادات وحدها، بل على المشكلات التي أثبتَّ قدرتك على حلها. هذه المشاريع الثلاثة مصممة لتكون ركيزة سيرتك الذاتية وملفك المهني.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة المشاريع */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            المشاريع المطلوبة (3)
          </div>

          <div className="space-y-3">
            {ARABIC_PROJECTS.map((project) => {
              const isUnlocked = currentDay >= project.unlockDay
              const isSelected = selectedProject.id === project.id
              const isDone = submitted[project.id]

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${isSelected ? "text-slate-200" : "text-slate-500"}`}>
                      المشروع #{project.number}
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> تم التسليم
                      </span>
                    ) : isUnlocked ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-slate-800 text-slate-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                        متاح للبدء
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Lock className="w-3 h-3" /> اليوم {project.unlockDay}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`text-[10px] px-2 py-0.5 rounded-lg ${
                          isSelected ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* تفاصيل المشروع وتسليمه */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    مشروع #{selectedProject.number}
                  </span>
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> +{selectedProject.xpReward} XP
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedProject.title}
                </h2>
              </div>

              {currentDay < selectedProject.unlockDay && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>يُفتح في اليوم {selectedProject.unlockDay}</span>
                </div>
              )}
            </div>

            {/* سيناريو المشروع */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">سياق العمل والسيناريو التجاري</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {selectedProject.scenario}
              </p>
            </div>

            {/* المخرجات المطلوبة */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">المخرجات والتسليمات المطلوبة:</h3>
              <div className="space-y-2">
                {selectedProject.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* نموذج التسليم */}
            <form onSubmit={handleProjectSubmit} className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <h3 className="font-bold text-slate-900">تسليم مخرجات المشروع</h3>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  رابط مستودع GitHub أو رابط الداشبورد المنشورة:
                </label>
                <div dir="ltr">
                  <input
                    type="url"
                    placeholder="https://github.com/your-username/retail-sql-analytics"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 text-left font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  أهم استنتاج تحليلي توصلت إليه (اختياري):
                </label>
                <textarea
                  rows={3}
                  placeholder="مثال: تبين أن 40% من انخفاض مبيعات القاهرة يعود إلى تعثر بوابات الدفع الإلكتروني في الربع الثالث..."
                  value={summaryNotes}
                  onChange={(e) => setSummaryNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {submitted[selectedProject.id] ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> تم توثيق المشروع في ملف إنجازك!
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    التسليم يثبت كفاءتك العملية ويعزز فرص توظيفك.
                  </span>
                )}

                <button
                  type="submit"
                  disabled={!submissionUrl.trim()}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 transition-colors text-xs shadow-sm"
                >
                  {submitted[selectedProject.id] ? "تحديث الرابط" : "تسليم المشروع"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
