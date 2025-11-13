'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/products/card";
import { Badge } from "@/app/ui/products/badge";
import { Separator } from "@/app/ui/products/separator";
import { useCartStore } from "@/app/lib/store/cart-store";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  brand_name: string;
  category_name: string;
  originalPrice?: number;
  features: string[];
};

export default function ProductClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      brandName: product.brand_name,
      productName: product.name,
      unitCost: product.price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">Inicio</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black">Productos</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Imagen principal */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {product.description}
              </p>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">€{product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  €{product.originalPrice}
                </span>
              )}
            </div>

            {/* Detalles */}
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
            </div>

            {/* Botones */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={() => handleAddToCart(product)}
                variant="outline"
                size="lg"
                className="text-lg py-6 border-2 border-black hover:bg-gray-100 bg-transparent"
              >
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                className="text-lg py-6 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Comprar ahora
              </Button>
            </div>

            {/* Características */}
            {product.features?.length > 0 && (
              <div className="pt-6">
                <h3 className="font-semibold text-lg mb-4">
                  Características destacadas
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts?.length > 0 && (
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
                            <span className="text-sm text-gray-400 line-through">
                              €{relatedProduct.originalPrice}
                            </span>
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
  );
}
