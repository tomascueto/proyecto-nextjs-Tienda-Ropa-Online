import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { 
  Serwist, 
  NetworkFirst,  
  CacheFirst, 
  NetworkOnly,
  ExpirationPlugin 
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    // 1. Imágenes de Cloudinary: CacheFirst
    {
      matcher: /^https:\/\/res\.cloudinary\.com\/.*/i,
      handler: new NetworkFirst({
        cacheName: "cloudinary-images",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24, // 30 días
          }),
        ],
      }),
    },

    // 2. EXCLUIR LOGIN y ADMIN de la caché (NetworkOnly)
    // Es crítico que el login siempre vaya a la red.
    {
      matcher: ({ url }) => {
        const match = url.pathname.startsWith('/login') || url.pathname.startsWith('/admin') || url.pathname.startsWith('/api');
        if (match) console.log(`[SW] EXCLUDE (NetworkOnly): ${url.pathname}`);
        return match;
      },
      handler: new NetworkOnly(),
    },

    // 3. Navegación de Documentos HTML (Full Page Reloads)
    // Captura /, /products, /checkout, /purchases cuando el usuario recarga o escribe la URL.
    // Excluye explícitamente login y admin (aunque la regla 2 ya debería haberlos atrapado).
    {
      matcher: ({ request, url }) => {
        const isDoc = request.destination === "document";
        const isExcluded = url.pathname.startsWith('/login') || 
                           url.pathname.startsWith('/admin') || 
                           url.pathname.startsWith('/api');
        
        const match = isDoc && !isExcluded;
        if (match) console.log(`[SW] MATCH HTML (Navigation): ${url.pathname}`);
        return match;
      },
      handler: new NetworkFirst({
        cacheName: "app-pages-html",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24, // 1 día
          }),
        ],
        networkTimeoutSeconds: 3,
      }),
    },

    // 5. Datos de Next.js (RSC Payloads - Navegación SPA)
    // Captura las peticiones internas de navegación cliente para Home, Products, Checkout, Purchases.
    {
      matcher: ({ url }) => {
        const path = url.pathname;
        // Incluir: Home (/), Products, Checkout, Purchases
        const isAppRoute = path === '/' || 
                           path.startsWith('/products') || 
                           path.startsWith('/checkout') || 
                           path.startsWith('/purchases');
        
        const match = isAppRoute && !path.startsWith('/login') && !path.startsWith('/api');
        if (match) console.log(`[SW] MATCH RSC (Data): ${url.pathname} params:${url.search}`);
        return match;
      },
      handler: new NetworkFirst({
        cacheName: "app-rsc-data",
        plugins: [
          // Plugin para limpiar el parámetro _rsc de la URL antes de cachear
          // Esto permite que la caché RSC coincida con la URL limpia si es necesario
          {
            cacheKeyWillBeUsed: async ({ request }) => {
              const url = new URL(request.url);
              if (url.searchParams.has('_rsc')) {
                url.searchParams.delete('_rsc');
              }
              return url.href;
            }
          },
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24, 
          }),
        ],
        matchOptions: {
          ignoreVary: true, // Ignorar header Vary: RSC para maximizar coincidencias
          ignoreSearch: false, 
        },
        networkTimeoutSeconds: 3, 
      }),
    },

    // 6. Estrategia por defecto de Next.js (JS, CSS, Fonts, etc.)
    // Usamos el filtro para quitar reglas que puedan interferir, aunque nuestras reglas
    // anteriores son bastante específicas.
    ...defaultCache.filter(entry => true),
  ],
});

serwist.addEventListeners();
