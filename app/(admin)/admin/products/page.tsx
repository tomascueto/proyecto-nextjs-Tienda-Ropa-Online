import { fetchProducts } from "@/app/lib/data"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/admin/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/admin/table"
import { Badge } from "@/app/ui/admin/badge"
import EditProductButton from "@/app/ui/products/editproduct"
import DeleteButton from "@/app/ui/products/deletebutton"
import ProductsPagination from "@/app/ui/admin/products-pagination"
import ProductIdCell from "@/app/ui/products/product-id-cell"

// IMPORTANTE: Esto arregla el error de build en Admin
export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 8

export default async function ProductosPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  const products = await fetchProducts()

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div className="space-y-1 w-full sm:w-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Gestiona tu catálogo ({products.length} productos)
          </p>
        </div>
        <Link href="/admin/products/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 shadow-md transition-all hover:scale-[1.02]">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0 rounded-lg overflow-hidden border">
          <div className="overflow-x-auto"> 
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[100px] text-left">Acciones</TableHead>
                  <TableHead className="text-left font-semibold text-gray-900">Nombre</TableHead>
                  <TableHead className="w-[100px] text-left">ID</TableHead>
                  <TableHead className="text-left">Marca</TableHead>
                  <TableHead className="text-left">Categoría</TableHead>
                  <TableHead className="text-left">Precio</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => {
                  const currentPrice = product.price ?? product.original_price ?? 0;
                  const originalPrice = product.original_price ?? 0;
                  const hasDiscount = (product.price !== null && product.price !== undefined) && (product.price < originalPrice);

                  return (
                    <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex justify-start gap-2">
                          <EditProductButton id={product.id} />
                          <DeleteButton id={product.id} cloudinary_public_id={product.cloudinary_public_id} name={product.name}/>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium whitespace-nowrap">{product.name}</TableCell>

                      <TableCell>
                          <ProductIdCell id={product.id} />
                      </TableCell>
                      
                      <TableCell>{product.brand_name}</TableCell>
                      <TableCell>{product.category_name}</TableCell>
                      
                      <TableCell>
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">${currentPrice.toFixed(2)}</span>
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex justify-center">
                            {hasDiscount ? (
                                <Badge variant="destructive" className="text-[10px]">OFERTA</Badge>
                            ) : (
                                <span className="text-xs text-gray-400">-</span>
                            )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                            {product.instock ? (
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">En stock</Badge>
                            ) : (
                            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Agotado</Badge>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div> 

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-4 bg-gray-50/30">
              <div className="text-sm text-gray-600 text-center sm:text-left">
                Mostrando {startIndex + 1} - {Math.min(endIndex, products.length)} de {products.length} productos
              </div>
              <ProductsPagination totalPages={totalPages} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}