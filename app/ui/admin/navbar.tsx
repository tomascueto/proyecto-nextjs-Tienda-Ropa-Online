"use client"

import Link from "next/link"
import Image from "next/image" // <--- 1. Importamos Image
import { LayoutDashboard, Package, Grid3x3, ShoppingBag, LogOut } from "lucide-react"
import { Button } from "@/app/ui/button"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { logOut } from "@/app/lib/actions"

export default function Navbar() {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const navigation = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Productos",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Categorías",
      href: "/admin/categories",
      icon: Grid3x3,
    },
    {
      name: "Compras Aprobadas",
      href: "/admin/compras",
      icon: ShoppingBag,
    },
  ]

  const handleLogout = () => {
    startTransition(async () => {
      await logOut()
    })
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* LOGO ADMIN */}
          <Link href="/admin" className="flex items-center gap-3">
            {/* 2. Reemplazamos el círculo negro por tu Imágen */}
            <Image 
                src="/logo-underdogs.png" 
                alt="Underdogs Admin"
                width={120}
                height={40}
                className="h-8 w-auto object-contain" // h-8 (32px) queda perfecto en un header de h-16
                priority
            />
            
            {/* 3. Mantenemos 'Admin' pero con un estilo sutil para diferenciarlo del logo */}
            <span className="font-semibold text-lg text-gray-500 border-l pl-3 border-gray-300">
                Admin
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                Ver tienda
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              disabled={isPending}
              className="hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <div className="container px-4 md:px-6">
          <nav className="flex gap-6 overflow-x-auto no-scrollbar"> {/* Agregué no-scrollbar por si hay muchas tabs en mobile */}
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 border-b-2 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-black text-black"
                      : "border-transparent text-gray-600 hover:text-black hover:border-gray-300"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}