// tests/helpers/fillEditProductForm.ts
import { Page } from '@playwright/test'

export async function fillEditProductForm(page: Page) {
  await page.getByLabel('Nombre del Producto').fill('Producto Editado Test')
  await page.getByLabel('Descripción').fill('Descripción editada desde Playwright')

  await page.locator('input[name="feature-0"]').fill('Feature editada 1')
  await page.locator('input[name="feature-1"]').fill('Feature editada 2')
  await page.locator('input[name="feature-2"]').fill('Feature editada 3')

  await page.getByLabel('Precio Original (Base)').fill('20000')
  await page.getByLabel('Precio Oferta (Opcional)').fill('15000')

  // Reemplazo de imagen
  await page.setInputFiles('input[name="image"]', 'tests/placeholder2.jpg')
}
