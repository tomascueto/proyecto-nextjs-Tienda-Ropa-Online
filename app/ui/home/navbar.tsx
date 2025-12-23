import { fetchBrands, fetchCategories } from '@/app/lib/data'
import Link from 'next/link'
import Image from 'next/image' // <--- 1. IMPORTANTE: Importamos el componente Image
import DropdownCart from '@/app/ui/cart/dropdownCart';
import Dropdowns from '@/app/ui/home/dropdowns';
import Search from '@/app/ui/home/search';

export default async function Navbar(){

    const brands = await fetchBrands();
    const categories = await fetchCategories();

    return(
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Logo con Imágen */}
          <Link href="/" className="flex items-center">
            <Image 
                src="/logo-underdogs.png"      
                alt="TNDA Logo"          
                width={160}              
                height={56}              
                className="object-contain h-10 w-auto md:h-14"                
                priority                 
            />
          </Link>

          <Dropdowns brands={brands} categories={categories} />

          <div className="flex items-center space-x-2">
            <Search/>
            <DropdownCart/>            
          </div>
        </div>
      </header>
    )
}