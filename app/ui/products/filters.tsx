'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/products/select";
import { Button } from "@/app/ui/button"; 
import { X } from "lucide-react"; 

import { Category, Brand } from "@/app/lib/definitions";
import { useState, useEffect } from "react";

export default function Filters({
  categories,
  brands,
  onOpenChange,
}: {
  categories: Category[];
  brands: Brand[];
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "all");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  const hasFilters = selectedBrand !== "all" || selectedCategory !== "all";

  // Efecto para hacer scroll suave al inicio cuando cambian los filtros
  useEffect(() => {
    if (searchParams.toString()) {
        // Esto asegura que si filtras, la página suba para mostrarte los resultados
        // pero de forma suave, no de golpe.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    
    // Mantenemos { scroll: false } para tener control manual del scroll
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("brand");
    params.delete("category");
    params.set("page", "1");
    
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    
    setSelectedBrand("all");
    setSelectedCategory("all");
  };

  useEffect(() => {
    setSelectedBrand(searchParams.get("brand") || "all");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  return (
    // CAMBIO AQUÍ: Quité 'sticky top-[64px] z-40 shadow-sm'
    // Ahora es un div normal que se queda en su lugar.
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* TÍTULO */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate max-w-[200px] md:max-w-none">
              {searchParams.get("query")
                ? `"${searchParams.get("query")}"`
                : "Productos"}
            </h1>
            <span className="text-sm text-gray-500 md:hidden">
                Filtros
            </span>
          </div>

          {/* FILTROS */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full">
              
              <Select
                value={selectedBrand}
                onValueChange={(val) => {
                  setSelectedBrand(val);
                  updateParams("brand", val);
                }}
                onOpenChange={onOpenChange}
              >
                <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-gray-200" aria-label="Marca">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las marcas</SelectItem>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val);
                  updateParams("category", val);
                }}
                onOpenChange={onOpenChange}
              >
                <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-gray-200" aria-label="Categoría">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 text-xs text-gray-500 hover:text-black self-end md:self-auto px-2"
                >
                    <X className="w-3 h-3 mr-1" />
                    Limpiar filtros
                </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}