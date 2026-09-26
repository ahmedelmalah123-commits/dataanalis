"use client"

import { useState } from "react"
import {
  Briefcase,
  Plus,
  Building2,
  MapPin,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

interface JobApp {
  id: string
  company: string
  roleTitle: string
  location: string
  status: string
  appliedDate: string | null
  notes: string
  salary: string
}

const DEFAULT_ARABIC_APPS: JobApp[] = [
  {
    id: "app_1",
    company: "فودافون مصر للحلول الذكية (_VOIS)",
    roleTitle: "محلل ذكاء أعمال مبتدئ (Junior BI Analyst)",
    location: "القرية الذكية، القاهرة",
    status: "interviewing",
    appliedDate: "2024-02-10",
    notes: "تم اجتياز اختبار Power BI، موعد المقابلة الفنية الأسبوع القادم.",
    salary: "15,000 - 18,000 ج.م",
  },
  {
    id: "app_2",
    company: "فوري لتكنولوجيا المدفوعات (Fawry)",
    roleTitle: "محلل بيانات العمليات (Data Analyst)",
    location: "المعادي، القاهرة",
    status: "applied",
    appliedDate: "2024-02-14",
    notes: "تم إرسال السيرة الذاتية مع رابط مشروع RetailCore على GitHub.",
    salary: "15,000 ج.م",
  },
  {
    id: "app_3",
    company: "باي موب (Paymob)",
    roleTitle: "محلل بيانات نظم المعلومات (MIS Analyst)",
    location: "الجيزة، مصر",
    status: "screening",
    appliedDate: "2024-02-18",
    notes: "مكالمة التعارف مع مسؤولة التوظيف يوم الخميس.",
    salary: "16,000 ج.م",
  },
  {
    id: "app_4",
    company: "كريم (Careem / Uber)",
    roleTitle: "محلل عمليات تجارية (Operations Analyst)",
    location: "التجمع الخامس، القاهرة",
    status: "wishlist",
    appliedDate: null,
    notes: "أحتاج لمراجعة استعلامات Window Functions قبل التقديم عبر تزكية داخلية.",
    salary: "راتب تنافسي",
  },
]

const ARABIC_COLUMNS = [
  { id: "wishlist", label: "مستهدفة / محفوظة", color: "#64748B" },
  { id: "applied", label: "تم التقديم", color: "#3B82F6" },
  { id: "screening", label: "المقابلة الأولى", color: "#F59E0B" },
  { id: "interviewing", label: "المقابلة الفنية", color: "#8B5CF6" },
  { id: "offer", label: "عرض العمل (Offer)", color: "#10B981" },
]

export function JobTrackerClient({ initialApplications }: { initialApplications: JobApp[] }) {
  const [apps, setApps] = useState<JobApp[]>(
    initialApplications.length > 0 ? initialApplications : DEFAULT_ARABIC_APPS
  )
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCompany, setNewCompany] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newLocation, setNewLocation] = useState("القاهرة، مصر")
  const [newStatus, setNewStatus] = useState("wishlist")
  const [newNotes, setNewNotes] = useState("")

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCompany.trim() || !newRole.trim()) return

    const newApp: JobApp = {
      id: Date.now().toString(),
      company: newCompany,
      roleTitle: newRole,
      location: newLocation,
      status: newStatus,
      appliedDate: newStatus !== "wishlist" ? new Date().toISOString().split("T")[0] : null,
      notes: newNotes,
      salary: "",
    }

    setApps((prev) => [newApp, ...prev])
    setShowAddModal(false)
    setNewCompany("")
    setNewRole("")
    setNewNotes("")
  }

  const handleMoveStatus = (appId: string, currentStatus: string) => {
    const currentIndex = ARABIC_COLUMNS.findIndex((c) => c.id === currentStatus)
    const nextCol = ARABIC_COLUMNS[currentIndex + 1]
    if (!nextCol) return

    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: nextCol.id } : a))
    )
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto text-slate-900 text-right font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">متابعة التقديم على الوظائف</h1>
          <p className="text-xs text-slate-500 mt-1">
            لوحة كانبان منظمة لمتابعة مراحل التقديم، مواعيد المقابلات، وعروض العمل.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة فرصة مستهدفة</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {ARABIC_COLUMNS.map((col) => {
          const colApps = apps.filter((a) => a.status === col.id)
          return (
            <div
              key={col.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col min-w-[250px] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  <h3 className="text-xs font-bold text-slate-900">{col.label}</h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100">
                  {colApps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl p-3.5 space-y-2.5 transition-all text-right"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                        {app.roleTitle}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{app.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {app.location}
                      </span>
                      {app.salary && <span className="text-emerald-700 font-bold">{app.salary}</span>}
                    </div>

                    {app.notes && (
                      <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 line-clamp-2 leading-relaxed">
                        {app.notes}
                      </p>
                    )}

                    {col.id !== "offer" && (
                      <div className="pt-2 border-t border-slate-200/60 flex justify-start">
                        <button
                          type="button"
                          onClick={() => handleMoveStatus(app.id, app.status)}
                          className="text-[11px] font-bold text-slate-900 hover:text-blue-600 flex items-center gap-0.5"
                        >
                          <span>نقل للمرحلة التالية</span>
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="h-24 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
                    لا توجد فرص هنا حالياً
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            <h3 className="text-base font-bold text-slate-900">إضافة فرصة عمل مستهدفة</h3>

            <form onSubmit={handleAddApp} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">اسم الشركة:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فودافون، أمازون، فوري، بنك مصر..."
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">المسمى الوظيفي:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Junior Data Analyst, BI Specialist..."
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">الموقع الجغرافي:</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">المرحلة الحالية:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-400"
                >
                  {ARABIC_COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">ملاحظات أو روابط:</label>
                <textarea
                  rows={3}
                  placeholder="مثال: تم التقديم عبر تزكية من مسؤول الموارد البشرية..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800"
                >
                  حفظ الفرصة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
