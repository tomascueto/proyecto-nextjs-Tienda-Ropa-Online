
import ProductsClient from "@/app/ui/products/products-client";
import { fetchProductsPages, fetchFilteredProducts, fetchTotalProductsNumber, fetchCategories, fetchBrands } from "@/app/lib/data";

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
      totalPages = await fetchProductsPages(query, brand, category);
      products = await fetchFilteredProducts(query, currentPage, brand, category);
      totalProducts = await fetchTotalProductsNumber();
      categories = await fetchCategories();
      brands = await fetchBrands();
    } 
    catch (error) {
      console.error("Error fetching products data:", error);
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