// tests/helpers/clearEditProductField.ts
import { Page } from '@playwright/test'

export async function clearEditProductField(
  page: Page,
  field:
    | 'productName'
    | 'description'
    | 'features'
    | 'brand'
    | 'category'
    | 'originalPrice'
    | 'price'
    | 'image'
) {
  switch (field) {
    case 'productName':
      await page.getByLabel('Nombre del Producto').fill('')
      break

    case 'description':
      await page.getByLabel('Descripción').fill('')
      break

    case 'features':
      await page.locator('input[name="feature-0"]').fill('')
      await page.locator('input[name="feature-1"]').fill('')
      await page.locator('input[name="feature-2"]').fill('')
      break

    case 'originalPrice':
      await page.getByLabel('Precio Original (Base)').fill('')
      break

    case 'price':
      await page.getByLabel('Precio Oferta (Opcional)').fill('999999')
      break

    case 'image':
      break
  }
}
