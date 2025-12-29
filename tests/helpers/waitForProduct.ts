import type { APIRequestContext } from '@playwright/test'

export async function waitForProductToExist(
  request: APIRequestContext,
  productName: string,
  timeoutMs = 5000
) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const res = await request.get(
      `/api/products/exists?name=${encodeURIComponent(productName)}`
    )

    if (res.ok()) {
      const data = await res.json()
      if (data.exists) {
        return true
      }
    }

    await new Promise((r) => setTimeout(r, 300))
  }

  return false
}
