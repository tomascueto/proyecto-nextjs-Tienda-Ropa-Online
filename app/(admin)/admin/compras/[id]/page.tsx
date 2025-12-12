import { fetchPurchaseDetails } from "@/app/lib/data"; // Asegúrate que la ruta sea correcta
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"; // Ajusta imports según tengas
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/products/table";
import { ArrowLeft } from "lucide-react";

export default async function PurchaseDetailsPage({ params }: { params: { id: string } }) {
  // 1. Obtenemos el ID de la URL
  const purchaseId = params.id;

  // 2. Buscamos los datos en la DB
  const details = await fetchPurchaseDetails(purchaseId);

  // Helper para precio (igual que en tu otra página)
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price);

  // Calculamos el total de esta vista sumando los items (opcional, visual)
  const totalAmount = details.reduce((acc, item) => acc + (Number(item.itemprice) * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Encabezado con botón de volver */}
      <div className="flex items-center gap-4">
        <Link href="/admin/compras"> {/* Ajusta esta ruta a donde está tu lista */}
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Detalle del Pedido #{purchaseId}</h1>
          <p className="text-gray-600">Items incluidos en esta compra</p>
        </div>
      </div>

      {details.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">No se encontraron detalles para esta compra.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
             <div className="mb-4 flex justify-end">
                <span className="text-lg font-semibold text-gray-700">
                    Total Calculado: {formatPrice(totalAmount)}
                </span>
             </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-center">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unitario</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.map((item) => (
                    <TableRow key={item.detaliid}> 
                      {/* Nota: Revisa si tu DB devuelve 'productName' o 'productname' (postgres suele devolver minusculas) */}
                      <TableCell className="font-medium">{item.productname || item.productname}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatPrice(Number(item.itemprice || item.itemprice))}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(Number(item.itemprice || item.itemprice) * item.quantity)}
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
  );
}