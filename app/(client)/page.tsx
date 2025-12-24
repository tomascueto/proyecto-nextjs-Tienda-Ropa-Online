import Hero from "@/app/ui/home/hero"
import { fetchCategories, fetchProducts } from "@/app/lib/data"
import { Product, Category } from "@/app/lib/definitions"

export default async function Home() {
  let products: Product[] = [];
  let categories: Category[] = [];
  
  try {
    products = await fetchProducts()
    categories = await fetchCategories()
  } 
  catch (error) {
    console.error("Error fetching home data:", error);
  }

  const carouselImages = products.map(product => product.image)
  return (
      <Hero carouselImages={carouselImages} categories={categories}/>
  );
}
