"use client"

import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import { XCircle } from "lucide-react"

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <XCircle className="h-20 w-20 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-3">¡Hubo un problema con tu pago!</h1>
          <p className="text-gray-600 text-lg">
            Rechazado por error general.
          </p>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6 text-center">
              <p className="text-gray-700 text-lg">
                No pudimos procesar tu pago. Por favor, revisá los datos de tu tarjeta o intentá con otro medio de pago.
              </p>

              <p className="text-gray-600 text-sm">
                Si el problema persiste, comunicate con tu banco.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/checkout" className="block">
                  <Button className="bg-black hover:bg-gray-800 px-8 py-6 text-lg">
                    Intentar nuevamente
                  </Button>
                </Link>

                <Link href="/" className="block">
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
