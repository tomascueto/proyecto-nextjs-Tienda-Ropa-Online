import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL

/* -------------------------------------------------------------------------- */
/*                          API /api/products/[brand]                          */
/* -------------------------------------------------------------------------- */

test.describe('API /api/products/[brand]', () => {

  test('Debe devolver productos para una marca válida', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/Nike`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(Array.isArray(body)).toBe(true)
    if (body.length > 0) {
      expect(body[0]).toHaveProperty('name')
      expect(body[0]).toHaveProperty('brand_name')
      expect(body[0]).toHaveProperty('price')
    }
  })

  test('Debe devolver array vacío para marca inexistente', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/MARCA_INEXISTENTE_123`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(0)
  })
})

/* -------------------------------------------------------------------------- */
/*                          API /api/products/exists                           */
/* -------------------------------------------------------------------------- */

test.describe('API /api/products/exists', () => {

  test('exists = true cuando el producto existe', async ({ request }) => {
    const PRODUCT_NAME = 'Air Jordan 4 Retro Cozy Girl'
    const response = await request.get(
      `${BASE_URL}/api/products/exists?name=${encodeURIComponent(PRODUCT_NAME)}`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('exists')
    expect(body.exists).toBe(true)
  })

  test('exists = false cuando el producto NO existe', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/exists?name=PRODUCTO_INEXISTENTE_123456`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('exists')
    expect(body.exists).toBe(false)
  })
})

/* -------------------------------------------------------------------------- */
/*                          API /api/products/search                           */
/* -------------------------------------------------------------------------- */

test.describe('API /api/products/search', () => {

  test('Debe devolver productos con query válida', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/search?query=Zapatilla`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(Array.isArray(body)).toBe(true)
  })

  test('Debe devolver array vacío si no hay coincidencias', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/search?query=XYZ_NO_EXISTE`
    )
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(0)
  })

  test('Debe devolver 400 si no se envía query', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/api/products/search`
    )
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body).toHaveProperty('error')
  })
})
