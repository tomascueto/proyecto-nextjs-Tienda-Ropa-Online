import { test, expect } from '@playwright/test';

test.describe('Autenticación', () => {

    // Test 1: Login con usuario vacío.
    test('No debe permitir login con campos usuario vacío', async ({ page }) => {
        await page.goto('/login');
        
        
        await page.fill('input[name="email"]', '');
        await page.fill('input[name="password"]', 'pass_incorrecta');
        await page.click('button[type="submit"]');


        // VERIFICACIÓN:
        // Opción A: Si usas el atributo 'required' de HTML, el navegador bloquea el envío.
        // Verificamos que seguimos en la página de login (no redirigió).
        await expect(page).toHaveURL(/.*login/);
        const emailInput = page.locator('input[name="email"]');
        const validationMessage = await emailInput.evaluate((element) => {

            return (element as HTMLInputElement).validationMessage;
        });
        console.log('Validation Message:', validationMessage);
        expect(validationMessage).not.toBe('');
        
    });

    // Test 2: Login con usuario vacío y contraseña vacía.
    test('No debe permitir login con contraseña vacía', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[name="email"]', 'usuario@falso.com');
        await page.fill('input[name="password"]', '');
        await page.click('button[type="submit"]');
        

        // VERIFICACIÓN:
        // Opción A: Si usas el atributo 'required' de HTML, el navegador bloquea el envío.
        // Verificamos que seguimos en la página de login (no redirigió).
        await expect(page).toHaveURL(/.*login/);
        const passInput = page.locator('input[name="password"]');
        const validationMessage = await passInput.evaluate((element) => {

            return (element as HTMLInputElement).validationMessage;
        });
        console.log('Validation Message:', validationMessage);
        expect(validationMessage).not.toBe('');
        
        // Opción B: Si usas Zod/React Hook Form, debería aparecer un texto de error.
        // await expect(page.locator('text=El email es obligatorio')).toBeVisible(); 
    });
    

  
    // Test 3: Login Fallido
    test('Debe mostrar error con credenciales falsas', async ({ page }) => {
        await page.goto('/login');
        
        await page.fill('input[name="email"]', 'usuario@falso.com');
        await page.fill('input[name="password"]', 'pass_incorrecta');
        await page.click('button[type="submit"]');

        // Verifica que aparezca el texto de error. 
        // Ajusta este texto al que muestra tu componente authenticate en actions.ts
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });



    // Test 4: Login Exitoso
    test('Debe loguearse correctamente y redirigir al admin', async ({ page }) => {
        // 1. Ir a la página de login (ajusta la URL si tu login está en otro lado)
        await page.goto('/login'); 
        
        // 2. Llenar el formulario (ajusta los selectores si tus inputs tienen otros names)
        await page.fill('input[name="email"]', process.env.TEST_ADMIN_EMAIL || ''); 
        await page.fill('input[name="password"]', process.env.TEST_ADMIN_PASSWORD || ''); 
        
        // 3. Click en el botón de ingresar
        await page.click('button[type="submit"]');

        // 4. Esperar y verificar que fuimos al dashboard
        // Esto espera que la URL contenga "/admin"
        await expect(page).toHaveURL(/.*admin/); 
    });


});