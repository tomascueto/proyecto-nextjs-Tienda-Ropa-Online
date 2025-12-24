import { fetchBrands, fetchCategories } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image"; // <--- 1. Importamos el componente Image
import { Facebook, Instagram, Twitter, MapPin, Mail, ArrowRight } from "lucide-react";

export default async function Footer() {
  const brands = await fetchBrands();
  const categories = await fetchCategories();

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center md:text-left">
          
          {/* Columna 1: Marca y Sobre Nosotros */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            
            {/* 2. Reemplazamos el texto por el Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                  src="/logo-underdogs-blanco.png" // <--- CAMBIÁ ESTO por el nombre de tu archivo en /public
                  alt="TNDA Logo"
                  width={140}              // Un poco más grande que el header suele quedar bien en el footer
                  height={50}
                  className="object-contain h-12 w-auto md:h-14" // Altura responsiva (48px en móvil, 56px en PC)
              />
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Tu destino premium para las mejores zapatillas del mercado. Encontrá calidad, estilo y rendimiento en cada paso que das.
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <SocialIcon href="https://instagram.com" label="Instagram" icon={<Instagram size={20} />} />
              <SocialIcon href="https://twitter.com" label="Twitter" icon={<Twitter size={20} />} />
              <SocialIcon href="https://facebook.com" label="Facebook" icon={<Facebook size={20} />} />
            </div>
          </div>

          {/* ... (Resto de las columnas igual que antes) ... */}
          
          {/* Columna 2: Categorías */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Categorías</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/products?category=${category.name}&page=1`}
                    className="hover:text-white transition-colors duration-200 block py-1"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Marcas */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Marcas Top</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {brands.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link 
                    href={`/products?brand=${brand.name}&page=1`}
                    className="hover:text-white transition-colors duration-200 block py-1"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto y Newsletter */}
          <div className="space-y-8 md:space-y-6">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold text-lg mb-4 text-white">Contacto</h3>
              <ul className="space-y-4 text-sm text-gray-400 w-full">
                <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="p-2 bg-gray-900 rounded-full md:p-0 md:bg-transparent">
                    <MapPin size={18} className="text-white md:text-gray-400" />
                  </div>
                  <span className="max-w-[200px] md:max-w-none">Av. Alem 1253, Bahía Blanca, Buenos Aires</span>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                  <div className="p-2 bg-gray-900 rounded-full md:p-0 md:bg-transparent">
                     <Mail size={18} className="text-white md:text-gray-400" />
                  </div>
                  <a href="mailto:hola@tnda.com" className="hover:text-white transition-colors">underdogstm@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter Visual */}
            <div className="w-full max-w-xs mx-auto md:mx-0">
              <h4 className="text-sm font-semibold mb-3 text-white">Suscribite al newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email..." 
                  className="bg-gray-900 border border-gray-800 text-sm rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-gray-500"
                />
                <button className="bg-white text-black px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-medium" aria-label="Suscribirse">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} TNDA. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Pequeño componente helper
function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-gray-900 p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  )
}