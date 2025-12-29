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
      // Opción 1: HTTPS 
      {
        protocol: 'https', 
        hostname: 'res.cloudinary.com',
        pathname: '**',    
      },
      // Opción 2: HTTP 
      {
        protocol: 'http', 
        hostname: 'res.cloudinary.com',
        pathname: '**',    
      },
    ],
  },
};

export default withSerwist(nextConfig);