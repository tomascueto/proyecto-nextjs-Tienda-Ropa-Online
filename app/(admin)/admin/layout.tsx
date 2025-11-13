
import type React from "react"
import Navbar from "@/app/ui/admin/navbar"
import '@/app/ui/global.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container px-4 md:px-6 py-8">{children}</main>
    </div>
  )
}
