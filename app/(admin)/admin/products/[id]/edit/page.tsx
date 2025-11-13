import { fetchBrands, fetchCategories, fetchProductById } from "@/app/lib/data"
import EditProductForm from "@/app/ui/products/edit-form"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/ui/button"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [brands, categories, product] = await Promise.all([fetchBrands(), fetchCategories(), fetchProductById(id)])

  if (!product) {
    notFound()
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/productos">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a productos
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Editar Producto</h1>
          <p className="text-gray-600 mt-2">Actualiza la información del producto</p>
        </div>

        <EditProductForm product={product} brands={brands} categories={categories} />
      </div>
    </div>
  )
}
