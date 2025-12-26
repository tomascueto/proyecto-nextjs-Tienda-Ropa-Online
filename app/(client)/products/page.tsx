
import ProductsClient from "@/app/ui/products/products-client";
import { fetchProductsPages, fetchFilteredProducts, fetchTotalProductsNumber, fetchCategories, fetchBrands } from "@/app/lib/data";
import { notFound } from "next/navigation";

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
    catch (error) {
      console.log("Error fetching products data:", error);
      // Al relanzar el error el Service Worker NO cacheará una respuesta fallida (vacía) con status 200.
      notFound();
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