"use server"
import { z } from "zod"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { MercadoPagoConfig, Preference } from "mercadopago"
import type { CartItem } from "./definitions"

//Archivos aceptados para chequear el esquema con zod.
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg ", "image/jpeg"]

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const FormSchema = z.object({
  id: z.string(),
  productName: z
    .string({
      invalid_type_error: "Poner un nombre",
    })
    .min(1, { message: "Poner un nombre" }),
  price: z.coerce.number().gt(0, { message: "Ingresar una cantidad mayor a 0." }),
  originalPrice: z.coerce
    .number()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  brandName: z
    .string({
      invalid_type_error: "Seleccionar una marca.",
    })
    .min(1, { message: "Seleccionar una marca." }),
  categoryName: z
    .string({
      invalid_type_error: "Seleccionar una categoría",
    })
    .min(1, { message: "Seleccionar una categoría." }),
  description: z
    .string({
      invalid_type_error: "Poner una descripción.",
    })
    .min(1, { message: "Poner una descripción" }),
  features: z
    .array(
      z
        .string()
        .min(1, "La característica no puede estar vacía")
        .max(40, "Cada característica debe tener máximo 40 caracteres"),
    )
    .min(1, "Debes agregar al menos una característica")
    .max(3, "Máximo 3 características permitidas"),
  inStock: z.coerce.boolean(),
  image: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type)
  }, "Por favor, subir una imagen (.jpg, .jpeg, .png)"),
})


const CategoryFormSchema = z.object({
  id: z.string(),
  categoryName: z
    .string({ invalid_type_error: "Poner una categoría" })
    .min(1, { message: "Poner una categoría" }),
  // NUEVO CAMPO:
  description: z
    .string()
    .max(30, { message: "La descripción no puede superar los 30 caracteres." }),
  image: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type)
  }, "Por favor, subir una imagen (.jpg, .jpeg, .png)"),
})

const CreateProduct = FormSchema.omit({ id: true })
const UpdateProduct = FormSchema.omit({ id: true, image: true }).extend({
  image: z.instanceof(File).optional(),
})

const CreateCategory = CategoryFormSchema.omit({ id: true })
const UpdateCategory = CategoryFormSchema.omit({ id: true, image: true }).extend({
  image: z.instanceof(File).optional(),
  description: z
    .string()
    .min(1, { message: "La descripción es obligatoria." }) // Validamos que no esté vacía
    .max(30, { message: "La descripción no puede superar los 30 caracteres." }),
})
export type State = {
  errors?: {
    productName?: string[]
    price?: string[]
    originalPrice?: string[]
    brandName?: string[]
    categoryName?: string[]
    description?: string[]
    features?: string[]
    inStock?: string[]
    image?: string[]
  }
  message?: string | null
}

export type CategoryState = {
  errors?: {
    categoryName?: string[]
  }
  message?: string | null
}

export async function createProduct(prevState: State, formData: FormData) {
  // Obtener features del formData y filtrar vacíos
  const featuresRaw = formData.getAll("features[]")
  const featuresInput: string[] = featuresRaw
    .filter((f) => typeof f === "string")
    .map((f) => (f as string).trim())
    .filter((f) => f.length > 0)

  // Obtener inStock del formData
  const inStockValue = formData.get("inStock")
  const inStock = inStockValue === "true" || inStockValue === "on"

  // Obtener originalPrice
  const originalPriceValue = formData.get("originalPrice")
  const originalPrice = originalPriceValue && originalPriceValue !== "" ? originalPriceValue : undefined

  const validatedFields = CreateProduct.safeParse({
    productName: formData.get("productName"),
    price: formData.get("price"),
    originalPrice: originalPrice,
    brandName: formData.get("brandName"),
    categoryName: formData.get("categoryName"),
    description: formData.get("description"),
    features: featuresInput,
    inStock: inStock,
    image: formData.get("image") as File,
  })

  console.log("Validated Fields:", validatedFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    }
  }

  const {
    productName,
    price,
    originalPrice: validatedOriginalPrice,
    brandName,
    categoryName,
    description,
    features,
    inStock: validatedInStock,
    image,
  } = validatedFields.data

  const arrayImage = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayImage)

  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result)
      })
      .end(buffer)
  })

  const imageUrl = uploadResult.url
  const publicId = uploadResult.public_id

  try {
    await sql`
        INSERT INTO products (name, description, brand_name, category_name, price, original_price, features, image, cloudinary_public_id, instock)
        VALUES (
          ${productName},
          ${description},
          ${brandName},
          ${categoryName},
          ${price},
          ${validatedOriginalPrice ?? null},
          ${features as any},
          ${imageUrl},
          ${publicId},
          ${validatedInStock}
        )
    `
  } catch (error) {
    console.error("Database Error:", error)
    return {
      message: "Database Error: Failed to Create Product.",
    }
  }

  revalidatePath("/admin/products")
  redirect("/admin/products")
}

