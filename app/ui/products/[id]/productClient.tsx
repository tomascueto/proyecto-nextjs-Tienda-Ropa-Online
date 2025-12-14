'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { Badge } from "@/app/ui/products/badge";
import { Separator } from "@/app/ui/products/separator";
import { useCartStore } from "@/app/lib/store/cart-store";
import { Product } from "@/app/lib/definitions";
import { Card, CardContent } from "@/app/ui/products/card";

export default function ProductClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const addItem = useCartStore((state) => state.addItem);

  // 1. LÓGICA DE PRECIOS DEL PRODUCTO PRINCIPAL
  // Si price es null (o 0), usamos original_price. Si no, usamos price.
  const currentPrice = (product.price && product.price > 0) ? product.price : product.original_price;
  const originalPrice = product.original_price;
  
  // Hay descuento solo si existe 'price' Y es menor que el original
  const hasDiscount = (product.price !== null && product.price > 0) && (product.price < originalPrice);
  
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  const handleAddToCart = (prod: Product) => {
    // Calculamos el precio real también aquí para el carrito
    const realPrice = (prod.price && prod.price > 0) ? prod.price : prod.original_price;

    addItem({
      id: prod.id,
      brand_name: prod.brand_name,
      productName: prod.name,
      unitCost: realPrice, // CORREGIDO: Ahora nunca mandamos 0
      image: prod.image || "",
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)

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
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Imagen principal */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    -{discountPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Info del producto */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="text-gray-500 border-gray-300">{product.brand_name}</Badge>
                 <Badge variant="secondary" className="bg-gray-100 text-gray-700">{product.category_name}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-gray-900">
                {formatPrice(currentPrice)}
              </span>

              {hasDiscount && (
                <span className="text-2xl text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => handleAddToCart(product)}
                variant="outline"
                size="lg"
                className="flex-1 text-lg h-14 border-2 border-black hover:bg-gray-50 text-black font-semibold"
              >
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                className="flex-1 text-lg h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-200/50 transition-all"
              >
                Comprar ahora
              </Button>
            </div>

            {/* Características */}
            {product.features?.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-4">
                  Características destacadas
                </h3>
                <ul className="grid grid-cols-1 gap-3">
                  {product.features.map((feature, index) => (
                    feature && (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <span>{feature}</span>
                        </li>
                    )
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts?.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto">
            <Separator className="mb-12" />
            <h2 className="text-3xl font-bold mb-8">Productos relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                 // 2. LÓGICA DE PRECIOS PARA RELACIONADOS (Aquí estaba el error)
                 
                 // Si relatedProduct.price es null, tomamos original_price. NO ponemos 0.
                 const relCurrentPrice = (relatedProduct.price && relatedProduct.price > 0) 
                    ? relatedProduct.price 
                    : relatedProduct.original_price;
                 
                 const relOriginalPrice = relatedProduct.original_price;

                 // Chequeo estricto de oferta: price debe existir y ser menor al original
                 const relHasDiscount = (relatedProduct.price !== null && relatedProduct.price > 0) 
                    && (relatedProduct.price < relOriginalPrice);

                 return (
                    <Card key={relatedProduct.id} className="group hover:shadow-xl transition-shadow border-gray-200">
                    <CardContent className="p-0">
                        <Link href={`/products/${relatedProduct.id}`} className="relative block">
                        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                            <Image
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {relHasDiscount && (
                            <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                OFERTA
                            </span>
                        )}

                        <div className="p-4">
                            <p className="text-xs text-gray-500 mb-1 font-medium">{relatedProduct.brand_name}</p>
                            <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                            {relatedProduct.name}
                            </h3>

                            <div className="flex items-center gap-2">
                            {/* Mostramos el precio calculado correctamente */}
                            <span className="text-lg font-bold">{formatPrice(relCurrentPrice)}</span>
                            
                            {relHasDiscount && (
                                <span className="text-sm text-gray-400 line-through">
                                {formatPrice(relOriginalPrice)}
                                </span>
                            )}
                            </div>
                        </div>
                        </Link>
                    </CardContent>
                    </Card>
                 )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}