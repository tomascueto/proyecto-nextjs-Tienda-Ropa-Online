'use client'

import { useEffect } from 'react'
import { Button } from '@/app/ui/button'
import { RefreshCcw, WifiOff, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcionalmente loguear el error a un servicio de reporte
    console.error('Products Error Boundary:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
       
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        ¡Ups! Algo salió mal
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        No pudimos cargar los productos en este momento. Esto puede deberse a un problema de conexión o un error temporal en el servidor.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button 
          onClick={() => reset()}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
        >
          <RefreshCcw className="h-4 w-4" />
          Reintentar
        </Button>
        
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300">
            <Home className="h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
      
      <p className="mt-8 text-xs text-gray-400">
        ID de error: {error.digest || 'N/A'}
      </p>
    </div>
  )
}
