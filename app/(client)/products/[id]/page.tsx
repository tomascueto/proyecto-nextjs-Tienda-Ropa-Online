import Link from "next/link";
import { Button } from "@/app/ui/button";
import { fetchProductById, fetchProducts } from "@/app/lib/data";
import ProductClient from "@/app/ui/products/[id]/productClient";
import { Product } from "@/app/lib/definitions";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  let products: Product[] = [];
  let product: Product | undefined = undefined;
  let error = false;

  try {
    const [fetchedProducts, fetchedProduct] = await Promise.all([
      fetchProducts(),
      fetchProductById(id),
    ]);
    products = fetchedProducts;
    product = fetchedProduct;
  } catch (e) {
    console.error("Error fetching product details:", e);
    error = true;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold mb-4">
            {error ? "No se pudo cargar el producto" : "Producto no encontrado"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error 
              ? "Verifica tu conexión a internet e intenta nuevamente." 
              : "El producto que buscas no existe o fue eliminado."}
          </p>
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
    <ProductClient product={product} relatedProducts={relatedProducts} />
  );
}
