import './ui/global.css'
import type { ReactNode } from 'react'
import { jost } from '@/app/ui/fonts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | TNDA. SHOP',
    default: 'UnderdogsTM',
  },
  description: 'Tu tienda online de ropa urbana y zapatillas.',
  metadataBase: new URL('https://proyecto-nextjs-tienda-ropa-online.vercel.app'),
  icons: {
    icon: "/favicon.ico", // O "/logo.png" si usaste una imagen PNG en 'public'
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${jost.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
