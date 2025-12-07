"use client"

import { deletePurchase } from "@/app/lib/actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/app/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/ui/admin/alert-dialog";

export default function DeletePurchaseButton({ id }: { id: string }) {
  // Preparamos la Server Action con el ID
  const deletePurchaseWithId = deletePurchase.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white border border-gray-200 shadow-xl">
        <AlertDialogTitle>Eliminar compra</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Estás seguro que deseas eliminar esta compra? Esta acción no se puede deshacer.
        </AlertDialogDescription>

        <div className="flex gap-3 justify-end mt-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          {/* Formulario conectado a la Server Action */}
          <form action={deletePurchaseWithId}>
            <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Eliminar
            </AlertDialogAction>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}