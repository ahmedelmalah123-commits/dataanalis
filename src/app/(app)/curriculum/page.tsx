// src/app/(app)/curriculum/page.tsx
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PHASES } from "@/lib/constants"
import { CurriculumClient } from "@/components/curriculum/CurriculumClient"

export const metadata: Metadata = {
  title: "خريطة المنهج | Analyst.OS",
  description: "خريطة مسار الـ 90 يوماً خطوة بخطوة من المفاهيم الأساسية وحتى التوظيف.",
}

const ARABIC_PHASES_DATA = [
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

export default async function CurriculumPage() {
  const session = await auth()
  const userId = session?.user?.id ?? "usr_demo_101"

  try {
    // Fetch all phases and days
    const phases = await prisma.phase.findMany({
      include: {
        days: {
          orderBy: { dayNumber: "asc" },
        },
      },
      orderBy: { number: "asc" },
    })

    if (phases.length > 0) {
      let progressMap = new Map<number, { status: string; lessonReadPct: number }>()
      if (userId) {
        const userProgress = await prisma.userProgress.findMany({
          where: { userId },
          select: { dayId: true, status: true, lessonReadPct: true },
        })
        progressMap = new Map(userProgress.map((p) => [p.dayId, p]))
      }

      const curriculumData = phases.map((phase) => ({
        id: phase.id,
        number: phase.number,
        name: phase.name,
        description: phase.description,
        colorHex: phase.colorHex,
        startDay: phase.startDay,
        endDay: phase.endDay,
        days: phase.days.map((day) => {
          const prog = progressMap.get(day.id)
          return {
            id: day.id,
            dayNumber: day.dayNumber,
            title: day.title,
            subtitle: day.subtitle,
            skill: day.skill,
            estimatedMinutes: day.estimatedMinutes,
            difficulty: day.difficulty,
            xpReward: day.xpReward,
            status: day.status,
            userStatus: prog?.status ?? (day.dayNumber === 1 ? "in_progress" : "locked"),
            lessonReadPct: prog?.lessonReadPct ?? 0,
          }
        }),
      }))

      return <CurriculumClient phases={curriculumData} />
    }
  } catch (err) {
    console.warn("Using resilient fallback phases for curriculum:", err)
  }

  // Fallback 10 Arabic phases
  const fallbackCurriculum = ARABIC_PHASES_DATA.map((p) => {
    const days = []
    for (let d = p.startDay; d <= p.endDay; d++) {
      days.push({
        id: d,
        dayNumber: d,
        title:
          d === 26
            ? "التجميعات المتقدمة في SQL باستخدام GROUP BY و HAVING"
            : d === 1
            ? "مقدمة تحليل البيانات ونظم المعلومات الإدارية"
            : `اليوم ${d}: المهارات والتحليلات العملية`,
        subtitle: `تطبيق عملي خطوة بخطوة ضمن ${p.name}`,
        skill: d <= 20 ? "Excel" : d <= 35 ? "SQL" : d <= 55 ? "Power BI" : "Python",
        estimatedMinutes: 45,
        difficulty: "متوسط",
        xpReward: 100,
        status: "published",
        userStatus: d < 26 ? "completed" : d === 26 ? "in_progress" : "locked",
        lessonReadPct: d < 26 ? 100 : d === 26 ? 50 : 0,
      })
    }

    return {
      id: p.number,
      number: p.number,
      name: p.name,
      description: p.desc,
      colorHex: "#2563EB",
      startDay: p.startDay,
      endDay: p.endDay,
      days,
    }
  })

  return <CurriculumClient phases={fallbackCurriculum} />
}
