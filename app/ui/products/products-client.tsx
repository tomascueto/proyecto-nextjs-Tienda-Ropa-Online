"use client"
import Pagination from "@/app/ui/products/pagination"
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import type { Category, Brand } from "@/app/lib/definitions"
import Filters from "@/app/ui/products/filters"
import { useCartStore } from "@/app/lib/store/cart-store"

const PRODUCTS_PER_PAGE = 12

export default function ProductsClient({
  products,
  totalPages,
  totalProductsNumber,
  searchParams,
  brands,
  categories,
}: {
  products: any[]
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
  const currentPage = Number(searchParams?.page) || 1

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const { addItem } = useCartStore()
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      brandName: product.brand,
      productName: product.name,
      unitCost: product.price,
    })
  }

  return (
    <>
      <Filters categories={categories} brands={brands} />

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Mostrando {Math.min(startIndex + 1, products.length)}-{Math.min(endIndex, products.length)} de{" "}
            {totalProductsNumber} productos
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No se encontraron productos</h2>
            <p className="text-gray-500 mb-6">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Link href="/products">
              <Button>Ver todos los productos</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <CardContent className="p-4 flex flex-col flex-1">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex-1" />

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          }).format(product.price)}
                        </span>

                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            }).format(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al carrito
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </>
        )}
      </div>
    </>
  )
}
