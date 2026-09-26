import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Analyst.OS — من خريج نظم معلومات إلى محلل بيانات في 90 يوماً",
    template: "%s | Analyst.OS",
  },
  description:
    "نظام تشغيل مهني متكامل لخريجي نظم المعلومات الإدارية (MIS) والمبتدئين للانطلاق نحو وظائف تحليل البيانات وذكاء الأعمال خلال 90 يوماً.",
  keywords: [
    "تحليل بيانات",
    "ذكاء أعمال",
    "نظم معلومات إدارية",
    "SQL",
    "Power BI",
    "Excel",
    "بايثون",
    "وظائف داتا انالست",
    "بورتفوليو داتا",
  ],
  authors: [{ name: "Analyst.OS" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    title: "Analyst.OS — من خريج نظم معلومات إلى محلل بيانات في 90 يوماً",
    description:
      "لا تحتاج إلى دورات متفرقة ومشتتة. Analyst.OS يأخذك من الصفر وحتى الجاهزية لسوق العمل في 90 يوماً عبر خطة يومية منظمة.",
    siteName: "Analyst.OS",
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
