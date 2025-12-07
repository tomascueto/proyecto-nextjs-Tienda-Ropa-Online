"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { updateCategory } from "@/app/lib/actions"
import { Category } from '@/app/lib/definitions';
import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"
import { Input } from "@/app/ui/products/input"
import { Label } from "@/app/ui/products/label"
import { Upload } from "lucide-react"

export default function EditCategoryForm({ category }: { category: Category }) {
  // Bind de argumentos para la server action
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
      <div className="grid gap-6">
        
        {/* Imagen Actual (Preview) */}
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
            
            {/* Nombre */}
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

            {/* Descripción */}
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

            {/* Nueva Imagen */}
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

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/categories">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" className="bg-black text-white hover:bg-gray-800">
            Guardar Cambios
          </Button>
        </div>

      </div>
    </form>
  )
}