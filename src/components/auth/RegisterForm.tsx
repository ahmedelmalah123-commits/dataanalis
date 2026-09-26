// src/components/auth/RegisterForm.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
]

import { useAuth } from "@/context/AuthContext"

export function RegisterForm() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Firebase Sign Up & Profile Creation
      await signUpWithEmail(name, email, password)

      // Background sync to API if available
      fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }).catch(() => {})

      router.push("/onboarding")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("email-already-in-use")) {
        setError("هذا البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول بدلاً من ذلك.")
      } else if (msg.includes("weak-password")) {
        setError("كلمة المرور ضعيفة. يرجى اختيار كلمة مرور تحتوي على 8 أحرف على الأقل.")
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب. يرجى التحقق من البيانات والمحاولة مجدداً.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError("")
    try {
      await signInWithGoogle()
      router.push("/onboarding")
    } catch {
      setError("تعذر التسجيل عبر Google حالياً. يرجى التسجيل بالبريد الإلكتروني.")
      setGoogleLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h2 className="font-bold text-xl text-slate-900 mb-2">تحقق من بريدك الإلكتروني</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            أرسلنا رابط التحقق إلى <strong className="text-slate-900 font-mono">{email}</strong>.
            اضغط على الرابط لتفعيل حسابك والبدء في اليوم الأول فوراً.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-slate-900 text-xs font-bold hover:underline"
          >
            العودة لصفحة تسجيل الدخول
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md text-right">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl text-slate-900 mb-1">
          إنشاء حساب جديد
        </h1>
        <p className="text-slate-500 text-xs">مجاناً وبدون بطاقة ائتمان. ابدأ رحلة الـ 90 يوماً اليوم.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Google */}
        <button
          id="google-register-button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors mb-5 disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
          ) : (
            <GoogleIcon />
          )}
          <span>التسجيل باستخدام Google</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs">أو بالبريد الإلكتروني</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-name" className="block text-slate-700 text-xs font-bold">
              الاسم الكامل
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="مثال: أحمد محمد"
              className="w-full h-11 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white focus:outline-none text-slate-900 text-xs placeholder:text-slate-400 px-3.5 rounded-xl transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-email" className="block text-slate-700 text-xs font-bold">
              البريد الإلكتروني
            </label>
            <input
              id="register-email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="w-full h-11 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white focus:outline-none text-slate-900 text-xs placeholder:text-slate-400 px-3.5 rounded-xl transition-colors text-left"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-password" className="block text-slate-700 text-xs font-bold">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="8 خانات على الأقل وتتضمن أرقام"
                className="w-full h-11 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white focus:outline-none text-slate-900 text-xs placeholder:text-slate-400 px-3.5 pl-10 rounded-xl transition-colors text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password requirements */}
            {password && (
              <div className="mt-1 flex flex-col gap-1">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={`flex items-center gap-1.5 text-[11px] ${req.test(password) ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    <span>{req.label === "At least 8 characters" ? "8 خانات على الأقل" : "يحتوي على أرقام"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            id="register-submit-button"
            type="submit"
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs px-4 rounded-xl transition-all shadow-sm mt-1"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? "جاري إنشاء الحساب..." : "إنشاء حساب وبدء اليوم الأول"}</span>
          </button>

          <p className="text-slate-400 text-[11px] text-center pt-1">
            بإنشائك للحساب، فأنت توافق على{" "}
            <Link href="/terms" className="text-slate-800 font-semibold underline">شروط الخدمة</Link> و{" "}
            <Link href="/privacy" className="text-slate-800 font-semibold underline">سياسة الخصوصية</Link>.
          </p>
        </form>

        <p className="text-center text-slate-500 text-xs mt-5">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-slate-900 font-bold hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}
