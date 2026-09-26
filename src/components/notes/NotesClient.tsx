"use client"

import { useState } from "react"
import Link from "next/link"
import {
  StickyNote,
  Plus,
  Trash2,
  Calendar,
  ArrowRight,
  BookOpen,
} from "lucide-react"

interface NoteItem {
  id: string
  content: string
  dayNumber: number
  dayTitle: string
  updatedAt: string
}

const DEFAULT_NOTES: NoteItem[] = [
  {
    id: "n_1",
    dayNumber: 26,
    dayTitle: "تجميعات SQL مع GROUP BY و HAVING",
    content:
      "القاعدة الذهبية: كل عمود مذكور في جملة SELECT يجب أن يكون إما موجوداً في GROUP BY أو محاطاً بدالة تجميعية مثل SUM() أو COUNT(). تذكّر أن HAVING تُصفّي بعد التجميع بينما WHERE تُصفّي قبله.",
    updatedAt: "2024-02-14T10:30:00.000Z",
  },
  {
    id: "n_2",
    dayNumber: 15,
    dayTitle: "الجداول المحورية في إكسل (Pivot Tables)",
    content:
      "قبل إنشاء أي Pivot Table: تأكد من عدم وجود خلايا مدمجة (Merged Cells)، واجعل البيانات في جدول رسمي (Ctrl + T) لكي تتحدث النتائج تلقائياً بمجرد إضافة صفوف جديدة.",
    updatedAt: "2024-02-05T14:15:00.000Z",
  },
  {
    id: "n_3",
    dayNumber: 48,
    dayTitle: "معادلة CALCULATE في لغة DAX",
    content:
      "تعتبر CALCULATE أهم دالة في Power BI لأنها الوحيدة القادرة على تعديل سياق التصفية (Filter Context). مثال: إيرادات القاهرة = CALCULATE([إجمالي المبيعات], العملاء[المدينة] = 'القاهرة').",
    updatedAt: "2024-02-20T16:45:00.000Z",
  },
]

import { useAuth } from "@/context/AuthContext"
import { saveUserNote, deleteUserNote, getUserNotes } from "@/lib/firebase-db"
import { useEffect } from "react"

export function NotesClient({ initialNotes }: { initialNotes: NoteItem[] }) {
  const { userProfile } = useAuth()
  const uid = userProfile?.uid || "usr_demo_101"

  const [notes, setNotes] = useState<NoteItem[]>(
    initialNotes.length > 0 ? initialNotes : DEFAULT_NOTES
  )
  const [newContent, setNewContent] = useState("")
  const [newDayNum, setNewDayNum] = useState("1")
  const [showAdd, setShowAdd] = useState(false)

  // Load notes from Firestore on mount
  useEffect(() => {
    getUserNotes(uid).then((dbNotes) => {
      if (dbNotes && dbNotes.length > 0) {
        setNotes(
          dbNotes.map((n) => ({
            id: n.id,
            content: n.content,
            dayNumber: n.dayNumber,
            dayTitle: n.title,
            updatedAt: n.updatedAt,
          }))
        )
      }
    })
  }, [uid])

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newContent.trim()) return

    const num = parseInt(newDayNum, 10) || 1
    const newNote: NoteItem = {
      id: Date.now().toString(),
      content: newContent,
      dayNumber: num,
      dayTitle: `مفاهيم اليوم ${num}`,
      updatedAt: new Date().toISOString(),
    }

    setNotes((prev) => [newNote, ...prev])
    saveUserNote(uid, {
      id: newNote.id,
      dayNumber: newNote.dayNumber,
      title: newNote.dayTitle,
      content: newNote.content,
    })

    setNewContent("")
    setShowAdd(false)
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    deleteUserNote(uid, id)
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <StickyNote className="w-3.5 h-3.5 text-slate-700" />
            <span>مستودع الملاحظات والقواعد الذهبية</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            ملاحظاتي وخبراتي في الـ 90 يوماً
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            دفتر ملاحظاتك الشخصي لتوثيق المعادلات الهامة، أوامر SQL، وقواعد الأعمال.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors text-xs shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAdd ? "إلغاء" : "إضافة ملاحظة جديدة"}</span>
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <form onSubmit={handleAddNote} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-900">تدوين ملاحظة سريعة</h3>
          <div className="w-28">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">رقم اليوم:</label>
            <input
              type="number"
              min={1}
              max={90}
              value={newDayNum}
              onChange={(e) => setNewDayNum(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 text-center font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الملاحظة أو المعادلة:</label>
            <textarea
              rows={3}
              required
              placeholder="اكتب معادلة إكسل، استعلام SQL، أو قاعدة أعمال استنتجتها..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
            >
              حفظ الملاحظة
            </button>
          </div>
        </form>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href={`/days/${note.dayNumber}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                  <span>اليوم {note.dayNumber}: {note.dayTitle}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="حذف الملاحظة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed font-normal">
                {note.content}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>حُفظت في {new Date(note.updatedAt).toLocaleDateString("ar-EG")}</span>
              <Link
                href={`/days/${note.dayNumber}`}
                className="text-slate-900 font-bold hover:underline flex items-center gap-1"
              >
                <span>فتح الدرس</span>
                <ArrowRight className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
