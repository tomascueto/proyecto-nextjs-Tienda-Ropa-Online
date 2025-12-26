'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { Home, Search } from 'lucide-react'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Registro de error 404 para análisis posterior
    console.error(`[404 Not Found] path: ${window.location.pathname}`);
    
    // Aquí se podría enviar a un servicio de logging como Sentry o una API propia
    // fetch('/api/log/error', { method: 'POST', body: JSON.stringify({ url: window.location.href, type: '404' }) });
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        404 - Página no encontrada
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        Lo sentimos, no pudimos encontrar la página que buscas. Verificá la URL o intentá navegando por nuestros productos.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/products">
          <Button className="flex items-center gap-2 bg-black hover:bg-gray-800">
            Explorar Productos
          </Button>
        </Link>
        
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300">
            <Home className="h-4 w-4" />
            Ir al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
