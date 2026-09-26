// src/components/landing/LandingDemo.tsx
"use client"

import { useState } from "react"
import { Play, CheckCircle2, Database, Table as TableIcon } from "lucide-react"

const DEMO_QUERY = `SELECT 
  city,
  COUNT(order_id) AS total_orders,
  ROUND(SUM(total_amount), 2) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
WHERE status = 'completed'
GROUP BY city
ORDER BY total_revenue DESC;`

const DEMO_RESULTS = [
  { city: "القاهرة (Cairo)", total_orders: 4820, total_revenue: "1,240,500.00", average_order_value: "257.36" },
  { city: "الإسكندرية (Alex)", total_orders: 2190, total_revenue: "542,100.00", average_order_value: "247.53" },
  { city: "الجيزة (Giza)", total_orders: 1750, total_revenue: "438,200.00", average_order_value: "250.40" },
  { city: "المنصورة (Mansoura)", total_orders: 890, total_revenue: "215,800.00", average_order_value: "242.47" },
]

export function LandingDemo() {
  const [ran, setRan] = useState(false)
  const [running, setRunning] = useState(false)

  const handleRun = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setRan(true)
    }, 400)
  }

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200 text-right" id="demo">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          تجربة عملية لدرس اليوم 26
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">
          جرب ستوديو SQL المدمج بنفسك الآن
        </p>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          بدون أي إعدادات مسبقة. شغّل استعلامات تجميعية حقيقية على معاملات متجر إلكتروني.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
        {/* شريط الإجراءات لمحرر SQL */}
        <div className="flex items-center justify-between h-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <Database className="w-3.5 h-3.5 text-slate-700" />
            <span>query_day26.sql</span>
          </div>

          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{running ? "جاري التنفيذ..." : "تشغيل الاستعلام"}</span>
          </button>
        </div>

        {/* الكود البرمجي */}
        <pre dir="ltr" className="p-4 bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto text-left">
          {DEMO_QUERY}
        </pre>

        {/* النتائج */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <TableIcon className="w-3.5 h-3.5" />
              <span>جدول نتائج الاستعلام {ran ? "(4 صفوف · 18ms)" : ""}</span>
            </div>
            {ran && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> تم التنفيذ بنجاح
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-2 px-3 font-bold text-slate-600">المنطقة / المدينة</th>
                  <th className="py-2 px-3 font-bold text-slate-600">إجمالي عدد الطلبات</th>
                  <th className="py-2 px-3 font-bold text-slate-600">إجمالي الإيرادات (جنيه)</th>
                  <th className="py-2 px-3 font-bold text-slate-600">متوسط قيمة السلة (AOV)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ran ? (
                  DEMO_RESULTS.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-900">{r.city}</td>
                      <td className="py-2 px-3 text-slate-600 font-mono">{r.total_orders.toLocaleString()}</td>
                      <td className="py-2 px-3 text-emerald-700 font-bold font-mono">{r.total_revenue}</td>
                      <td className="py-2 px-3 text-slate-600 font-mono">{r.average_order_value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                      اضغط على زر &quot;تشغيل الاستعلام&quot; أعلاه لرؤية النتائج التحليلية المستخرجة من قاعدة البيانات.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
