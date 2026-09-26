"use client"

import { useState } from "react"
import {
  Database,
  Play,
  Download,
  RotateCcw,
  Table as TableIcon,
  Sparkles,
  Layers,
} from "lucide-react"

const MOCK_CUSTOMERS = [
  { customer_id: 101, first_name: "Salma", last_name: "Hassan", city: "Cairo", segment: "VIP", signup_date: "2023-01-15" },
  { customer_id: 102, first_name: "Ahmed", last_name: "Nabil", city: "Alexandria", segment: "Retail", signup_date: "2023-02-20" },
  { customer_id: 103, first_name: "Nour", last_name: "El-Din", city: "Cairo", segment: "Corporate", signup_date: "2023-03-05" },
  { customer_id: 104, first_name: "Youssef", last_name: "Mansour", city: "Giza", segment: "Retail", signup_date: "2023-04-12" },
  { customer_id: 105, first_name: "Mariam", last_name: "Kader", city: "Cairo", segment: "VIP", signup_date: "2023-05-18" },
]

const MOCK_ORDERS = [
  { order_id: 5001, customer_id: 101, total_amount: 1450.00, status: "completed", payment_method: "Credit Card", order_date: "2024-01-05" },
  { order_id: 5002, customer_id: 102, total_amount: 450.50, status: "completed", payment_method: "Fawry", order_date: "2024-01-08" },
  { order_id: 5003, customer_id: 101, total_amount: 2890.00, status: "completed", payment_method: "Credit Card", order_date: "2024-01-12" },
  { order_id: 5004, customer_id: 104, total_amount: 820.00, status: "shipped", payment_method: "Cash on Delivery", order_date: "2024-01-15" },
  { order_id: 5005, customer_id: 103, total_amount: 6700.00, status: "completed", payment_method: "Bank Transfer", order_date: "2024-01-18" },
]

const SAMPLE_QUERIES = [
  {
    name: "إيرادات شرائح العملاء",
    query: `SELECT \n  c.segment,\n  COUNT(o.order_id) AS total_orders,\n  ROUND(SUM(o.total_amount), 2) AS gross_revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'completed'\nGROUP BY c.segment\nORDER BY gross_revenue DESC;`,
  },
  {
    name: "أحدث 5 طلبات",
    query: `SELECT order_id, customer_id, total_amount, status, payment_method, order_date\nFROM orders\nLIMIT 5;`,
  },
]

export function SqlStudio() {
  const [query, setQuery] = useState(SAMPLE_QUERIES[0].query)
  const [isRunning, setIsRunning] = useState(false)
  const [queryTimeMs, setQueryTimeMs] = useState<number | null>(12)

  const [results, setResults] = useState<{
    columns: string[]
    rows: Array<Record<string, unknown>>
  }>({
    columns: ["segment", "total_orders", "gross_revenue"],
    rows: [
      { segment: "Corporate", total_orders: 2, gross_revenue: 15100.00 },
      { segment: "VIP", total_orders: 4, gross_revenue: 9490.00 },
      { segment: "Retail", total_orders: 2, gross_revenue: 1060.50 },
    ],
  })

  const handleRunQuery = () => {
    setIsRunning(true)
    const startTime = performance.now()

    setTimeout(() => {
      if (query.toLowerCase().includes("limit 5")) {
        setResults({
          columns: ["order_id", "customer_id", "total_amount", "status", "payment_method", "order_date"],
          rows: MOCK_ORDERS,
        })
      } else {
        setResults({
          columns: ["segment", "total_orders", "gross_revenue"],
          rows: [
            { segment: "Corporate", total_orders: 2, gross_revenue: 15100.00 },
            { segment: "VIP", total_orders: 4, gross_revenue: 9490.00 },
            { segment: "Retail", total_orders: 2, gross_revenue: 1060.50 },
          ],
        })
      }
      setQueryTimeMs(Math.round(performance.now() - startTime) + 6)
      setIsRunning(false)
    }, 250)
  }

  const handleExportCsv = () => {
    if (results.rows.length === 0) return
    const header = results.columns.join(",")
    const rows = results.rows.map((r) => results.columns.map((c) => JSON.stringify(r[c] ?? "")).join(","))
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `نتائج_الاستعلام_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-6xl mx-auto text-slate-900 text-right font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">ستوديو SQL التطبيقي</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            اكتب وشغّل استعلاماتك مباشرة على قاعدة بيانات RetailCore الخاصة بالمتجر.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {SAMPLE_QUERIES.map((sq, i) => (
            <button
              key={i}
              onClick={() => setQuery(sq.query)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              {sq.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor & Table (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-mono text-slate-600">query.sql</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuery("SELECT * FROM customers LIMIT 10;")}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="إعادة ضبط الاستعلام"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{isRunning ? "جاري التنفيذ..." : "تشغيل الاستعلام"}</span>
                </button>
              </div>
            </div>

            <div dir="ltr">
              <textarea
                rows={6}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-900 text-sky-300 font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed text-left"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-700">
                نتائج الاستعلام ({results.rows.length} صفوف {queryTimeMs ? `· ${queryTimeMs}ms` : ""})
              </span>
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg bg-white border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير ملف CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {results.columns.map((col) => (
                      <th key={col} className="py-2.5 px-4 font-bold text-slate-600 font-mono">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {results.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      {results.columns.map((col) => (
                        <td key={col} className="py-2.5 px-4 text-slate-700">
                          {String(row[col] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Schema Info */}
        <div className="space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 text-xs shadow-sm">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>الجداول المتاحة للاستعلام</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="font-mono font-bold text-slate-900">customers (العملاء)</div>
                <div className="text-[11px] text-slate-500 pr-2">customer_id, city, segment</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono font-bold text-slate-900">orders (الطلبات)</div>
                <div className="text-[11px] text-slate-500 pr-2">order_id, customer_id, total_amount, status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
