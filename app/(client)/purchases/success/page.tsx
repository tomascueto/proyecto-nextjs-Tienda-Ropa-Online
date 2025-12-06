"use client"

import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-3">¡Tu pago fue aprobado!</h1>
          <p className="text-gray-600 text-lg">
            Gracias por tu compra. Estamos procesando tu pedido.
          </p>
        </div>

        {/* Main card */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6 text-center">
              <p className="text-gray-700 text-lg">
                En unos momentos recibirás un correo de confirmación con los detalles de tu compra.
              </p>

              <p className="text-gray-600 text-sm">
                Si tenés alguna duda, podés contactarnos a nuestro email.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/products" className="block">
                  <Button className="bg-black hover:bg-gray-800 px-8 py-6 text-lg">
                    Seguir comprando
                  </Button>
                </Link>

                <Link href="/" className="block">
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Volver al inicio
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Gracias por confiar en nosotros.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
