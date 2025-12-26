import Link from "next/link"
import { Button } from "@/app/ui/button"

export default function NoProductsFallback() {
  return (
    <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No se encontraron productos</h2>
            <p className="text-gray-500 mb-6">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Link href="/products">
              <Button>Ver todos los productos</Button>
            </Link>
          </div>
  )
}
