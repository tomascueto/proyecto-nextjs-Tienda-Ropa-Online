import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Archivos de entrada y salida.
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  
  //Forzar recarga al volver a tener internet.
  reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'res.cloudinary.com',
        pathname: '**',    // Permite todas las rutas de imágenes
      },
    ],
  },
  // Opcional: Si usas exportación estática o configuraciones avanzadas
  // reactStrictMode: true,
};

export default withSerwist(nextConfig);