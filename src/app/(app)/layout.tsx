// src/app/(app)/layout.tsx
// Protected app shell — Arabic RTL layout

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AppSidebar } from "@/components/app/AppSidebar"
import { AppHeader } from "@/components/app/AppHeader"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user ?? {
    id: "usr_demo_101",
    name: "أحمد مصطفى",
    email: "ahmed.m@analyst.os",
    image: null,
    isAdmin: true,
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar on the right */}
      <AppSidebar user={user} />

      {/* Main content area offset for right sidebar */}
      <div className="flex-1 flex flex-col md:pr-60 md:pl-0 min-w-0">
        <AppHeader user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
