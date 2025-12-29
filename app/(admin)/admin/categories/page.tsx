import { fetchCategories } from "@/app/lib/data"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/admin/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/admin/table"
import DeleteButton from '@/app/ui/categories/deletebutton'
import EditCategoryButton from "@/app/ui/categories/editcategory"
import ProductIdCell from "@/app/ui/products/product-id-cell"

export default async function CategoriesPage() {
  const categories = await fetchCategories()

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div className="space-y-1 w-full sm:w-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categorías</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Gestiona las categorías de tu tienda ({categories.length})
          </p>
        </div>

        <Link href="/admin/categories/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 shadow-md transition-all hover:scale-[1.02]">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Categoría
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0 rounded-lg overflow-hidden border">
          
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[100px] min-w-[100px] text-center">Acciones</TableHead>
                  <TableHead className="min-w-[150px] text-center font-semibold text-gray-900">Nombre</TableHead>
                  <TableHead className="min-w-[200px] text-center text-gray-500">Descripción</TableHead>
                  <TableHead className="w-[150px] min-w-[150px] text-center">ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <EditCategoryButton id={category.id} />
                        <DeleteButton 
                            id={category.id} 
                            cloudinary_public_id={category.cloudinary_public_id}
                            name={category.name} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 text-center">
                        {category.name}
                    </TableCell>
                    <TableCell className="text-gray-500 truncate max-w-[300px] text-center" title={category.description}>
                        {category.description || "-"}
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-center">
                            <ProductIdCell id={category.id} />
                        </div>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}