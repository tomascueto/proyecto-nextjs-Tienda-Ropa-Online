import { test, expect } from '@playwright/test';
import path from 'path';

const CATEGORY_IMAGE = path.join(__dirname, 'placeholderCategoria1.jpg');

test.describe('CRUD Categorías', () => {

  //Log in antes de cada test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || '');
    await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || '');

    await page.click('button[type="submit"]');
    await page.waitForURL(/admin/);
  });

  test('Debe crear una categoría correctamente', async ({ page }) => {
    await page.goto('/admin/categories/create');

    await page.fill('input[name="categoryName"]', 'Categoría Test');
    await page.fill('input[name="description"]', 'Descripción Test');
    await page.setInputFiles('input[name="image"]', CATEGORY_IMAGE);

    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'POST' &&
        res.url().includes('/categories')
      ),
      page.getByRole('button', { name: 'Crear Categoría' }).click(),
    ]);

    expect(response.status()).toBe(303);
    await page.waitForURL('/admin/categories');
  });

  test('Debe mostrar errores si faltan campos obligatorios al crear', async ({ page }) => {
    await page.goto('/admin/categories/create');
    await page.getByRole('button', { name: 'Crear Categoría' }).click();
    await expect(page.locator('#categoryname-error')).toBeVisible();
    await expect(page.locator('#description-error')).toBeVisible();
    await expect(page.locator('#image-error')).toBeVisible();
  });

  test('Debe editar una categoría correctamente', async ({ page }) => {
    await page.goto('/admin/categories');
    await page
      .getByRole('button', { name: /Editar categoría/i })
      .first()
      .click();

    await page.waitForURL(/\/admin\/categories\/.*\/edit$/);
    await page.fill('input[name="categoryName"]', 'Categoría Editada');
    await page.fill('input[name="description"]', 'Descripción Editada');
    await page.setInputFiles('input[name="image"]', CATEGORY_IMAGE);
    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'POST' &&
        res.url().includes('/edit')
      ),
      page.getByRole('button', { name: 'Guardar Cambios' }).click(),
    ]);

    expect(response.status()).toBe(303);
    await page.waitForURL('/admin/categories');
  });

  test('Debe mostrar errores si se vacían campos obligatorios al editar', async ({ page }) => {
    await page.goto('/admin/categories');
    await page
      .getByRole('button', { name: /Editar categoría/i })
      .first()
      .click();

    await page.waitForURL(/\/admin\/categories\/.*\/edit$/);
    await page.fill('input[name="categoryName"]', '');
    await page.fill('input[name="description"]', '');
    await page.getByRole('button', { name: 'Guardar Cambios' }).click();
    await expect(page.locator('#categoryname-error')).toBeVisible();
    await expect(page.locator('#description-error')).toBeVisible();
  });


  test('Debe eliminar una categoría correctamente', async ({ page }) => {
    await page.goto('/admin/categories');
    page.once('dialog', dialog => dialog.accept());
    await page
      .getByRole('button', { name: /Eliminar categoría/i })
      .first()
      .click();

    await expect(page.getByText('¿Eliminar categoría?')).toBeVisible();
    await page.getByRole('button', { name: 'Eliminar', exact: true }).click();
    const response = await page.waitForResponse(res =>
      res.request().method() === 'POST' &&
      res.url().includes('/categories')
    );
    expect(response.status()).toBe(200);
    await page.waitForURL('/admin/categories');
  });

});
