import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
import { defineConfig, devices } from '@playwright/test';



export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Fallar rápido en CI si fuera necesario */
  forbidOnly: !!process.env.CI,
  retries: 0, // En local no reintentamos si falla
  workers: 1, // Para CRUD es mejor ir de a uno para no romper la base de datos
  reporter: 'html',
  use: {
    /* URL base de tu app local */
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    /* Guardar video si falla para ver qué pasó */
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});