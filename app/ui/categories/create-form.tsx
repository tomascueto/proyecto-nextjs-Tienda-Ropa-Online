"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import Link from "next/link"
import { createCategory } from "@/app/lib/actions"
import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"
import { Input } from "@/app/ui/products/input"
import { Label } from "@/app/ui/products/label"
import { Upload } from "lucide-react"

// Aunque recibimos categories, no lo usamos en el form de creación (a menos que quieras categorías padre/hijo)
// Lo mantengo para no romper la interfaz si ya lo estás pasando desde la page.
import { Category } from '@/app/lib/definitions';

export default function CreateCategoryForm({ categories }: { categories: Category[] }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCategory, initialState);
  
  // Estado para mostrar el nombre del archivo seleccionado (igual que en productos)
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <form action={dispatch}>
      <div className="grid gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Categoría</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Nombre de la Categoría */}
            <div className="space-y-2">
              <Label htmlFor="categoryName">
                Nombre de la Categoría <span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryName"
                name="categoryName"
                type="text"
                placeholder="Ej: Running"
                maxLength={20}
                aria-describedby="categoryname-error"
              />
              <div id="categoryname-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryName &&
                  state.errors.categoryName.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
                        {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción Breve <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Ej: Conquista el campo"
                  maxLength={30}
                  onChange={(e) => {
                    // Pequeño truco para forzar re-render si quieres mostrar el contador en tiempo real, 
                    // o simplemente deja que el navegador maneje el maxLength
                  }}
                  aria-describedby="description-error"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Máx 30 car.
                </span>
              </div>
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                  state.errors.description.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>      
            {/* Carga de Imagen */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Imagen de Portada <span className="text-red-500">*</span>
              </Label>
              {/* Estilo idéntico al form de productos: Borde dashed, hover effect, centrado */}
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
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  {fileName ? (
                    <p className="text-sm font-medium text-gray-700">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-700">Haz clic para subir una imagen</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG o PNG (máx. 5MB)</p>
                    </>
                  )}
                </label>
              </div>
              <div id="image-error" aria-live="polite" aria-atomic="true">
                {state.errors?.image &&
                  state.errors.image.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/categories">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
            Crear Categoría
          </Button>
        </div>

      </div>
    </form>
  )
}