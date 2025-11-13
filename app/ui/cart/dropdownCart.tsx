"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/app/lib/store/cart-store"
import { Button } from "@/app/ui/button"
import Link from "next/link"

export default function DropdownCart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { items, removeItem, incrementQuantity, decrementQuantity, getTotalItems, getTotalPrice } = useCartStore()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

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

  const totalAmount = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" onClick={toggleDropdown} className="relative">
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
              <Button variant="ghost" size="icon" onClick={() => setIsDropdownOpen(false)} className="h-6 w-6 p-0">
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
                    <div className="flex flex-col flex-1">
                      <span className="font-semibold text-sm">
                        {item.brandName} {item.productName}
                      </span>
                      <span className="text-sm text-gray-600">€{item.unitCost.toFixed(2)} c/u</span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-semibold text-sm">€{(item.quantity * item.unitCost).toFixed(2)}</span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementQuantity(item.id)}
                          className="h-6 w-6 rounded-full"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementQuantity(item.id)}
                          className="h-6 w-6 rounded-full"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
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
                <span className="font-semibold text-lg">€{totalAmount.toFixed(2)}</span>
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
