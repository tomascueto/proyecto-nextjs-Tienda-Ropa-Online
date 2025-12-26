import path from 'path';

export async function fillBaseProductForm(page: any, overrides?: {
  skipName?: boolean
  skipDescription?: boolean
  skipOriginalPrice?: boolean
  skipBrand?: boolean
  skipCategory?: boolean
  skipImage?: boolean
  price?: string
  originalPrice?: string
}) {
  if (!overrides?.skipName) {
    await page.fill('input[name="productName"]', 'Producto Test');
  }

  if (!overrides?.skipDescription) {
    await page.fill('textarea[name="description"]', 'Descripción');
  }

  if (!overrides?.skipOriginalPrice) {
    await page.fill(
      'input[name="originalPrice"]',
      overrides?.originalPrice ?? '1000'
    );
  }

  if (overrides?.price) {
    await page.fill('input[name="price"]', overrides.price);
  }

  await page.getByPlaceholder('Característica 1').fill('Feature obligatoria');

  if (!overrides?.skipBrand) {
    await page.locator('select[name="brandName"]').selectOption({ index: 1 });
  }

  if (!overrides?.skipCategory) {
    await page.locator('select[name="categoryName"]').selectOption({ index: 1 });
  }

  if (!overrides?.skipImage) {
    await page.setInputFiles(
      'input[type="file"]',
      path.join(process.cwd(), 'tests', 'placeholder.jpg')
    );
  }
}
