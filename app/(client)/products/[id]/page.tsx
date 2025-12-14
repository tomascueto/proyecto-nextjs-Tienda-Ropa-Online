import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/products/card";
import { Badge } from "@/app/ui/products/badge";
import { Separator } from "@/app/ui/products/separator";
import { fetchProductById, fetchProducts } from "@/app/lib/data";
import { notFound } from "next/navigation";
import ProductClient from "@/app/ui/products/[id]/productClient";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const [products, product] = await Promise.all([
    fetchProducts(),
    fetchProductById(id),
  ]);

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
    );
  }

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand_name === product.brand_name || p.category_name === product.category_name)
    )
    .slice(0, 4);

  return (
    console.log("Renderizando página de producto con:", product, relatedProducts),
    <ProductClient product={product} relatedProducts={relatedProducts} />
  );
}