export async function updateProduct(
  id: string,
  oldUrl: string,
  oldPublicId: string,
  prevState: State,
  formData: FormData,
) {
  // Obtener features del formData y filtrar vacíos
  const featuresRaw = formData.getAll("features[]")
  const featuresInput: string[] = featuresRaw
    .filter((f) => typeof f === "string")
    .map((f) => (f as string).trim())
    .filter((f) => f.length > 0)

  // Obtener inStock del formData
  const inStockValue = formData.get("inStock")
  const inStock = inStockValue === "true" || inStockValue === "on"

  // Obtener originalPrice
  const originalPriceValue = formData.get("originalPrice")
  const originalPrice = originalPriceValue && originalPriceValue !== "" ? originalPriceValue : undefined

  const validatedFields = UpdateProduct.safeParse({
    productName: formData.get("productName"),
    price: formData.get("price"),
    originalPrice: originalPrice,
    brandName: formData.get("brandName"),
    categoryName: formData.get("categoryName"),
    description: formData.get("description"),
    features: featuresInput,
    inStock: inStock,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Product.",
    }
  }

  const {
    productName,
    price,
    originalPrice: validatedOriginalPrice,
    brandName,
    categoryName,
    description,
    features,
    inStock: validatedInStock,
  } = validatedFields.data

  const image = formData.get("image") as File

  let imageUrl: string | undefined = undefined
  let newPublicId: string | undefined = undefined

  // Solo subir nueva imagen si se seleccionó una
  if (image && image.size > 0) {
    // Eliminar la imagen anterior de Cloudinary
    const result = await cloudinary.uploader.destroy(oldPublicId)
    console.log("Imagen eliminada exitosamente:", result)

    // Subir la nueva imagen
    const arrayImage = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayImage)

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        })
        .end(buffer)
    })
    imageUrl = uploadResult.url
    newPublicId = uploadResult.public_id
  }

  try {
    if (!imageUrl) {
      // Actualizar sin cambiar la imagen
      await sql`
        UPDATE products
        SET 
          name = ${productName}, 
          price = ${price},
          original_price = ${validatedOriginalPrice ?? null},
          brand_name = ${brandName}, 
          category_name = ${categoryName}, 
          description = ${description},
          features = ${features as any},
          instock = ${validatedInStock}
        WHERE id = ${id}
      `
    } else {
      // Actualizar incluyendo nueva imagen
      await sql`
        UPDATE products
        SET 
          name = ${productName}, 
          price = ${price},
          original_price = ${validatedOriginalPrice ?? null},
          brand_name = ${brandName}, 
          category_name = ${categoryName}, 
          description = ${description},
          features = ${features as any},
          instock = ${validatedInStock},
          image = ${imageUrl}, 
          cloudinary_public_id = ${newPublicId}
        WHERE id = ${id}
      `
    }
  } catch (error) {
    console.error("Database Error:", error)
    return {
      message: "Database Error: Failed to Update product",
    }
  }

  revalidatePath("/admin/products")
  redirect("/admin/products")
}

export async function deleteProduct(id: string, cloudinary_public_id: string) {
  try {
    const result = await cloudinary.uploader.destroy(cloudinary_public_id)
    console.log("Imagen eliminada exitosamente:", result)
    await sql`DELETE FROM products WHERE id = ${id}`
    revalidatePath("/admin/products")
    return { message: "Deleted product." }
  } catch (error) {
    return {
      message: "Database Error: Failed to delete Invoice.",
    }
  }
}

export async function createCategory(prevState: CategoryState, formData: FormData) {
  
const validatedFields = CreateCategory.safeParse({
    categoryName: formData.get("categoryName"),
    description: formData.get("description"), // Recibimos la descripción
    image: formData.get("image") as File,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear la categoría.",
    }
  }

  const { categoryName, description, image } = validatedFields.data

  // Lógica de subida a Cloudinary (Idéntica a productos)
  const arrayImage = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayImage)

  let imageUrl = "";
  let publicId = "";

  try {
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        })
        .end(buffer)
    })
    
    imageUrl = uploadResult.url;
    publicId = uploadResult.public_id;

  } catch (error) {
     return {
      message: "Cloudinary Error: Failed to upload image.",
    }
  }

  try {
    // Insertamos la descripción
    await sql`
        INSERT INTO categories (name, description, image, cloudinary_public_id)
        VALUES (${categoryName}, ${description}, ${imageUrl}, ${publicId})
        `
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Category.",
    }
  }

  revalidatePath("/admin/categories")
  // Revalidamos la home también para que aparezca la nueva categoría ahí
  revalidatePath("/") 
  redirect("/admin/categories")
}

