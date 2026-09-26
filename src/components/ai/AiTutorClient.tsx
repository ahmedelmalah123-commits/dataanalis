"use client"

import { useState } from "react"
import {
  Bot,
  Send,
  Database,
  BarChart3,
  Briefcase,
  HelpCircle,
  User,
  RotateCcw,
} from "lucide-react"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m_1",
    role: "assistant",
    content:
      "أهلاً بك! أنا مرشدك التقني والمهني في Analyst.OS. مهمتي مساعدتك كما يفعل كبير المحللين (Lead Analyst) في فرق العمل: تبسيط المفاهيم الصعبة، توجيهك لحل أخطاء استعلامات SQL، وتدريبك على سيناريوهات مقابلات العمل التقنية في مصر والخليج. ما هو الموضوع أو السؤال الذي تريد مناقشته اليوم؟",
    timestamp: "الآن",
  },
]

const PROMPT_SUGGESTIONS = [
  {
    icon: Database,
    label: "الفرق بين WHERE و HAVING",
    prompt: "ما هو الفرق الدقيق بين شرط WHERE وشرط HAVING في SQL بمثال تجاري واضح؟",
  },
  {
    icon: BarChart3,
    label: "تصميم Star Schema في Power BI",
    prompt: "لماذا نقسم البيانات إلى جداول حقائق (Fact) وأبعاد (Dimension) بدلاً من استيراد شيت إكسل واحد مسطح؟",
  },
  {
    icon: HelpCircle,
    label: "حل مشكلة GROUP BY الشائعة",
    prompt: "يظهر لي خطأ 'column must appear in the GROUP BY clause or be used in an aggregate function'، كيف أعالجه ببساطة؟",
  },
  {
    icon: Briefcase,
    label: "أسئلة مقابلات العمل في مصر والخليج",
    prompt: "ما هي أهم الأسئلة الفنية في SQL والإكسل التي يركز عليها مسؤولو التوظيف لوظائف الـ Junior Data Analyst؟",
  },
]

