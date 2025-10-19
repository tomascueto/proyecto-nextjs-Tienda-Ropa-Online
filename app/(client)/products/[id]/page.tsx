
import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import { Badge } from "@/app/ui/products/badge"
import { Separator } from "@/app/ui/products/separator"
import { fetchProductById, fetchProducts } from "@/app/lib/data"
import { notFound } from 'next/navigation';



export default async function ProductDetailPage({params} : {params : {id:string} }) {

  const id = params.id  

  const [products,product] = await Promise.all([
    await fetchProducts(),
    await fetchProductById(id)
  ])


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/products">
            <Button>Volver a productos</Button>
          </Link>
        </div>
      </div>
    )
  }



  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand_name === product.brand_name || p.category_name === product.category_name))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black">
              Productos
            </Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails - Only show if more than 1 image 
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-black shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

        */}
          </div>

          

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">€{product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">€{product.originalPrice}</span>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-gray-100 rounded-xl p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Marca</span>
                <span className="font-semibold">{product.brand_name}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Categoría</span>
                <span className="font-semibold">{product.category_name}</span>
              </div>
              <Separator />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="text-lg py-6 border-2 border-black hover:bg-gray-100 bg-transparent"
              >
                Agregar al carrito
              </Button>
              <Button size="lg" className="text-lg py-6 bg-orange-500 hover:bg-orange-600 text-white">
                Comprar ahora
              </Button>
            </div>

            {/* Features */}
            <div className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Características destacadas</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 max-w-7xl mx-auto">
            <Separator className="mb-12" />
            <h2 className="text-3xl font-bold mb-8">Productos relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{relatedProduct.brand_name}</Badge>
                        </div>

                        <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {relatedProduct.name}
                        </h3>

                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">€{relatedProduct.price}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">€{relatedProduct.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
