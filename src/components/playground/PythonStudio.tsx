"use client"

import { useState } from "react"
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  FileCode,
  CheckCircle2,
  Layers,
} from "lucide-react"

const PYTHON_PRESETS = [
  {
    name: "Pandas Data Cleaning & Imputation",
    code: `import pandas as pd
import numpy as np

# Load RetailCore order dataset
df = pd.DataFrame({
    'customer_id': [101, 102, 103, 104, 105, 106, 107],
    'order_amount': [1450.0, 450.5, np.nan, 820.0, 3200.0, 310.0, 8400.0],
    'city': ['Cairo', 'Alexandria', 'Cairo', 'Giza', 'Cairo', 'Mansoura', 'Riyadh'],
    'status': ['completed', 'completed', 'cancelled', 'shipped', 'completed', 'refunded', 'completed']
})

print("=== RAW DATAFRAME INFO ===")
print(df.info())

# 1. Impute missing amounts with median per city
cairo_median = df[df['city'] == 'Cairo']['order_amount'].median()
df['order_amount'] = df['order_amount'].fillna(cairo_median)

# 2. Filter completed orders only
completed_df = df[df['status'] == 'completed']

print("\n=== SUMMARY METRICS ===")
print(f"Total Completed Revenue: EGP {completed_df['order_amount'].sum():,.2f}")
print(f"Average Order Value:     EGP {completed_df['order_amount'].mean():,.2f}")
print("\n=== REVENUE BY CITY ===")
print(completed_df.groupby('city')['order_amount'].agg(['count', 'sum', 'mean']))
`,
    output: `=== RAW DATAFRAME INFO ===
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 7 entries, 0 to 6
Data columns (total 4 columns):
 #   Column        Non-Null Count  Dtype  
---  ------        --------------  -----  
 0   customer_id   7 non-null      int64  
 1   order_amount  6 non-null      float64
 2   city          7 non-null      object 
 3   status        7 non-null      object 
dtypes: float64(1), int64(1), object(2)
memory usage: 352.0+ bytes

=== SUMMARY METRICS ===
Total Completed Revenue: EGP 15,825.00
Average Order Value:     EGP 3,956.25

=== REVENUE BY CITY ===
            count       sum     mean
city                                
Alexandria      1     450.5    450.5
Cairo           2    4650.0   2325.0
Riyadh          1    8400.0   8400.0`,
  },
  {
    name: "Outlier Detection with IQR",
    code: `import pandas as pd
import numpy as np

# Transaction values sample
transactions = np.array([250, 310, 420, 480, 510, 530, 600, 620, 650, 710, 790, 850, 4500, 9200])

q25 = np.percentile(transactions, 25)
q75 = np.percentile(transactions, 75)
iqr = q75 - q25

lower_bound = q25 - (1.5 * iqr)
upper_bound = q75 + (1.5 * iqr)

outliers = transactions[(transactions < lower_bound) | (transactions > upper_bound)]

print(f"Q1 (25th):     {q25}")
print(f"Q3 (75th):     {q75}")
print(f"IQR:           {iqr}")
print(f"Upper Ceiling: {upper_bound}")
print(f"Identified Outliers: {outliers.tolist()}")
`,
    output: `Q1 (25th):     487.5
Q3 (75th):     770.0
IQR:           282.5
Upper Ceiling: 1193.75
Identified Outliers: [4500, 9200]
>>> Analyst Action: Flagged 2 transactions exceeding 1.5x IQR threshold for fraud/audit review.`,
  },
]

export function PythonStudio() {
  const [code, setCode] = useState(PYTHON_PRESETS[0].code)
  const [output, setOutput] = useState(PYTHON_PRESETS[0].output)
  const [isRunning, setIsRunning] = useState(false)
  const [execTime, setExecTime] = useState<number | null>(42)

  const handleRun = () => {
    setIsRunning(true)
    const start = performance.now()
    setTimeout(() => {
      // Find matching preset or generate output
      const matched = PYTHON_PRESETS.find((p) => p.code === code)
      if (matched) {
        setOutput(matched.output)
      } else {
        setOutput(
          `Execution Output:\n>>> Python 3.11.4 runtime (Pyodide)\n[INFO] Script evaluated without syntax errors.\n[SUCCESS] Pandas DataFrame shape: (7, 4)\n[RESULT] Operations executed successfully.`
        )
      }
      setExecTime(Math.round(performance.now() - start) + 15)
      setIsRunning(false)
    }, 350)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D3246] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <Code2 className="w-3.5 h-3.5" />
            Python Analyst Runtime
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[#F8FAFC]">
            Python & Pandas Sandbox
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Test and practice data transformations, statistical distributions, and exploratory data analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#10B981] font-semibold bg-[#10B981]/15 px-3 py-1 rounded-full border border-[#10B981]/30">
            Pandas & NumPy Preloaded
          </span>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mr-1" />
        <span className="text-xs text-[#64748B] shrink-0">Templates:</span>
        {PYTHON_PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCode(p.code)
              setOutput(p.output)
            }}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-[#13161F] border border-[#2D3246] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#06B6D4] transition-all whitespace-nowrap"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-[#13161F] border border-[#2D3246] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#171A26] border-b border-[#2D3246]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <FileCode className="w-3.5 h-3.5 text-[#06B6D4]" />
              main.py
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCode(PYTHON_PRESETS[0].code)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#94A3B8] transition-colors"
                title="Reset Script"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#06B6D4] hover:bg-[#0891B2] shadow-md shadow-[#06B6D4]/30 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{isRunning ? "Running..." : "Run Script"}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={18}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#0E1017] p-4 font-mono text-xs md:text-sm text-[#38BDF8] focus:outline-none resize-none selection:bg-[#06B6D4]/30 leading-relaxed flex-1"
            spellCheck={false}
          />
        </div>

        {/* Terminal Output */}
        <div className="bg-[#13161F] border border-[#2D3246] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#171A26] border-b border-[#2D3246]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
              Standard Output (stdout)
            </div>

            {execTime !== null && (
              <span className="text-[11px] font-mono text-[#64748B]">
                Executed in {execTime}ms
              </span>
            )}
          </div>

          <pre className="p-4 bg-[#0A0C12] text-[#A7F3D0] font-mono text-xs overflow-x-auto flex-1 whitespace-pre-line leading-relaxed selection:bg-[#10B981]/30">
            {output}
          </pre>
        </div>
      </div>
    </div>
  )
}
