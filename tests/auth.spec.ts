import { test, expect } from '@playwright/test';

test.describe('Autenticación', () => {

    test('No debe permitir login con campos usuario vacío', async ({ page }) => {
        await page.goto('/login');
        
        
        await page.fill('input[name="email"]', '');
        await page.fill('input[name="password"]', 'pass_incorrecta');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*login/);
        const emailInput = page.locator('input[name="email"]');
        const validationMessage = await emailInput.evaluate((element) => {

            return (element as HTMLInputElement).validationMessage;
        });
        console.log('Validation Message:', validationMessage);
        expect(validationMessage).not.toBe('');
        
    });

    test('No debe permitir login con contraseña vacía', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[name="email"]', 'usuario@falso.com');
        await page.fill('input[name="password"]', '');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*login/);
        const passInput = page.locator('input[name="password"]');
        const validationMessage = await passInput.evaluate((element) => {

            return (element as HTMLInputElement).validationMessage;
        });
        console.log('Validation Message:', validationMessage);
        expect(validationMessage).not.toBe('');

    });
    
    test('Debe mostrar error con credenciales falsas', async ({ page }) => {
        await page.goto('/login');
        
        await page.fill('input[name="email"]', 'usuario@falso.com');
        await page.fill('input[name="password"]', 'pass_incorrecta');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });


    test('Debe loguearse correctamente y redirigir al admin', async ({ page }) => {
        await page.goto('/login'); 
        await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || ''); 
        await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || ''); 
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*admin/); 
    });


});