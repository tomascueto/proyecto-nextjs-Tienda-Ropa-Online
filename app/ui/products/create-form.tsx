"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom" // <--- Importamos useFormStatus
import Link from "next/link"
import { createProduct } from "@/app/lib/actions"
import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"
import { Input } from "@/app/ui/products/input"
import { Label } from "@/app/ui/products/label"
import { Textarea } from "@/app/ui/products/textarea"
import { Switch } from "@/app/ui/products/switch"
import { Upload, Loader2 } from "lucide-react"
import type { Brand, Category } from "@/app/lib/definitions"

// 1. Componente del Botón de Envío (Maneja el estado disabled)
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      className="bg-black hover:bg-gray-800 text-white min-w-[140px]"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        "Crear Producto"
      )}
    </Button>
  )
}

// 2. Componente de "Pantalla de Espera" (Overlay)
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
          <h3 className="text-xl font-bold text-gray-900">Creando producto</h3>
          <p className="text-gray-500 mt-2">Subiendo imagen y guardando datos... por favor no cierres la página.</p>
        </div>
      </div>
    </div>
  )
}

export default function CreateProductForm({
  brands,
  categories,
}: {
  brands: Brand[]
  categories: Category[]
}) {
  const initialState = { message: "", errors: {} }
  const [state, dispatch] = useFormState(createProduct, initialState)
  
  const [fileName, setFileName] = useState<string>("")
  const [inStock, setInStock] = useState(true)
  
  // Estado para las características (siempre 3 campos)
  const [features, setFeatures] = useState<string[]>(["", "", ""])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (value.length <= 40) {
      const newFeatures = [...features]
      newFeatures[index] = value
      setFeatures(newFeatures)
    }
  }

  return (
    <form action={dispatch}>
      {/* AQUÍ ESTÁ LA MAGIA: El overlay vive dentro del form */}
      <LoadingOverlay />

      <div className="grid gap-6">
        
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="productName">Nombre del Producto <span className="text-red-500">*</span></Label>
              <Input
                id="productName"
                name="productName"
                type="text"
                placeholder="Ej: Air Max 90"
                aria-describedby="productname-error"
              />
              <div id="productname-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productName && state.errors.productName.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el producto..."
                rows={4}
                aria-describedby="description-error"
              />
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description && state.errors.description.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label>Características <span className="text-red-500">*</span></Label>
              <p className="text-xs text-gray-500 mb-2">Agrega hasta 3 características (máx. 40 caracteres cada una)</p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          name={`feature-${index}`}
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Característica ${index + 1}`}
                          maxLength={40}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {feature.length}/40
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Hidden inputs */}
              {features.map((feature, index) => (
                <input key={`hidden-${index}`} type="hidden" name="features[]" value={feature} />
              ))}
              <div id="features-error" aria-live="polite" aria-atomic="true">
                {state.errors?.features && state.errors.features.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categorización */}
        <Card>
          <CardHeader>
            <CardTitle>Categorización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Categoría (Select nativo simple por si Shadcn da problemas, o adaptá tu componente Select) */}
              <div className="space-y-2">
                <Label htmlFor="categoryName">Categoría <span className="text-red-500">*</span></Label>
                <select 
                  name="categoryName" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue= ""
                >
                  <option value="" disabled >Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <div id="category-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.categoryName && state.errors.categoryName.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>{error}</p>
                  ))}
                </div>
              </div>

              {/* Marca */}
              <div className="space-y-2">
                <Label htmlFor="brandName">Marca <span className="text-red-500">*</span></Label>
                <select 
                  name="brandName" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue= ""

                >
                  <option value="" disabled >Selecciona una marca</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
                <div id="brand-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.brandName && state.errors.brandName.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>{error}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Precios y Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Precios y Disponibilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Precio Original (Obligatorio) */}
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Precio Original (Base) <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input id="originalPrice" name="originalPrice" type="number" min="0" placeholder="0.00" className="pl-7" />
                </div>
                <div id="originalprice-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.originalPrice && state.errors.originalPrice.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>{error}</p>
                  ))}
                </div>
              </div>

              {/* Precio Oferta (Opcional) */}
              <div className="space-y-2">
                <Label htmlFor="price">Precio Oferta (Opcional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input id="price" name="price" type="number" min="0" placeholder="Dejar vacío si no hay oferta" className="pl-7" />
                </div>
                <div id="price-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.price && state.errors.price.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>{error}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="inStock">Disponibilidad</Label>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Switch
                  id="inStock-switch"
                  checked={inStock}
                  onCheckedChange={setInStock}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
                <input type="hidden" name="inStock" value={inStock ? "true" : "false"} />
                <div className="flex-1">
                  <p className={`font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
                    {inStock ? "En Stock" : "Sin Stock"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {inStock ? "El producto está disponible para la venta" : "El producto no está disponible"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Imagen */}
        <Card>
          <CardHeader>
            <CardTitle>Imagen del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen de Portada <span className="text-red-500">*</span></Label>
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
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
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
                {state.errors?.image && state.errors.image.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          
          {/* USAMOS EL NUEVO BOTÓN */}
          <SubmitButton />
        </div>

      </div>
    </form>
  )
}