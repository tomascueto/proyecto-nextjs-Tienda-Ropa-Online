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
  images: {
    remotePatterns: [
      // Opción 1: HTTPS (La que ya tenías)
      {
        protocol: 'https', 
        hostname: 'res.cloudinary.com',
        pathname: '**',    
      },
      // Opción 2: HTTP (La que falta para arreglar el error)
      {
        protocol: 'http', 
        hostname: 'res.cloudinary.com',
        pathname: '**',    
      },
    ],
  },
};

export default withSerwist(nextConfig);