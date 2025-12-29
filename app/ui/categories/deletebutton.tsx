"use client"

import { useState, useTransition } from "react"
import { deleteCategory } from '@/app/lib/actions';
import { Button } from "@/app/ui/button"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"

interface DeleteCategoryProps {
  id: string
  cloudinary_public_id: string
  name?: string 
}

export default function DeleteCategoryButton({ id, cloudinary_public_id, name }: DeleteCategoryProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    setShowConfirm(false)
    startTransition(async () => {
        await deleteCategory(id, cloudinary_public_id || ""); 
    })
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className="text-red-500 hover:bg-red-50 hover:text-red-700"
        title="Eliminar categoría"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {showConfirm && !isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">¿Eliminar categoría?</h3>
                <p className="text-gray-500 mt-2">
                  Vas a eliminar la categoría {name ? <span className="font-semibold">`{name}`</span> : "seleccionada"}.
                  <br />Esto podría afectar a los productos asociados.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setShowConfirm(false)}
                >
                    Cancelar
                </Button>
                <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white" 
                    onClick={handleDelete}
                >
                    Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all animate-in fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
                <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                </div>
                <div>
                <h3 className="text-xl font-bold text-gray-900">Eliminando categoría</h3>
                <p className="text-gray-500 mt-2">Actualizando catálogo...</p>
                </div>
            </div>
        </div>
      )}
    </>
  )
}