export async function updateCategory(
  id: string,
  oldPublicId: string, // Necesitamos esto para borrar la foto vieja si la cambian
  prevState: CategoryState,
  formData: FormData
) {
  const validatedFields = UpdateCategory.safeParse({
    categoryName: formData.get("categoryName"),
    description: formData.get("description"),
    // El input file puede venir vacío
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error en los campos.",
    }
  }

  const { categoryName, description } = validatedFields.data
  const image = formData.get("image") as File

  let imageUrl: string | undefined = undefined
  let newPublicId: string | undefined = undefined

  // Lógica de Imagen: Si hay nueva imagen, subirla y borrar la vieja
  if (image && image.size > 0) {
    if (oldPublicId) {
       await cloudinary.uploader.destroy(oldPublicId)
    }
   
    const arrayImage = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayImage)
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
          if (error) reject(error)
          resolve(result)
        }).end(buffer)
    })
    imageUrl = uploadResult.url
    newPublicId = uploadResult.public_id
  }

  try {
    if (imageUrl) {
      // Actualizamos TODO incluyendo imagen
      await sql`
        UPDATE categories
        SET name = ${categoryName}, description = ${description}, image = ${imageUrl}, cloudinary_public_id = ${newPublicId}
        WHERE id = ${id}
      `
    } else {
      // Actualizamos solo textos
      await sql`
        UPDATE categories
        SET name = ${categoryName}, description = ${description}
        WHERE id = ${id}
      `
    }
  } catch (error) {
    return { message: "Database Error: Failed to Update Category" }
  }

  revalidatePath("/admin/categories")
  revalidatePath("/")
  redirect("/admin/categories")
}

export async function deleteCategory(id: string, cloudinary_public_id: string) {
  try {
    // 1. Si existe una imagen asociada, la borramos de Cloudinary
    if (cloudinary_public_id) {
      await cloudinary.uploader.destroy(cloudinary_public_id);
      console.log("Imagen de categoría eliminada:", cloudinary_public_id);
    }

    // 2. Borramos la categoría de la base de datos
    await sql`DELETE FROM categories WHERE id = ${id}`
    
    revalidatePath("/admin/categories")
    revalidatePath("/") // Importante para actualizar la home también
    return { message: "Categoría eliminada." }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to delete Category.",
    }
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    console.log("Se ejecuta authenticate luego de presionar el boton log in")
    console.log("Email que ingresa:" + formData.get("email"))
    console.log("Password que ingresa:" + formData.get("password"))
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/admin",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "El email o contraseña son incorrectos."
      }
    }
    throw error
  }
}

export async function logOut() {
  try {
    await signOut({ redirectTo: "/" })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}

export async function payment(cartItems: CartItem[]) {
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
  const preference = new Preference(client)

  // Crear un arreglo para almacenar los items
  const items = cartItems.map((item) => ({
    id: `${item.productName}`,
    title: "mp purchase",
    productName: `${item.productName}`,
    quantity: Number(item.quantity),
    unit_price: Number(item.unitCost),
    currency_id: "ARS",
  }))

  const result = await preference.create({
    body: {
      items: items,
      back_urls: {
        success: "https://proyecto-nextjs-tienda-ropa-online.vercel.app/purchases/success",
        failure: "https://proyecto-nextjs-tienda-ropa-online.vercel.app/purchases/failure",
        pending: "https://proyecto-nextjs-tienda-ropa-online.vercel.app/purchases/pending",
      },
      auto_return: "approved",
    },
  })
  redirect(result.init_point!)
}

export async function createPurchase(items: any, payerEmail: string, totalAmount: number) {
  console.log("Entrando a crear la compra")

  try {
    //Crear la orden

    const data = await sql`
        INSERT INTO purchase (buyerEmail, totalCost)
        VALUES (${payerEmail}, ${totalAmount})
        RETURNING purchaseID
        `

    const purchaseIdv2 = data.rows[0].purchaseid
    console.log("Compra creada")
    // Por cada item (producto,cantidad) del carrito, creo un detalle.

    await Promise.all(
      items.map(async (item: any) => {
        const data = await sql`
            INSERT INTO purchaseDetail(purchase_id, productName, quantity, itemPrice)
            VALUES (${purchaseIdv2}, ${item.name}, ${item.quantity}, ${item.quantity * item.unit_price})
            `
      }),
    )
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Purchase.",
    }
  }
}


export async function deletePurchase(purchaseId: string) {
  try {
    await sql`DELETE FROM purchaseDetail WHERE purchase_id = ${purchaseId}`
    await sql`DELETE FROM purchase WHERE purchaseID = ${purchaseId}`
    revalidatePath("/admin/purchases")
    return { message: "Purchase deleted successfully" }
  } catch (error) {
    return { message: "Database Error: Failed to delete purchase." }
  }
}

