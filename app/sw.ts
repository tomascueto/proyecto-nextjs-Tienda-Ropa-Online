// sw.ts
declare const self: any;
import { Serwist, NetworkFirst, NetworkOnly, ExpirationPlugin, CacheableResponsePlugin } from "serwist";

const OFFLINE_HTML = `<!DOCTYPE html> 
                        <html lang="es"> 
                        <head> 
                          <meta charset="UTF-8"> 
                          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                          <title>Sin conexión | TNDA</title> 
                          <style> 
                         /* Reset y estilos base inspirados en Tailwind */ 
                        * { 
                            margin: 0; 
                            padding: 0; 
                            box-sizing: border-box; 
                        } 
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                            background-color: #f9fafb; /* bg-gray-50 */ 
                            color: #111827; /* text-gray-900 */ 
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
                            border-radius: 1rem; /* rounded-2xl */ 
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */ 
                            max-width: 28rem; /* max-w-md */ 
                            width: 100%; 
                        } 
                        .icon-container { 
                            background-color: #f3f4f6; /* bg-gray-100 */ 
                            width: 5rem; /* w-20 */ 
                            height: 5rem; /* h-20 */ 
                            border-radius: 9999px; 
                            margin: 0 auto 1.5rem auto; /* mx-auto mb-6 */ 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                        } 
                        .icon { 
                            color: #6b7280; /* text-gray-500 */ 
                            width: 2.5rem; /* h-10 */ 
                            height: 2.5rem; /* w-10 */ 
                        } 
                        h1 { 
                            font-size: 1.5rem; /* text-2xl */ 
                            font-weight: 700; 
                            margin-bottom: 0.5rem; 
                            color: #111827; 
                        } 
                        p { 
                            color: #4b5563; /* text-gray-600 */ 
                            margin-bottom: 2rem; 
                            line-height: 1.5; 
                        } 
                        .button { 
                            display: block; 
                            width: 100%; 
                            background-color: #000000; 
                            color: #ffffff; 
                            font-weight: 500; 
                            padding: 0.75rem; 
                            border-radius: 0.5rem; /* rounded-lg */ 
                            text-decoration: none; 
                            transition: background-color 0.2s; 
                            border: none; 
                            cursor: pointer; 
                            font-size: 1rem; 
                        } 
                        .button:hover { 
                            background-color: #1f2937; /* hover:bg-gray-800 */ 
                        } 
                        .footer-text { 
                            margin-top: 1.25rem; 
                            font-size: 0.75rem; /* text-xs */ 
                            color: #2c2d2eff; /* text-gray-400 */ 
                        } 
                    </style> 
                </head> 
                <body> 
                  
                    <div class="card"> 
                        <div class="icon-container"> 
                            <!-- Icono WifiOff de Lucide convertido a SVG --> 
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
                          
                        <h1>Estás sin conexión</h1> 
                          
                        <p>Parece que perdiste tu conexión a internet. Verificá tu red e intentá nuevamente.</p> 
                  
                        <div class="space-y"> 
                            <button onclick="window.location.href='/'" class="button">Volver al Inicio</button> 
                              
                            <p class="footer-text"> 
                                Algunas funciones pueden no estar disponibles hasta que recuperes la conexión. 
                            </p> 
                        </div> 
                    </div> 
                  
                    <script> 
                        // Opcional: Recargar automáticamente cuando detecte que vuelve internet 
                        window.addEventListener('online', () => { 
                            window.location.reload(); 
                        }); 
                    </script> 
                </body> 
                </html>`; 

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // 1. REGLA PARA DOCUMENTOS (Navegación real)
    // Solo aquí devolvemos tu HTML de "Estás sin conexión"
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new NetworkFirst({
        cacheName: "TNDA-Pages",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 }),
          {
            // Solo si falla la navegación de la página completa
            handlerDidError: async () => {
              return new Response(OFFLINE_HTML, {
                headers: { "Content-Type": "text/html" },
              });
            },
          },
        ],
      }),
    },

    // 2. REGLA PARA PING (Verificación de conexión real)
    // Usamos NetworkOnly para que nunca use caché ni el service worker para responder
    {
      matcher: ({ url }) => url.pathname === "/api/ping",
      handler: new NetworkOnly(),
    },

    // 3. REGLA PARA DATOS DE NEXT.JS (RSC) Y API GET
    // Aquí NO devolvemos HTML si falla, dejamos que falle o use caché.
    {
      matcher: ({ request, url }) => 
        url.searchParams.has("_rsc") || 
        request.headers.get("RSC") === "1" || 
        url.pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: "TNDA-Data",
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
          {
          // Solo si falla la navegación de la página completa  
          handlerDidError: async () => {
              return new Response(OFFLINE_HTML, {
                headers: { "Content-Type": "text/html" },
              });
            },
          }
        ],
      }),
    },

    // 4. REGLA PARA IMÁGENES (Cloudinary u otras)
    {
      matcher: ({ request }) => request.destination === "image",
      handler: new NetworkFirst({
        cacheName: "TNDA-Images",
        plugins: [
          new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();