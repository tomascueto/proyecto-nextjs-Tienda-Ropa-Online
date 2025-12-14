'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { Badge } from "@/app/ui/products/badge";
import { Separator } from "@/app/ui/products/separator";
import { useCartStore } from "@/app/lib/store/cart-store";
import { Product } from "@/app/lib/definitions";
import { Card, CardContent } from "@/app/ui/products/card";
import { useRouter } from "next/navigation";

export default function ProductClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const isOutOfStock = !product.instock;

  const currentPrice = (product.price && product.price > 0) ? product.price : product.original_price;
  const originalPrice = product.original_price;
  const hasDiscount = (product.price !== null && product.price > 0) && (product.price < originalPrice);
  
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  const handleAddToCart = (prod: Product) => {
    const realPrice = (prod.price && prod.price > 0) ? prod.price : prod.original_price;
    addItem({
      id: prod.id,
      brand_name: prod.brand_name,
      productName: prod.name,
      unitCost: realPrice,
      image: prod.image || "",
    });
  };

  const handleBuyNow = (prod: Product) => {
    handleAddToCart(prod);
    router.push('/checkout');
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
            <div className={`relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 ${isOutOfStock ? 'opacity-75 grayscale' : ''}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* LÓGICA BADGES: Prioridad al stock */}
              {isOutOfStock ? (
                 <span className="absolute top-4 right-4 bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md z-10">
                    AGOTADO
                 </span>
              ) : hasDiscount && (
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

            {/* Botones - LÓGICA STOCK APLICADA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={isOutOfStock}
                variant="outline"
                size="lg"
                className="flex-1 text-lg h-14 border-2 border-black hover:bg-gray-50 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? "Sin Stock" : "Agregar al carrito"}
              </Button>
              <Button
                size="lg"
                disabled={isOutOfStock}
                onClick={() => handleBuyNow(product)}
                className={`flex-1 text-lg h-14 font-semibold shadow-lg transition-all ${
                    isOutOfStock 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 shadow-none" 
                    : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-orange-200/50"
                }`}
              >
                {isOutOfStock ? "No Disponible" : "Comprar ahora"}
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

        {/* Productos relacionados (También verificamos el stock aquí visualmente) */}
        {relatedProducts?.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto">
            <Separator className="mb-12" />
            <h2 className="text-3xl font-bold mb-8">Productos relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                 const relCurrentPrice = (relatedProduct.price && relatedProduct.price > 0) ? relatedProduct.price : relatedProduct.original_price;
                 const relOriginalPrice = relatedProduct.original_price;
                 const relHasDiscount = (relatedProduct.price !== null && relatedProduct.price > 0) && (relatedProduct.price < relOriginalPrice);
                 const relIsOutOfStock = !relatedProduct.instock;

                 return (
                    <Card key={relatedProduct.id} className="group hover:shadow-xl transition-shadow border-gray-200 opacity-100">
                    <CardContent className="p-0">
                        <Link href={`/products/${relatedProduct.id}`} className="relative block">
                        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                            <Image
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className={`object-cover transition-transform duration-300 ${relIsOutOfStock ? 'grayscale' : 'group-hover:scale-105'}`}
                            sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </div>
                        
                        {/* Badges Relacionados */}
                        {relIsOutOfStock ? (
                            <span className="absolute top-2 right-2 bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                AGOTADO
                            </span>
                        ) : relHasDiscount && (
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
                            <span className={`text-lg font-bold ${relIsOutOfStock ? 'text-gray-400' : ''}`}>
                                {formatPrice(relCurrentPrice)}
                            </span>
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