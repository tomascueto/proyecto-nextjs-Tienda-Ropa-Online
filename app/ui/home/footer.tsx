import { fetchBrands, fetchCategories } from "@/app/lib/data";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, ArrowRight } from "lucide-react";
import { Brand, Category } from "@/app/lib/definitions";

export default async function Footer() {
  let brands: Brand[] = [];
  let categories: Category[] = [];

  try {
    brands = await fetchBrands();
    categories = await fetchCategories();
  }
  catch (error) {
    console.error("Error fetching footer data:", error);
  }

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center md:text-left">
          
          {/* Columna 1: Marca y Sobre Nosotros */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-xl">
                T
              </div>
              <span className="font-bold text-2xl tracking-tight">TNDA</span>
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

          {/* Columna 2: Categorías (Dinámicas) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/products?category=${category.name}&page=1`}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Marcas (Dinámicas - Limitadas a 5 para no saturar) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Marcas Top</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {brands.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link 
                    href={`/products?brand=${brand.name}&page=1`}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto y Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>Av. Alem 1253, Bahía Blanca,<br />Buenos Aires, Argentina</span>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <Mail size={18} className="shrink-0" />
                  <a href="mailto:hola@tnda.com" className="hover:text-white transition-colors">hola@tnda.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter Visual */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-2">Suscribite al newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email..." 
                  className="bg-gray-900 border border-gray-700 text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500 transition-colors"
                />
                <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors" aria-label="Suscribirse">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} TNDA. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Pequeño componente helper para los íconos sociales
function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  )
}