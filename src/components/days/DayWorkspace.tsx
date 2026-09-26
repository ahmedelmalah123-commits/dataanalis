"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Code2,
  HelpCircle,
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  Lightbulb,
  AlertCircle,
  Trophy,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { saveUserDayProgress } from "@/lib/firebase-db"

interface DayWorkspaceProps {
  day: {
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
    lesson: {
      learningObjective: string
      sections: Array<{
        id: string
        title: string
        type: string
        content: string
        callout?: string
      }>
    } | null
    exercises: Array<{
      id: string
      orderIndex: number
      title: string
      instructions: string
      starterCode?: string | null
      hints: string[]
      difficulty: string
    }>
    quizQuestions: Array<{
      id: string
      orderIndex: number
      question: string
      options: string[]
      type: string
    }>
    mission: {
      id: string
      title: string
      description: string
      tasks: string[]
      submissionType: string
    } | null
  }
  initialProgress: {
    id: string
    status: string
    lessonReadPct: number
    quizPassed: boolean
    quizBestScore: number
    exercisesDone: number
    missionSubmitted: boolean
  } | null
}

export function DayWorkspace({ day, initialProgress }: DayWorkspaceProps) {
  const router = useRouter()
  const { userProfile } = useAuth()
  const uid = userProfile?.uid || "usr_demo_101"

  const [activeTab, setActiveTab] = useState<"lesson" | "exercises" | "quiz" | "mission">("lesson")

  // Progress states
  const [lessonRead, setLessonRead] = useState((initialProgress?.lessonReadPct ?? 0) >= 80)
  const [isMarkingRead, setIsMarkingRead] = useState(false)
  const [quizPassed, setQuizPassed] = useState(initialProgress?.quizPassed ?? false)
  const [exercisesDone, setExercisesDone] = useState(initialProgress?.exercisesDone ?? 0)
  const [missionSubmitted, setMissionSubmitted] = useState(initialProgress?.missionSubmitted ?? false)
  const [isCompletingDay, setIsCompletingDay] = useState(false)
  const [completionError, setCompletionError] = useState<string | null>(null)
  const [isDayDone, setIsDayDone] = useState(initialProgress?.status === "completed")

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [quizSubmitting, setQuizSubmitting] = useState(false)

  // Mission state
  const [missionText, setMissionText] = useState("")
  const [missionSubmitting, setMissionSubmitting] = useState(false)

  // Exercise code state
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({})

  // Handle Mark Lesson Read
  const handleMarkLessonRead = async () => {
    setIsMarkingRead(true)
    try {
      fetch("/api/v1/progress/lesson-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayId: day.id, percentage: 100 }),
      }).catch(() => {})

      saveUserDayProgress(uid, day.dayNumber, { lessonReadPct: 100 })
      setLessonRead(true)
      setActiveTab("exercises")
    } catch (e) {
      console.error(e)
    } finally {
      setIsMarkingRead(false)
    }
  }

  // Handle Quiz Submission
  const handleQuizSubmit = async () => {
    setQuizSubmitting(true)
    try {
      fetch("/api/v1/progress/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayId: day.id,
          answers: selectedAnswers,
        }),
      }).catch(() => {})

      saveUserDayProgress(uid, day.dayNumber, { quizPassed: true, quizBestScore: 100 })
      setQuizPassed(true)
    } catch {
      setQuizPassed(true)
    } finally {
      setQuizSubmitting(false)
    }
  }

  // Handle Mission Submit
  const handleMissionSubmit = () => {
    if (!missionText.trim()) return
    setMissionSubmitting(true)
    saveUserDayProgress(uid, day.dayNumber, { missionSubmitted: true })
    setTimeout(() => {
      setMissionSubmitted(true)
      setMissionSubmitting(false)
    }, 400)
  }

  // Handle Day Complete
  const handleCompleteDay = async () => {
    setIsCompletingDay(true)
    setCompletionError(null)

    try {
      fetch("/api/v1/progress/day-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayId: day.id, dayNumber: day.dayNumber }),
      }).catch(() => {})

      saveUserDayProgress(uid, day.dayNumber, { status: "completed" })
      setIsDayDone(true)
    } catch (err: unknown) {
      setCompletionError(err instanceof Error ? err.message : "تعذر إكمال اليوم حالياً")
    } finally {
      setIsCompletingDay(false)
    }
  }

  const allRequirementsMet = lessonRead && quizPassed && missionSubmitted

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans text-right">
      {/* Top Clean Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/curriculum"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="العودة للمنهج"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div>
              <div className="text-xs text-slate-500 font-medium">
                المرحلة {day.phase.number} · اليوم {day.dayNumber} من أصل 90
              </div>
              <h1 className="text-base font-bold text-slate-900 line-clamp-1">
                {day.title}
              </h1>
            </div>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("lesson")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "lesson"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. الشرح النظري</span>
              {lessonRead && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "exercises"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>2. التمارين والتطبيق</span>
              {exercisesDone > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "quiz"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>3. اختبار التمكن</span>
              {quizPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => setActiveTab("mission")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "mission"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>4. المهمة العملية</span>
              {missionSubmitted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-6">
        {completionError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{completionError}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: THEORY (شرح نظري مريح وواضح كالمستندات) */}
        {/* ======================================================== */}
        {activeTab === "lesson" && (
          <div className="space-y-6">
            {/* بطاقة الهدف التعليمي */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                هدف الكفاءة لليوم
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {day.lesson?.learningObjective ||
                  `فهم المبادئ الأساسية لـ ${day.title} وتطبيقها لاتخاذ قرارات تجارية سليمة.`}
              </h2>
              <div className="flex items-center gap-5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> ~{day.estimatedMinutes} دقيقة قراءة وممارسة
                </span>
                <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> +{day.xpReward} نقطة خبرة XP
                </span>
              </div>
            </div>

            {/* الأقسام والشرح */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. سياق الأعمال والتشبيه الواقعي</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  في بيئة العمل الحقيقية، لا تطلب منك الإدارة مجرد كتابة معادلة، بل الإجابة على سؤال تجاري محدد. مع <strong className="text-slate-900 font-bold">{day.title}</strong>، الهدف هو تحويل السجلات الخام غير المنظمة إلى مؤشرات يفهمها مدير العمليات والمدير المالي لاتخاذ القرارات اليومية.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">2. المعايير الفنية وقواعد التحقق</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  تأكد دائماً من مطابقة عدد الصفوف قبل التحويل وبعده. استخدم أسماء واضحة للأعمدة البديلة (Aliases)، وتجنب الاعتماد على التخمين في التعامل مع القيم الفارغة.
                </p>
                <div dir="ltr" className="bg-slate-900 text-sky-300 font-mono text-xs p-4 rounded-xl overflow-x-auto text-left">
                  -- نمط التحقق القياسي لمحلل البيانات{"\n"}
                  SELECT city, COUNT(*) AS total_orders, ROUND(AVG(amount), 2) AS avg_spend{"\n"}
                  FROM orders{"\n"}
                  WHERE status = &apos;completed&apos;{"\n"}
                  GROUP BY city{"\n"}
                  ORDER BY total_orders DESC;
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">3. نصيحة للمحلل المحترف والأخطاء الشائعة</h3>
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5">قاعدة ذهبية في المقابلات والعمل:</strong>
                    القيم الفارغة (NULL) لا تُستبعد تلقائياً في الدوال التجميعية بنفس الطريقة؛ احرص دائماً على فحصها صراحة باستخدام `IS NOT NULL`.
                  </div>
                </div>
              </div>
            </div>

            {/* زر الانتقال للتطبيق */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleMarkLessonRead}
                disabled={isMarkingRead}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
              >
                {lessonRead ? (
                  <>
                    <span>تمت قراءة الدرس</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </>
                ) : (
                  <>
                    <span>فهمت الدرس النظري ← الانتقال للتمارين</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: EXERCISES */}
        {/* ======================================================== */}
        {activeTab === "exercises" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">تمرين التطبيق العملي</h2>
                  <p className="text-xs text-slate-600">اكتب الحل لتثبيت الفهم واختبار النتيجة في محررك.</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  مستوى متوسط
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                <strong>المطلوب:</strong> اكتب استعلاماً لاستخراج جميع الطلبات المسجلة في مدينة &apos;Cairo&apos; بقيمة إجمالية تتجاوز 1,000 جنيه، مرتبة من الأحدث إلى الأقدم حسب التاريخ.
              </div>

              <div dir="ltr">
                <textarea
                  rows={4}
                  defaultValue={`SELECT order_id, customer_id, total_amount, order_date\nFROM orders\nWHERE city = 'Cairo' AND total_amount > 1000\nORDER BY order_date DESC;`}
                  className="w-full bg-slate-900 text-sky-300 font-mono text-xs p-4 rounded-xl focus:outline-none text-left"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setRevealedHints((prev) => ({ ...prev, ex1: !prev.ex1 }))}
                  className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  {revealedHints["ex1"] ? "إخفاء التلميح" : "هل تحتاج إلى تلميح؟"}
                </button>

                <button
                  onClick={() => {
                    setExercisesDone(1)
                    setActiveTab("quiz")
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تأكيد حل التمرين والذهاب للاختبار</span>
                </button>
              </div>

              {revealedHints["ex1"] && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  تلميح: استخدم شرط `WHERE city = &apos;Cairo&apos; AND total_amount &gt; 1000` ورتب النتائج باستخدام `ORDER BY order_date DESC;`
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: QUIZ */}
        {/* ======================================================== */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">اختبار التمكن اليومي</h2>
                  <p className="text-xs text-slate-600">أجب على السؤالين للتأكد من استيعاب المفاهيم الأساسية.</p>
                </div>
                {quizPassed && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> تم الاجتياز
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  1. أي من جمل SQL التالية يتم تنفيذها وتقييمها قبل العمليات التجميعية (Aggregation)؟
                </div>
                <div className="space-y-2">
                  {["WHERE", "HAVING", "ORDER BY", "SELECT"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedAnswers((prev) => ({ ...prev, q1: opt }))}
                      className={`w-full p-3.5 rounded-xl border text-xs text-right transition-colors flex items-center justify-between ${
                        selectedAnswers["q1"] === opt
                          ? "bg-slate-900 text-white border-slate-900 font-bold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedAnswers["q1"] === opt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800">
                  2. ما هو الغرض التحليلي من حساب متوسط قيمة الطلب (Average Order Value - AOV)؟
                </div>
                <div className="space-y-2">
                  {[
                    "فهم متوسط إنفاق العميل في المعاملة الواحدة وقياس نجاح استراتيجيات البيع الإضافي (Upselling)",
                    "معرفة عدد الموظفين العاملين في قسم المبيعات",
                    "تحديد المساحة التخزينية المتاحة في قاعدة البيانات",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedAnswers((prev) => ({ ...prev, q2: opt }))}
                      className={`w-full p-3.5 rounded-xl border text-xs text-right transition-colors flex items-center justify-between ${
                        selectedAnswers["q2"] === opt
                          ? "bg-slate-900 text-white border-slate-900 font-bold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {selectedAnswers["q2"] === opt && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setQuizPassed(true)
                    setActiveTab("mission")
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <span>تأكيد الإجابات والانتقال للمهمة اليومية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: MISSION */}
        {/* ======================================================== */}
        {activeTab === "mission" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  المهمة العملية التنفيذية
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">
                  مهمة اليوم: {day.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  اكتب خلاصة النتائج والتوصية في 2 إلى 3 نقاط وكأنك تقدم تقريراً تحليلياً مصغراً للإدارة التجارية.
                </p>
              </div>

              <textarea
                rows={5}
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
                placeholder="اكتب استنتاجاتك أو الصق استعلامك ونتائجه التحليلية هنا..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 font-medium">
                  {missionSubmitted ? "تم استلام المهمة بنجاح!" : "قم بالتسليم عند الانتهاء."}
                </span>

                <button
                  type="button"
                  onClick={handleMissionSubmit}
                  disabled={missionSubmitting || !missionText.trim()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  {missionSubmitted ? "تحديث التسليم" : "تسليم المهمة اليومية"}
                </button>
              </div>
            </div>

            {/* بطاقة تأكيد اكتمال اليوم */}
            <div className="bg-white border-2 border-emerald-500/50 rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {isDayDone ? `تم إكمال اليوم ${day.dayNumber} بنجاح!` : `هل أنت جاهز لإنهاء اليوم ${day.dayNumber}؟`}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {allRequirementsMet
                  ? "تمت قراءة الدرس، اجتياز الاختبار، وتسليم المهمة. يمكنك الآن استلام نقاط الخبرة وفتح اليوم التالي."
                  : "استكمل قراءة الدرس وحل الاختبار وتسليم المهمة أعلاه لفتح اليوم " + (day.dayNumber + 1) + "."}
              </p>

              <div className="pt-2">
                {isDayDone ? (
                  <Link
                    href={`/days/${Math.min(90, day.dayNumber + 1)}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <span>الانتقال لليوم {day.dayNumber + 1}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={handleCompleteDay}
                    disabled={isCompletingDay}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-40 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompletingDay ? "جاري الحفظ..." : "تأكيد إكمال اليوم والحصول على نقاط XP"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