export function AiTutorClient() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Generate response
    setTimeout(() => {
      let reply = ""
      const q = query.toLowerCase()

      if (q.includes("where") && q.includes("having")) {
        reply = `سؤال ممتاز وهو من أكثر الأسئلة تكراراً في المقابلات! إليك القاعدة الذهبية التي يتذكرها كبار المحللين:\n\n**1. شرط WHERE يقوم بفلترة السجلات الفردية قبل أي تجميع (Before Aggregation):**\nتخيل WHERE كحارس أمن على باب قاعدة البيانات؛ يستبعد الطلبات الملغاة أو التالفة قبل أن تدخل في الحساب.\nمثال: \`WHERE status = 'completed'\` يضمن أن الإلغاءات لن تؤثر في الإيراد.\n\n**2. شرط HAVING يقوم بفلترة النتائج المجمعة بعد الـ GROUP BY (After Aggregation):**\nتخيله كالمشرف الذي يفرز المجموعات الناتجة فقط.\nمثال: \`HAVING SUM(total_amount) > 10000\` يستخرج فقط العملاء الذين تجاوز إجمالي مشترياتهم 10 آلاف جنيه.\n\n**القاعدة السريعة:** إذا كنت تفلتر باستخدام دالة تجميعية مثل \`SUM()\` أو \`COUNT()\` أو \`AVG()\`، يجب استخدام **HAVING** وليس WHERE!`
      } else if (q.includes("star schema") || q.includes("dimension") || q.includes("fact") || q.includes("power bi")) {
        reply = `إليك الأسباب الفنية الجوهرية التي تجعل مهندسي ذكاء الأعمال يعتمدون نموذج **Star Schema** حصراً:\n\n1. **السرعة وضغط الذاكرة:** محرك Power BI (VertiPaq) صُمم لضغط الأعمدة بكفاءة هائلة. فصل الأبعاد (العميل، المنتج، التاريخ) عن الحقائق (حركات البيع) يقلل استهلاك الذاكرة ويجعل المعادلات فائقة السرعة.\n2. **تحديث البيانات بسلاسة:** إذا غير عميل عنوانه، تقوم بتحديث سطر واحد في جدول \`dim_customer\`، بدلاً من تعديل 100 ألف حركة بيع مسجلة له.\n3. **سهولة التحليل للقيادة:** يمكن لصاحب العمل سحب البعد والقياس بسهولة تامة دون الدخول في مشاكل العلاقات المعقدة (Many-to-Many).`
      } else if (q.includes("group by") || q.includes("aggregate function")) {
        reply = `هذا الخطأ هو التحدي الأول الذي يمر به كل محلل مبتدئ! وإليك سببه المباشر:\n\nعندما تستخدم \`GROUP BY\`، فإن قاعدة البيانات تلخص مئات الصفوف في صف إجمالي واحد لكل فئة. لذلك تشترط قاعدة البيانات أن يكون **كل عمود** مكتوب في جملة \`SELECT\` إما:\n1. مكتوباً داخل جملة \`GROUP BY\` نفسها (مثل \`city\` أو \`category\`).\n2. أو ملفوفاً داخل دالة تجميعية (مثل \`SUM(amount)\` أو \`COUNT(*)\`).\n\nفإذا كتبت \`SELECT customer_id, first_name, COUNT(*) FROM orders GROUP BY customer_id;\`، فلن تعرف قاعدة البيانات أي \`first_name\` تظهره إن كان هناك أكثر من اسم! الحل ببساطة هو إضافة \`first_name\` إلى الـ GROUP BY.`
      } else if (q.includes("مقابلات") || q.includes("مصر") || q.includes("الخليج") || q.includes("interview")) {
        reply = `في السوق المصري والخليجي، تركز المقابلات الفنية لوظائف المبتدئين على **ثلاثة محاور رئيسية**:\n\n1. **إتقان SQL العملي:**\n- الفرق بين \`LEFT JOIN\` و \`INNER JOIN\` وكيف تتجنب فقدان البيانات.\n- التجميعات وحساب النسب المئوية باستخدام \`GROUP BY\`.\n- الدوال الترتيبية مثل \`DENSE_RANK()\` و \`ROW_NUMBER()\`.\n\n2. **الحس التجاري (Business Acumen):**\n- هل تفهم معنى معدل دوران العملاء (Churn Rate) ومتوسط قيمة السلة (AOV)؟\n- إذا انخفضت مبيعات الأسبوع بنسبة 15%، ما هي أول 3 مؤشرات ستفحصها؟\n\n3. **شرح المشروع في البورتفوليو:**\n- لا تكتفِ بالقول "بنيت داشبورد"، بل اشرح: ما هي المشكلة التجارية، وما التوصية التي ساعدت الإدارة على اتخاذها؟`
      } else {
        reply = `هذه نقطة ممتازة ومهمة في التحليل اليومي. عند التعامل مع هذا السؤال، أنصحك دائماً بتقسيم الحل إلى 3 خطوات عملية:\n\n1. **مصدر البيانات:** ما هو الجدول أو الملف الذي يحتوي على الأرقام الخام الأصلية؟\n2. **التحويل الحسابي:** ما هي المعادلة أو استعلام الـ SQL المطلوب لحساب النتيجة بدقة؟\n3. **القرار التجاري:** ما هو الإجراء أو التوصية التي سيتخذها مدير الشركة بعد رؤية هذا الرقم؟\n\nهل تود أن نطبق مثالاً عملياً معاً على هذا المفهوم الآن؟`
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 500)
  }

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto h-[calc(100vh-4.5rem)] flex flex-col text-slate-900 text-right font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">المعلم الذكي لمحللي البيانات</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                متاح للمساعدة
              </span>
            </div>
            <p className="text-xs text-slate-500">
              توجيه سقراطي، استكشاف أخطاء SQL، والتدريب على مقابلات التوظيف
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>محادثة جديدة</span>
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        {PROMPT_SUGGESTIONS.map((item, i) => {
          const Icon = item.icon
          return (
            <button
              key={i}
              onClick={() => handleSend(item.prompt)}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 text-right transition-all text-xs shadow-sm group"
            >
              <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pl-1">
        {messages.map((m) => {
          const isUser = m.role === "user"
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                  isUser
                    ? "bg-slate-900 text-white rounded-tr-none shadow-sm"
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                }`}
              >
                {m.content}
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    isUser ? "text-slate-300 text-left" : "text-slate-400"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce [animation-delay:0.4s]" />
              <span>المعلم الذكي يجهز التوجيه التحليلي...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="relative shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اطرح سؤالك في SQL، إكسل، Power BI، أو التحضير للمقابلات..."
          className="w-full bg-white border border-slate-200 rounded-2xl pr-5 pl-14 py-3 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}
