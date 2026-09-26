// src/app/(app)/days/[dayNumber]/page.tsx
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DayWorkspace } from "@/components/days/DayWorkspace"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dayNumber: string }>
}): Promise<Metadata> {
  const { dayNumber: param } = await params
  const dayNum = parseInt(param, 10)
  if (isNaN(dayNum)) return { title: "اليوم التدريبي | Analyst.OS" }

  try {
    const day = await prisma.day.findUnique({
      where: { dayNumber: dayNum },
      select: { dayNumber: true, title: true },
    })

    return {
      title: day ? `اليوم ${day.dayNumber}: ${day.title} | Analyst.OS` : `اليوم ${dayNum} | Analyst.OS`,
    }
  } catch {
    return {
      title: `اليوم ${dayNum}: استعلامات SQL والتحليل | Analyst.OS`,
    }
  }
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ dayNumber: string }>
}) {
  const session = await auth()
  const userId = session?.user?.id ?? "usr_demo_101"

  const { dayNumber: param } = await params
  const dayNumber = parseInt(param, 10)
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 90) {
    notFound()
  }

  // Fetch full day details
  let day = null
  let userProgress = null

  try {
    day = await prisma.day.findUnique({
      where: { dayNumber },
      include: {
        phase: true,
        lesson: true,
        exercises: { orderBy: { orderIndex: "asc" } },
        quizQuestions: { orderBy: { orderIndex: "asc" } },
        mission: true,
      },
    })

    if (day) {
      userProgress = await prisma.userProgress.findUnique({
        where: { userId_dayId: { userId, dayId: day.id } },
      })
    }
  } catch (err) {
    console.warn("Using resilient mock day data:", err)
  }

  // If day is not in database, generate rich realistic Arabic day workspace:
  const resolvedDay = day ?? {
    id: dayNumber,
    dayNumber,
    title:
      dayNumber === 26
        ? "تجميعات SQL المتقدمة باستخدام GROUP BY و HAVING"
        : dayNumber === 1
        ? "مقدمة تحليل البيانات: كيف تفكر الشركات تجارياً"
        : `اليوم ${dayNumber}: المهارات والتحليلات العملية للمحلل`,
    subtitle: "تطبيق عملي خطوة بخطوة موجه لحل مشكلات الأعمال وصنع القرارات الاستراتيجية.",
    skill: dayNumber <= 20 ? "Excel" : dayNumber <= 35 ? "SQL" : dayNumber <= 55 ? "Power BI" : "Python",
    estimatedMinutes: 45,
    difficulty: "متوسط",
    xpReward: 100,
    phase: {
      number: Math.min(10, Math.ceil(dayNumber / 9)),
      name:
        dayNumber <= 7
          ? "أساسيات تحليل البيانات وسياق الأعمال"
          : dayNumber <= 20
          ? "إكسل المتقدم و Power Query"
          : dayNumber <= 35
          ? "لغة SQL للبيانات وقواعد البيانات"
          : dayNumber <= 55
          ? "ذكاء الأعمال ولوحات تحكم Power BI"
          : "بايثون وتحليل البيانات الاستكشافي",
      colorHex: "#2563EB",
    },
    lesson: {
      learningObjective: "إتقان المفاهيم النظرية والتطبيقية لهذا الدرس وتنفيذ استعلامات وتحليلات دقيقة على بيانات الشركات.",
      sections: [
        {
          id: "sec_1",
          title: "1. سياق الأعمال والمشكلة التجارية",
          type: "concept",
          content:
            "في بيئات الأعمال الحقيقية، لا تبدأ المشاريع بطلب استعلام برمجي، بل بسؤال تجاري يطرحه المدير التنفيذي: ما هي فروعنا الأكثر ربحية؟ ولماذا تنخفض مبيعات عطلة نهاية الأسبوع؟ كمحلل، وظيفتك هي تحويل هذا السؤال إلى منطق رياضي وتحليلي يفرز الحقائق من وسط آلاف المعاملات.",
          callout: "القاعدة الذهبية: التحليل بدون سياق أعمال واضح هو مجرد أرقام بلا قيمة.",
        },
        {
          id: "sec_2",
          title: "2. التطبيق العملي وبناء الاستعلام",
          type: "code",
          content:
            "نستخدم العمليات التجميعية لتلخيص الصفوف المتكررة واستخراج المتوسطات والإجماليات. تذكر دائماً ترتيب التنفيذ المنطقي: الفلترة الأولية (WHERE)، ثم التجميع (GROUP BY)، ثم تصفية النتائج التجميعية (HAVING)، وأخيراً الترتيب (ORDER BY).",
        },
        {
          id: "sec_3",
          title: "3. نصيحة للمقابلات الوظيفية وسوق العمل",
          type: "exercise",
          content:
            "عندما يسألك مسؤول التوظيف التقني في المقابلة: 'متى تستخدم HAVING بدلاً من WHERE؟' — الإجابة الصحيحة هي: WHERE تُطبّق على كل صف على حدة قبل التجميع، بينما HAVING تُطبّق على المجاميع المحسوبة بعد تجميع الصفوف.",
        },
      ],
    },
    exercises: [
      {
        id: `ex_${dayNumber}_1`,
        orderIndex: 1,
        title: "التمرين 1: حساب إجمالي الإيرادات لكل قسم",
        instructions: "اكتب الاستعلام المناسب لحساب عدد الطلبات وإجمالي المبالغ لكل فئة من المنتجات مع ترتيبها تنازلياً.",
        starterCode: "SELECT category, COUNT(order_id), SUM(amount)\nFROM sales\nGROUP BY category\nORDER BY SUM(amount) DESC;",
        hints: ["استخدم دالة COUNT لمعرفة عدد الطلبات", "استخدم دالة SUM لحساب إجمالي المبالغ"],
        difficulty: "سهل",
      },
    ],
    quizQuestions: [
      {
        id: `q_${dayNumber}_1`,
        orderIndex: 1,
        question: "ما هو الترتيب الصحيح لتنفيذ شروط التصفية في استعلامات SQL التجميعية؟",
        options: [
          "WHERE أولاً على الصفوف، ثم HAVING على التجميعات",
          "HAVING أولاً دائماً",
          "WHERE و HAVING متطابقان تماماً",
          "ORDER BY قبل GROUP BY",
        ],
        type: "multiple_choice",
      },
    ],
    mission: {
      id: `m_${dayNumber}`,
      title: "المهمة التطبيقية: استخراج تقرير الأداء الشهري",
      description: "قم بتلخيص بيانات المبيعات المرفقة واستخرج أهم 3 توصيات لتحسين الربحية في الفروع الأقل أداءً.",
      tasks: [
        "حساب متوسط سلة المشتريات (AOV) لكل مدينة",
        "تحديد المنتجات التي تحقق هوامش ربح سالبة",
        "كتابة ملاحظة تنفيذية من 3 أسطر للإدارة",
      ],
      submissionType: "text",
    },
  }

  // Safe mappings
  const safeLesson = resolvedDay.lesson
    ? {
        learningObjective: resolvedDay.lesson.learningObjective,
        sections: (Array.isArray(resolvedDay.lesson.sections)
          ? resolvedDay.lesson.sections
          : []) as Array<{
            id: string
            title: string
            type: string
            content: string
            callout?: string
          }>,
      }
    : null

  const safeExercises = (resolvedDay.exercises || []).map((e) => ({
    id: e.id,
    orderIndex: e.orderIndex,
    title: e.title,
    instructions: e.instructions,
    starterCode: e.starterCode,
    hints: (Array.isArray(e.hints) ? (e.hints as string[]) : []),
    difficulty: e.difficulty,
  }))

  const safeQuiz = (resolvedDay.quizQuestions || []).map((q) => ({
    id: q.id,
    orderIndex: q.orderIndex,
    question: q.question,
    options: (Array.isArray(q.options) ? (q.options as string[]) : []),
    type: q.type,
  }))

  const safeMission = resolvedDay.mission
    ? {
        id: resolvedDay.mission.id,
        title: resolvedDay.mission.title,
        description: resolvedDay.mission.description,
        tasks: (Array.isArray(resolvedDay.mission.tasks)
          ? (resolvedDay.mission.tasks as string[])
          : []),
        submissionType: resolvedDay.mission.submissionType,
      }
    : null

  return (
    <DayWorkspace
      day={{
        id: resolvedDay.id,
        dayNumber: resolvedDay.dayNumber,
        title: resolvedDay.title,
        subtitle: resolvedDay.subtitle,
        skill: resolvedDay.skill,
        estimatedMinutes: resolvedDay.estimatedMinutes,
        difficulty: resolvedDay.difficulty,
        xpReward: resolvedDay.xpReward,
        phase: {
          number: resolvedDay.phase.number,
          name: resolvedDay.phase.name,
          colorHex: resolvedDay.phase.colorHex,
        },
        lesson: safeLesson,
        exercises: safeExercises,
        quizQuestions: safeQuiz,
        mission: safeMission,
      }}
      initialProgress={
        userProgress
          ? {
              id: userProgress.id,
              status: userProgress.status,
              lessonReadPct: userProgress.lessonReadPct,
              quizPassed: userProgress.quizPassed,
              quizBestScore: userProgress.quizBestScore,
              exercisesDone: userProgress.exercisesDone,
              missionSubmitted: userProgress.missionSubmitted,
            }
          : {
              id: `up_${resolvedDay.id}`,
              status: "in_progress",
              lessonReadPct: 100,
              quizPassed: true,
              quizBestScore: 100,
              exercisesDone: 1,
              missionSubmitted: false,
            }
      }
    />
  )
}
