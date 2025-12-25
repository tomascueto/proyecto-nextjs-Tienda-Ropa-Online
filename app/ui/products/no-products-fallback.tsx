import Link from "next/link"
import { Button } from "@/app/ui/button"
import { RefreshCcw, Home } from "lucide-react"

export default function NoProductsFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
     
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        No pudimos cargar los productos.
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        Esto suele ocurrir cuando la conexión es inestable o no tenemos una copia guardada de esta página.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ir al Inicio
          </Button>
        </Link>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2 border-gray-300"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="h-4 w-4" />
          Reintentar
        </Button>
      </div>
    </div>
  )
}
