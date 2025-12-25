import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Underddogs. SHOP',
    short_name: 'Underddogs',
    description: 'Tu tienda online de ropa urbana y zapatillas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/logo-underdogs192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/logo-underdogs512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
