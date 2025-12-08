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

  // Paginación
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-gray-600 mt-2">Gestiona todos los productos de la tienda ({products.length} productos)</p>
        </div>
        <Link href="/admin/products/create">
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio Venta</TableHead>
                <TableHead>Precio Base / Oferta</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => {
                // Lógica de visualización de precios
                const currentPrice = product.price ?? product.original_price ?? 0;
                const originalPrice = product.original_price ?? 0;
                const hasDiscount = (product.price !== null && product.price !== undefined) && (product.price < originalPrice);

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm text-gray-600">
                        {product.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brand_name}</TableCell>
                    <TableCell>{product.category_name}</TableCell>
                    
                    {/* Precio de Venta (El que paga el cliente) */}
                    <TableCell className="font-semibold">
                        ${currentPrice.toFixed(2)}
                    </TableCell>

                    {/* Columna de Oferta / Precio Original */}
                    <TableCell>
                      {hasDiscount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">
                            ${originalPrice.toFixed(2)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Precio Base</span>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      {product.instock ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                          En stock
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                          Sin stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditProductButton id={product.id} />
                        <DeleteButton id={product.id} cloudinary_public_id={product.cloudinary_public_id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-600">
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