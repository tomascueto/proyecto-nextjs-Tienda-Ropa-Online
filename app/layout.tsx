import './ui/global.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
