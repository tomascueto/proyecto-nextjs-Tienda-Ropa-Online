import { fetchPurchases } from "@/app/lib/data"
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { Card, CardContent } from "@/app/ui/products/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/products/table"
import { Trash2, Eye } from "lucide-react"

import DeletePurchaseButton from "@/app/ui/admin/delete-purchase-button"

export default async function PurchasesPage() {
  const purchases = await fetchPurchases()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price)

const formatDate = (date: string | Date) => {
  // Aseguramos que sea un objeto Date válido
  const d = new Date(date); 
  return d.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",    // Agregué la hora por si te sirve
    minute: "2-digit"   // Agregué los minutos
  });
}
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compras</h1>
        <p className="text-gray-600">Gestiona todas las compras realizadas</p>
      </div>

      {purchases.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600 mb-4">No hay compras registradas</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.purchaseid}>
                      <TableCell className="font-semibold">#{purchase.purchaseid}</TableCell>
                      <TableCell>{purchase.buyeremail}</TableCell>
                      <TableCell className="font-semibold">{formatPrice(purchase.totalcost)}</TableCell>
                      <TableCell>{formatDate(purchase.timestamp)}</TableCell>
                      <TableCell className="space-x-2">
                        <Link href={`/success?purchase_id=${purchase.purchaseid}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <DeletePurchaseButton id={purchase.purchaseid} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
