
import ProductsClient from "@/app/ui/products/products-client";
import { fetchProductsPages, fetchFilteredProducts, fetchTotalProductsNumber, fetchCategories, fetchBrands } from "@/app/lib/data";
import { notFound } from "next/navigation";
import TimeoutFallback from "@/app/ui/products/timeout-fallback";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    brand?: string;
    category?: string;
    page?: string;
  };
}) {
    const query = searchParams?.query || "";
    const brand = searchParams?.brand || "";
    const category = searchParams?.category || "";

    const currentPage = Number(searchParams?.page) || 1;

    let isTimeout = false;
    let totalPages = 0;
    let products: any[] = [];
    let totalProducts = 0;
    let categories: any[] = [];
    let brands: any[] = [];

    try {
      // Lanzamos las peticiones en paralelo para mejor performance
      const [
        fetchedTotalPages,
        fetchedProducts,
        fetchedTotalProducts,
        fetchedCategories,
        fetchedBrands
      ] = await Promise.all([
        fetchProductsPages(query, brand, category),
        fetchFilteredProducts(query, currentPage, brand, category),
        fetchTotalProductsNumber(),
        fetchCategories(),
        fetchBrands()
      ]);

      totalPages = fetchedTotalPages;
      products = fetchedProducts;
      totalProducts = fetchedTotalProducts;
      categories = fetchedCategories;
      brands = fetchedBrands;
    } 
    catch (error: any) {
      console.log("Error detectado en ProductsPage:", error);

      // Buscamos el código de error en la raíz, en el cause o en el sourceError (específico de Neon/undici)
      const errorCode = error.code || error.cause?.code || error.sourceError?.code || error.sourceError?.cause?.code;
      const errorMessage = (error.message || "").toLowerCase();
      
      if (
        errorCode === 'UND_ERR_CONNECT_TIMEOUT' || 
        errorCode === 'ECONNRESET' ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('socket hang up')
      ) {
        isTimeout = true;
      } else {
        // Al relanzar el error el Service Worker NO cacheará una respuesta fallida (vacía) con status 200.
        notFound();
      }
    }

    if(isTimeout){
      return <TimeoutFallback />;
    }


    return (
      <>
        <ProductsClient
          products={products}
          totalPages={totalPages}
          totalProductsNumber={totalProducts}
          searchParams={searchParams}
          categories={categories}
          brands={brands}
        />
      </>
    );
}