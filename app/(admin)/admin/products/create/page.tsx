import { fetchBrands, fetchCategories } from "@/app/lib/data"
import CreateProductForm from "@/app/ui/products/create-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/ui/button"

export default async function CreateProductPage() {
  const brands = await fetchBrands()
  const categories = await fetchCategories()

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/products">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a productos
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Crear Producto</h1>
          <p className="text-gray-600 mt-2">Completa el formulario para agregar un nuevo producto</p>
        </div>

        <CreateProductForm brands={brands} categories={categories} />
      </div>
    </div>
  )
}
