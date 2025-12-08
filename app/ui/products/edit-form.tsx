"use client"

import type React from "react"
import { useState } from "react"
import { useFormState } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { updateProduct } from "@/app/lib/actions"
import type { Brand, Category, Product } from "@/app/lib/definitions"
import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/products/card"
import { Input } from "@/app/ui/products/input"
import { Label } from "@/app/ui/products/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/ui/products/select"
import { Textarea } from "@/app/ui/products/textarea"
import { Switch } from "@/app/ui/products/switch"
import { Upload } from "lucide-react"

export default function EditProductForm({
  brands,
  categories,
  product,
}: {
  brands: Brand[]
  categories: Category[]
  product: Product
}) {
  const updateProductWithId = updateProduct.bind(null, product.id, product.image, product.cloudinary_public_id)
  const initialState = { message: "", errors: {} }
  const [state, dispatch] = useFormState(updateProductWithId, initialState)

0.
  const defaultBasePrice = product.original_price ?? product.price ?? 0;
  const isOffer = product.price !== null && product.price < defaultBasePrice;
  const defaultOfferPrice = isOffer ? product.price : "";

  const [inStock, setInStock] = useState(product.instock ?? true)
  const [fileName, setFileName] = useState<string>("")
  const [features, setFeatures] = useState<string[]>(() => {
    const productFeatures = product.features && product.features.length > 0 ? [...product.features] : []
    while (productFeatures.length < 3) {
      productFeatures.push("")
    }
    return productFeatures
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
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
      <div className="grid gap-6">
        {/* Imagen actual */}
        <Card>
          <CardHeader>
            <CardTitle>Imagen Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square max-w-xs mx-auto rounded-lg overflow-hidden bg-gray-100 border">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          </CardContent>
        </Card>

        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">
                Nombre del Producto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="productName"
                name="productName"
                type="text"
                defaultValue={product.name}
                placeholder="Ej: Air Max 90"
                aria-describedby="productname-error"
              />
              <div id="productname-error" aria-live="polite" aria-atomic="true">
                {state.errors?.productName &&
                  state.errors.productName.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product.description}
                placeholder="Describe el producto..."
                rows={4}
                aria-describedby="description-error"
              />
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                  state.errors.description.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Características <span className="text-red-500">*</span>
              </Label>
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
                          aria-describedby={`feature-${index}-error`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {feature.length}/40
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {features.map((feature, index) => (
                <input key={`hidden-${index}`} type="hidden" name="features[]" value={feature} />
              ))}
              <div id="features-error" aria-live="polite" aria-atomic="true">
                {state.errors?.features &&
                  state.errors.features.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">
                  Marca <span className="text-red-500">*</span>
                </Label>
                <Select name="brandName" defaultValue={product.brand_name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {brands.map((brand) => (
                        <SelectItem key={brand.name} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div id="brand-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.brandName &&
                    state.errors.brandName.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryName">
                  Categoría <span className="text-red-500">*</span>
                </Label>
                <Select name="categoryName" defaultValue={product.category_name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div id="category-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.categoryName &&
                    state.errors.categoryName.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precios y Disponibilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <Label htmlFor="originalPrice">
                  Precio Original (Base) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0"
                    defaultValue={defaultBasePrice}
                    className="pl-7"
                    aria-describedby="originalprice-error"
                  />
                </div>
                <div id="originalprice-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.originalPrice &&
                    state.errors.originalPrice.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio Oferta (Opcional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    defaultValue={defaultOfferPrice ?? ""}
                    placeholder="Vacío = Sin oferta"
                    className="pl-7"
                    aria-describedby="price-error"
                  />
                </div>
                <div id="price-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

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

        <Card>
          <CardHeader>
            <CardTitle>Cambiar Imagen (Opcional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Nueva Imagen</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-describedby="image-error"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  {fileName ? (
                    <p className="text-sm font-medium text-gray-700">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-700">Haz clic para subir una nueva imagen</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG o PNG (máx. 5MB)</p>
                      <p className="text-xs text-gray-500 mt-1">Si no seleccionas una imagen, se mantendrá la actual</p>
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
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Actualizar Producto
          </Button>
        </div>
      </div>
    </form>
  )
}