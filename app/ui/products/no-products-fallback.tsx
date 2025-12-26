import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Home } from "lucide-react"

export default function NoProductsFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
     
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        No se encontraron productos.
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        Intenta ajustar tus filtros o términos de búsqueda.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ir al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
