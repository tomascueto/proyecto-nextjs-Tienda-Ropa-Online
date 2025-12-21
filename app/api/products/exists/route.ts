import { NextResponse } from 'next/server'
import { fetchFilteredProducts } from '@/app/lib/data'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json(
      { exists: false, error: 'Missing product name' },
      { status: 400 }
    )
  }

  try {
    // Buscamos por nombre usando la lógica real del proyecto
    const products = await fetchFilteredProducts(name, 1)
    console.log('Fetched products for existence check:', products)

    const product = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    )
    return NextResponse.json({
      exists: Boolean(product),
      id: product?.id ?? null,
      cloudinary_public_id: product.cloudinary_public_id
    })
  } catch (error) {
    console.error('Error checking product existence:', error)
    return NextResponse.json(
      { exists: false },
      { status: 200 }
    )
  }
}
