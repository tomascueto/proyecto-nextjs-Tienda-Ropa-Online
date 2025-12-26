declare const self: any;

import { Serwist, NetworkFirst, NetworkOnly, StaleWhileRevalidate, ExpirationPlugin, CacheableResponsePlugin } from "serwist";
import { defaultCache } from "@serwist/next/worker";

const OFFLINE_HTML = `<!DOCTYPE html> 
                        <html lang="es"> 
                        <head> 
                          <meta charset="UTF-8"> 
                          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                          <title>Sin conexión | TNDA</title> 
                          <style> 
                        * { 
                            margin: 0; 
                            padding: 0; 
                            box-sizing: border-box; 
                        } 
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                            background-color: #f9fafb; 
                            color: #111827; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            min-height: 100vh; 
                            padding: 1rem; 
                            text-align: center; 
                        } 
                        .card { 
                            background-color: #ffffff; 
                            padding: 2rem; 
                            border-radius: 1rem; 
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
                            max-width: 28rem; 
                            width: 100%; 
                        } 
                        .icon-container { 
                            background-color: #f3f4f6; 
                            width: 5rem; 
                            height: 5rem; 
                            border-radius: 9999px; 
                            margin: 0 auto 1.5rem auto; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                        } 
                        .icon { 
                            color: #6b7280; 
                            width: 2.5rem; 
                            height: 2.5rem; 
                        } 
                        h1 { 
                            font-size: 1.5rem; 
                            font-weight: 700; 
                            margin-bottom: 0.5rem; 
                            color: #111827; 
                        } 
                        p { 
                            color: #4b5563; 
                            margin-bottom: 2rem; 
                            line-height: 1.5; 
                        } 
                        .button-container {
                            display: flex;
                            flex-direction: column;
                            gap: 0.75rem;
                        }
                        .button { 
                            display: block; 
                            width: 100%; 
                            background-color: #000000; 
                            color: #ffffff; 
                            font-weight: 500; 
                            padding: 0.75rem; 
                            border-radius: 0.5rem; 
                            text-decoration: none; 
                            transition: background-color 0.2s; 
                            border: none; 
                            cursor: pointer; 
                            font-size: 1rem; 
                        } 
                        .button:hover { 
                            background-color: #1f2937; 
                        } 
                        .button-outline {
                            background-color: transparent;
                            border: 1px solid #d1d5db;
                            color: #374151;
                        }
                        .button-outline:hover {
                            background-color: #f3f4f6;
                        }
                        .footer-text { 
                            margin-top: 1.25rem; 
                            font-size: 0.75rem; 
                            color: #9ca3af; 
                        } 
                    </style> 
                </head> 
                <body> 
                    <div class="card"> 
                        <div class="icon-container"> 
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> 
                                <line x1="2" y1="2" x2="22" y2="22"></line> 
                                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path> 
                                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path> 
                                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path> 
                                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path> 
                                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path> 
                                <line x1="12" y1="20" x2="12.01" y2="20"></line> 
                            </svg> 
                        </div> 
                        <h1>Sin conexión</h1> 
                        <p>No tienes conexión a internet. Verificá tu red e intentá nuevamente.</p> 
                        <div class="button-container"> 
                            <button onclick="window.location.reload()" class="button">Reintentar</button> 
                            <button onclick="window.location.href='/'" class="button button-outline">Ir a incio</button> 
                        </div> 
                        <p class="footer-text">Detectaremos automáticamente cuando vuelvas a estar online.</p>
                    </div> 
                    <script> 
                        window.addEventListener('online', () => window.location.reload()); 
                    </script> 
                </body> 
                </html>`; 
 

