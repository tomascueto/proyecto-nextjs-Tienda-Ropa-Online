"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/app/lib/store/cart-store"
import { Button } from "@/app/ui/button"
import Link from "next/link"
import Image from "next/image"

// 🧩 Helper para formatear precios
const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(price)

export default function DropdownCart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  // 1. Estado para controlar la hidratación
  const [isMounted, setIsMounted] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { items, removeItem, incrementQuantity, decrementQuantity, getTotalItems, getTotalPrice } = useCartStore()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // 2. Efecto para marcar que ya estamos en el cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Si no está montado (servidor), retornamos una versión "vacía" o simple para que coincida con el HTML estático
  // O simplemente retornamos null si prefieres que no se vea el carrito hasta cargar
  if (!isMounted) {
      return (
        <div className="relative">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cargando carrito">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        </div>
      )
  }

  const totalAmount = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" onClick={toggleDropdown} className="relative" aria-label="Abrir carrito de compras">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 bg-gray-50 text-black font-semibold border-b">
            <div className="flex items-center justify-between">
              <span>Carrito</span>
              <Button variant="ghost" size="icon" onClick={() => setIsDropdownOpen(false)} className="h-6 w-6 p-0" aria-label="Cerrar carrito">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto bg-white">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        sizes="64px"
                        className="object-cover"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.log("[v0] Image failed to load:", item.image, "Error:", e)
                        }}
                      />
                    </div>

                    <div className="flex flex-col flex-1">
                      <span className="font-semibold text-sm">
                        {item.productName}
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatPrice(item.unitCost)} c/u
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-semibold text-sm">
                        {formatPrice(item.quantity * item.unitCost)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementQuantity(item.id)}
                          className="h-6 w-6 rounded-full"
                          aria-label={`Disminuir cantidad de ${item.productName}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementQuantity(item.id)}
                          className="h-6 w-6 rounded-full"
                          aria-label={`Aumentar cantidad de ${item.productName}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                          aria-label={`Eliminar ${item.productName} del carrito`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">{formatPrice(totalAmount)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsDropdownOpen(false)}>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">Ir a pagar</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}