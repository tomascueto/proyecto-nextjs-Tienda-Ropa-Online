"use client"
import { useState, useEffect } from "react"
import Pagination from "@/app/ui/products/pagination"
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import type { Category, Brand } from "@/app/lib/definitions"
import Filters from "@/app/ui/products/filters"
import { useCartStore } from "@/app/lib/store/cart-store"
import type { Product } from "@/app/lib/definitions"
import { RefreshCcw, WifiOff, Home } from "lucide-react"

const PRODUCTS_PER_PAGE = 12

export default function ProductsClient({
  products,
  totalPages,
  totalProductsNumber,
  searchParams,
  brands,
  categories,
}: {
  products: Product[] // Idealmente usa el tipo Product
  totalPages: number
  totalProductsNumber: number
  categories: Category[]
  brands: Brand[]
  searchParams?: {
    query?: string
    page?: string
    brand?: string
    category?: string
  }
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Verificación inicial segura
    if (typeof window !== 'undefined') {
       setIsOffline(!navigator.onLine);
    }

    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)

    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
    }
  }, [])

  const currentPage = Number(searchParams?.page) || 1
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  
  const { addItem } = useCartStore()
  
  const handleAddToCart = (product: any) => {
    // Calculamos el precio real para el carrito (evitamos enviar 0 si no hay oferta)
    const realPrice = (product.price && product.price > 0) ? product.price : product.original_price;

    addItem({
      id: product.id,
      brand_name: product.brand_name,
      productName: product.name,
      unitCost: realPrice,
      image: product.image,
    })
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)

  return (
    <>
      <Filters categories={categories} brands={brands} onOpenChange={setIsFilterOpen} />
      
      {isOffline && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 container mx-auto mt-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Estás navegando sin conexión. La información mostrada puede no estar actualizada.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`container mx-auto px-4 md:px-6 py-8 transition-opacity duration-200 ${isFilterOpen ? 'pointer-events-none opacity-50' : ''}`}>
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Mostrando {Math.min(startIndex + 1, totalProductsNumber)}-{Math.min(endIndex, totalProductsNumber)} de{" "}
            {totalProductsNumber} productos
          </p>
        </div>

        {products.length === 0 ? (
           <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
             <div className="mb-6 rounded-full bg-gray-100 p-6">
                <WifiOff className="h-12 w-12 text-gray-500" />
              </div>
      
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
                No pudimos cargar los productos
            </h1>
      
            <p className="mb-8 max-w-md text-gray-600">
             Esto suele ocurrir cuando la conexión es inestable y no tenemos una copia guardada de esta página.
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
              >
                <RefreshCcw className="h-4 w-4" />
                  Reintentar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                // LÓGICA DE PRECIOS
                const currentPrice = (product.price && product.price > 0) ? product.price : product.original_price;                
                const originalPrice = product.original_price ?? 0;
                const hasDiscount = (product.price && product.price > 0) && (product.price < originalPrice);
                
                // LÓGICA DE STOCK (Asumiendo que viene como 'instock' o 'inStock')
                const isOutOfStock = !product.instock;

                 return (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
                      aria-disabled={isFilterOpen}
                    >
                      <Link href={`/products/${product.id}`} className="relative block">
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            // Aplicamos escala de grises si no hay stock
                            className={`object-cover transition-transform duration-300 ${isOutOfStock ? 'grayscale opacity-80' : 'group-hover:scale-105'}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        
                        {/* LÓGICA DE BADGES (Prioridad: Sin Stock > Oferta) */}
                        {isOutOfStock ? (
                            <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                                SIN STOCK
                            </span>
                        ) : hasDiscount && (
                            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                                OFERTA
                            </span>
                        )}
                      </Link>

                      <CardContent className="p-4 flex flex-col flex-1">
                        <Link href={`/products/${product.id}`}>
                          <div className="mb-2">
                             <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">{product.brand_name}</p>
                             <h2 className="font-semibold text-lg group-hover:text-orange-500 transition-colors line-clamp-2">
                               {product.name}
                             </h2>
                          </div>
                        </Link>

                        <div className="flex-1" />

                        <div className="flex items-center justify-between mb-4 mt-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xl font-bold ${isOutOfStock ? 'text-gray-400' : ''}`}>
                              {formatPrice(currentPrice)}
                            </span>

                            {hasDiscount && !isOutOfStock && (
                              <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                {formatPrice(originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={isOutOfStock} // Deshabilitamos el botón
                          className={`w-full text-white transition-colors ${
                            isOutOfStock 
                                ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed text-gray-500" // Estilo deshabilitado
                                : "bg-black hover:bg-gray-800" // Estilo normal
                          }`}
                        >
                          {isOutOfStock ? (
                             "Agotado"
                          ) : (
                             <>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Agregar
                             </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                 )
              })}
            </div>

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </>
        )}
      </div>
    </>
  )
}