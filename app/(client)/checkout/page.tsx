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
      await payment(items)
      clearCart()
    } catch (error) {
      console.error("Error en el pago:", error)
      alert("Error al procesar el pago. Por favor intenta de nuevo.")
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-6">Agrega productos para continuar con la compra</p>
          <Link href="/products">
            <Button className="bg-black hover:bg-gray-800">Ver productos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
