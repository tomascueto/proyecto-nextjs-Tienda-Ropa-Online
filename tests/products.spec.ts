import { test, expect } from '@playwright/test';
import path from 'path';
import { waitForProductToExist } from '@/tests/helpers/waitForProduct';
import { fillBaseProductForm } from '@/tests/helpers/fillBaseProductForm';
import { fillEditProductForm } from '@/tests/helpers/fillEditProductForm'
import { clearEditProductField } from '@/tests/helpers/clearEditProductField'

test.describe('Creación de un producto', () => {

  // Login antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || '');
    await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || '');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*admin/);
  });

  test('Debe CREAR un producto exitosamente y existir en la base de datos', async ({ page, request }) => {

    await page.goto('/admin/products/create');
    const uniqueName = `Zapa Test ${Date.now()}`;
    await page.fill('input[name="productName"]', uniqueName);
    await page.fill('textarea[name="description"]', 'Descripción completa');
    await page.fill('input[name="originalPrice"]', '20000');
    await page.getByPlaceholder('Característica 1').fill('Suela antideslizante');
    await page.locator('select[name="brandName"]').selectOption({ index: 1 });
    await page.locator('select[name="categoryName"]').selectOption({ index: 1 });
    await page.setInputFiles(
      'input[type="file"]',
      path.join(__dirname, 'placeholder.jpg')
    );

    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'POST'
      ),
      page.click('button[type="submit"]'),
    ]);


    expect(response.status()).toBe(303);
    await page.waitForURL(/\/admin\/products/)
    // Verificación vía API
    const exists = await waitForProductToExist(request, uniqueName)
    expect(
      exists,
      `El producto "${uniqueName}" no apareció en la base de datos`
    ).toBe(true)
  });

  // Validaciones por campos.

  test('Falla si falta el NOMBRE (Product Name)', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipName: true });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#productname-error'))
    .toContainText('Poner un nombre');
  });

  test('Falla si falta la DESCRIPCIÓN', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipDescription: true });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
     await expect(page.locator('#description-error'))
    .toContainText('Poner una descripción');
  });

  test('Falla si falta el PRECIO ORIGINAL', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipOriginalPrice: true });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#originalprice-error'))
    .toContainText('El precio original es obligatorio');
  });

  test('Falla si falta la MARCA', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipBrand: true });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#brand-error')).toBeVisible();  
  });

  test('Falla si falta la CATEGORÍA', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipCategory: true });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#category-error'))
      .toContainText('Seleccionar una categoría');  
  });

  test('Falla si falta la IMAGEN', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, { skipImage: true });
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#image-error'))
      .toContainText('Por favor, subir una imagen')  
  });

  test('Falla si el precio oferta es mayor al original', async ({ page }) => {
    await page.goto('/admin/products/create');
    await fillBaseProductForm(page, {
      originalPrice: '1000',
      price: '2000',
    });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*create/);
    await expect(page.locator('#price-error'))
    .toContainText('El precio de oferta debe ser menor al precio base');  });
});

test.describe('Eliminación de un producto', () => {


    // Login antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || '');
    await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || '');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*admin/);
  });

  test('Debe permitir BORRAR un producto', async ({ page, request }) => {
    await page.goto('/admin/products');

    const firstRow = page.locator('table tbody tr').first();

    const productName = await firstRow
      .locator('td')
      .nth(1) // columna "Nombre"
      .innerText();

    await Promise.all([
      page.waitForLoadState('networkidle'),
      firstRow.getByRole('button', { name: /Eliminar producto/i }).click(),
    ]);
    
    await expect(page.getByText('¿Eliminar producto?')).toBeVisible();
    await expect(page.locator('.fixed').getByText(productName)).toBeVisible();
    await page.getByRole('button', { name: 'Sí, eliminar', exact: true }).click();
    await expect(page.getByText('Eliminando producto')).not.toBeVisible();

    await expect(async () => {

        await page.reload();
        await expect(page.locator('table')).toBeVisible();
        const tableContent = await page.locator('table').innerText();
        expect(tableContent).not.toContain(productName);

    }).toPass({
        timeout: 10000,
        intervals: [1000, 2000, 2000],
    });
    const exists = await waitForProductToExist(request, productName);
    expect(exists).toBe(false);
  });
});

test.describe('Editar producto', () => {
    // Login antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || '');
    await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || '');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*admin/);
  });

  test('Debe editar un producto exitosamente y redirigir al listado', async ({ page }) => {
    await page.goto('/admin/products');
    const firstRow = page.locator('table tbody tr').first();

    await firstRow
      .locator('button')
      .first() // EditProductButton
      .click();
    await page.waitForURL(/\/admin\/products\/.*\/edit$/);
    const editedName = `Producto Editado ${Date.now()}`;

    await page.fill('input[name="productName"]', editedName);
    await page.fill('textarea[name="description"]', 'Descripción editada desde Playwright');
    await page.fill('input[name="originalPrice"]', '25000');
    await page.setInputFiles(
      'input[name="image"]',
      path.join(__dirname, 'placeholder2.jpg')
    );

    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'POST' &&
        res.url().includes('/edit')
      ),
      page.click('button[type="submit"]'), //reemplaza al click suelto
    ]);
    expect(response.status()).toBe(303);
    await page.waitForURL('/admin/products');
  });

  test.describe('Validaciones al editar producto', () => {
    const cases = [
      { field: 'productName', error: '#productname-error' },
      { field: 'description', error: '#description-error' },
      { field: 'features', error: '#features-error' },
      { field: 'originalPrice', error: '#originalprice-error' },
      { field: 'price', error: '#price-error' },
    ] as const

    for (const { field, error } of cases) {
      test(`Debe mostrar error si falta ${field}`, async ({ page }) => {
        await page.goto('/admin/products')
        const firstRow = page.locator('table tbody tr').first();

        await firstRow
          .locator('button')
          .first() // 👉 EditProductButton
          .click();

        await clearEditProductField(page, field)

        await page.getByRole('button', { name: 'Actualizar Producto' }).click()

        await expect(page.locator(error)).toBeVisible()
        await expect(page).toHaveURL(/\/admin\/products\/.+\/edit/)
      })
    }
  })
})