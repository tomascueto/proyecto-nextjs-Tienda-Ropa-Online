"use client"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/app/lib/store/cart-store"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import { Separator } from "@/app/ui/products/separator"
import { Plus, Minus, X, ShoppingBag } from "lucide-react"
import { useState } from "react"

export default function CheckoutPage() {
  const { items, removeItem, incrementQuantity, decrementQuantity, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const totalAmount = getTotalPrice()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price)

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const { payment } = await import("@/app/lib/actions")
      const result = await payment(items)
      
      if (result?.url) {
        clearCart()
        window.location.href = result.url
      } 
      else {
        throw new Error("No se recibió la URL de pago")
      }
    } catch (error) {
      console.error("Error en el pago:", error)
      alert("Error al procesar el pago. Por favor intenta de nuevo.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <ShoppingBag className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  Procesando tu pedido
                </h3>
                <p className="text-gray-500">
                  Te estamos redirigiendo a Mercado Pago para completar tu compra de forma segura.
                </p>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-orange-500 animate-progress-indeterminate"></div>
              </div>

              <p className="text-xs text-gray-400">
                Por favor, no cierres esta ventana.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Carrito de compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
                console.log(item.image),
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.brand_name} {item.productName}
                          </h3>
                          <p className="text-gray-600">{formatPrice(item.unitCost)} c/u</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => decrementQuantity(item.id)}
                            className="h-8 w-8 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="font-medium w-12 text-center">{item.quantity}</span>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => incrementQuantity(item.id)}
                            className="h-8 w-8 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <span className="text-xl font-bold">{formatPrice(item.quantity * item.unitCost)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Resumen del pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} productos)</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando..." : "Proceder al pago"}
                </Button>

                <Link href="/products" className="block mt-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    Seguir comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