const NOT_FOUND_HTML = `<!DOCTYPE html> 
                        <html lang="es"> 
                        <head> 
                          <meta charset="UTF-8"> 
                          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                          <title>Error de Servidor | TNDA</title> 
                          <style> 
                        * { 
                            margin: 0; 
                            padding: 0; 
                            box-sizing: border-box; 
                        } 
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                            background-color: #f9fafb; 
                            color: #111827; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            min-height: 100vh; 
                            padding: 1rem; 
                            text-align: center; 
                        } 
                        .card { 
                            background-color: #ffffff; 
                            padding: 2rem; 
                            border-radius: 1rem; 
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
                            max-width: 28rem; 
                            width: 100%; 
                        } 
                        .icon-container { 
                            background-color: #fef2f2; 
                            width: 5rem; 
                            height: 5rem; 
                            border-radius: 9999px; 
                            margin: 0 auto 1.5rem auto; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                        } 
                        .icon { 
                            color: #ef4444; 
                            width: 2.5rem; 
                            height: 2.5rem; 
                        } 
                        h1 { 
                            font-size: 1.5rem; 
                            font-weight: 700; 
                            margin-bottom: 0.5rem; 
                            color: #111827; 
                        } 
                        p { 
                            color: #4b5563; 
                            margin-bottom: 2rem; 
                            line-height: 1.5; 
                        } 
                        .button-container {
                            display: flex;
                            flex-direction: column;
                            gap: 0.75rem;
                        }
                        .button { 
                            display: block; 
                            width: 100%; 
                            background-color: #000000; 
                            color: #ffffff; 
                            font-weight: 500; 
                            padding: 0.75rem; 
                            border-radius: 0.5rem; 
                            text-decoration: none; 
                            transition: background-color 0.2s; 
                            border: none; 
                            cursor: pointer; 
                            font-size: 1rem; 
                        } 
                        .button:hover { 
                            background-color: #1f2937; 
                        } 
                        .button-outline {
                            background-color: transparent;
                            border: 1px solid #d1d5db;
                            color: #374151;
                        }
                        .button-outline:hover {
                            background-color: #f3f4f6;
                        }
                        .footer-text { 
                            margin-top: 1.25rem; 
                            font-size: 0.75rem; 
                            color: #9ca3af; 
                        } 
                        #timer { font-weight: bold; }
                    </style> 
                </head> 
                <body> 
                    <div class="card"> 
                        <div class="icon-container"> 
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div> 
                        <h1>Error de Servidor</h1> 
                        <p>No se pudo obtener respuesta del servidor. Es posible que esté temporalmente fuera de servicio.</p> 
                        <div class="button-container"> 
                            <button onclick="window.location.reload()" class="button">Reintentar ahora</button> 
                            <button onclick="window.location.href='/'" class="button button-outline">Ir al Inicio</button> 
                        </div> 
                    </div> 
                </body> 
                </html>`;
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // 1. EXCLUSIONES CRÍTICAS (Nunca cachear Admin ni Login, pero con Fallback Offline)
    {
      matcher: ({ url }) => 
        url.pathname.startsWith("/admin") || 
        url.pathname.startsWith("/login"),
      handler: new NetworkOnly({
        plugins: [
          {
            handlerDidError: async () => {
             
            // 1. Verificación inmediata de hardware/SO
              if (navigator.onLine === false) {
                return new Response(OFFLINE_HTML, {
                  headers: { "Content-Type": "text/html" },
                });
              }   
                try {
                  const extController = new AbortController();
                  const extTimeoutId = setTimeout(() => extController.abort(), 4000);

                  // Usamos una URL externa confiable para verificar acceso a internet real
                  await fetch("https://clients3.google.com/generate_204", {
                    mode: "no-cors",
                    cache: "no-store",
                    signal: extController.signal,
                  });
                  clearTimeout(extTimeoutId);

                  // Si llegamos aquí, hay internet pero nuestro servidor no responde
                  return new Response(NOT_FOUND_HTML, {
                    headers: { "Content-Type": "text/html" },
                  });
                } catch (extError) {
                  // No hay acceso a internet real
                  return new Response(OFFLINE_HTML, {
                    headers: { "Content-Type": "text/html" },
                  });
                }
            },
          },
        ],
      }),
    },
    // 2. Regla para el endpoint de ping (Siempre red, nunca caché)
    {
      matcher: ({ url }) => url.pathname === "/api/ping",
      handler: new NetworkOnly(),
    },
    // 3. Peticiones RSC (Next.js App Router Navigation)
    {
      matcher: ({ request, url }) => 
        url.searchParams.has("_rsc") || request.headers.get("RSC") === "1",
      handler: new NetworkFirst({
        cacheName: "TNDA-RSC",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
        ],
        matchOptions: {
          ignoreSearch: true,
        },
      }),
    },
    // 4. Peticiones de Documentos (HTML principal) con Fallback robusto
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new NetworkFirst({
        cacheName: "TNDA-DOCS",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 }),
          {
            handlerDidError: async () => {
              // 1. Verificación inmediata de hardware/SO
              if (navigator.onLine === false) {
                return new Response(OFFLINE_HTML, {
                  headers: { "Content-Type": "text/html" },
                });
              }  
                try {
                  const extController = new AbortController();
                  const extTimeoutId = setTimeout(() => extController.abort(), 4000);

                  // Usamos una URL externa confiable para verificar acceso a internet real
                  await fetch("https://clients3.google.com/generate_204", {
                    mode: "no-cors",
                    cache: "no-store",
                    signal: extController.signal,
                  });
                  clearTimeout(extTimeoutId);

                  // Si llegamos aquí, hay internet pero nuestro servidor no responde
                  return new Response(NOT_FOUND_HTML, {
                    headers: { "Content-Type": "text/html" },
                  });
                } catch (extError) {
                  // No hay acceso a internet real
                  return new Response(OFFLINE_HTML, {
                    headers: { "Content-Type": "text/html" },
                  });
                }
            },
          },
        ],
      }),
    },

    {
      matcher: ({ request }) => 
        request.url.includes("/api/") && 
        request.method === "GET" && 
        !request.url.includes("/api/ping") && 
        request.destination !== "document",
      handler: new NetworkFirst({
        cacheName: "TNDA-Apis",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
        ],
      }),
    },
    // 5. Cloudinary Images (Cache de imágenes externas)
    {
      matcher: ({ request }) => request.destination === "image",
      handler: new StaleWhileRevalidate({
        cacheName: "Underdog-images-cloudinary",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200], // 0 para peticiones opacas (cross-origin)
          }),
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
          }),
        ],
      }),
    },

    {
      matcher: ({ request }) => 
        request.destination === "style" || 
        request.destination === "script" || 
        request.destination === "font",
      handler: new StaleWhileRevalidate({
        cacheName: "Underdog-StaticFiles",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
        ],
      }),
    },
  ],
});


serwist.addEventListeners();