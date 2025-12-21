import { fetchBrands, fetchCategories } from '@/app/lib/data'
import Link  from 'next/link'
import DropdownCart from '@/app/ui/cart/dropdownCart';
import Dropdowns from '@/app/ui/home/dropdowns';
import Search from '@/app/ui/home/search';
import { Brand, Category } from '@/app/lib/definitions';
import { Suspense } from 'react';

export default async function Navbar(){

    let brands: Brand[] = [];
    let categories: Category[] = [];

    try {
      brands = await fetchBrands();
      categories = await fetchCategories();
    } 
    catch (error) {
      console.error("Error fetching navbar data:", error);
    }

    return(
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl">TNDA</span>
          </Link>
          <Dropdowns brands={brands} categories={categories} />

          <div className="flex items-center space-x-2">
            <Suspense fallback={<div className="w-8 h-8" />}>
              <Search/>
            </Suspense>
            <DropdownCart/>            
          </div>
        </div>
      </header>
    )
}

