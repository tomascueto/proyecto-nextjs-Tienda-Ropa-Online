import { NextRequest, NextResponse } from 'next/server';
import { fetchFilteredProducts } from '@/app/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing query param' },
      { status: 400 }
    );
  }

  try {
    // Página 1, sin filtros extra
    const products = await fetchFilteredProducts(query, 1);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
