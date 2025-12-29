"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { updateCategory } from "@/app/lib/actions"
import { Category } from '@/app/lib/definitions';
import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"
import { Input } from "@/app/ui/products/input"
import { Label } from "@/app/ui/products/label"
import { Upload, Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      className="bg-black hover:bg-gray-800 text-white min-w-[150px]"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        "Guardar Cambios"
      )}
    </Button>
  )
}

function LoadingOverlay() {
  const { pending } = useFormStatus()

  if (!pending) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all animate-in fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Actualizando categoría</h3>
          <p className="text-gray-500 mt-2">Guardando cambios... por favor espere.</p>
        </div>
      </div>
    </div>
  )
}

export default function EditCategoryForm({ category }: { category: Category }) {
  const updateCategoryWithId = updateCategory.bind(null, category.id, category.cloudinary_public_id)
  const initialState = { message: "", errors: {} }
  const [state, dispatch] = useFormState(updateCategoryWithId, initialState)
  
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <form action={dispatch}>
      <LoadingOverlay />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagen Actual</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="relative w-full aspect-[3/4] max-w-[200px] mx-auto rounded-lg overflow-hidden bg-gray-100 border">
              <Image 
                src={category.image || "/placeholder.svg"} 
                alt={category.name} 
                fill 
                className="object-cover" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editar Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nombre</Label>
              <Input
                id="categoryName"
                name="categoryName"
                defaultValue={category.name}
                type="text"
                maxLength={20}
                aria-describedby="categoryname-error"
              />
              <div id="categoryname-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryName &&
                  state.errors.categoryName.map((error: string) => (
                    <p className="text-sm text-red-500 mt-1" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción Breve</Label>
              <div className="relative">
                <Input
                  id="description"
                  name="description"
                  defaultValue={category.description}
                  type="text"
                  maxLength={30}
                  aria-describedby="description-error"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Máx 30
                </span>
              </div>
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                  state.errors.description.map((error: string) => (
                    <p className="text-sm text-red-500 mt-1" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Cambiar Imagen (Opcional)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-400 transition-colors bg-white">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-describedby="image-error"
                />
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  {fileName ? (
                    <p className="text-sm font-medium text-gray-700">{fileName}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Haz clic para reemplazar la imagen</p>
                  )}
                </label>
              </div>
              <div id="image-error" aria-live="polite" aria-atomic="true">
                {state.errors?.image &&
                  state.errors.image.map((error: string) => (
                    <p className="text-sm text-red-500 mt-1" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

          </CardContent>
        </Card>
        <div className="flex justify-end gap-4">
          <Link href="/admin/categories">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          <SubmitButton />
        </div>

      </div>
    </form>
  )
}