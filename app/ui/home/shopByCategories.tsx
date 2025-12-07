'use client'

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/app/lib/definitions";
import { cn } from "@/app/lib/utils"; // <--- 1. IMPORTANTE: Importar cn
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/home/carousel"

type Props = {
  categories: Category[]
}

export default function ShopByCategories({ categories }: Props) {
  return (
    <section className="bg-gray-50 py-20 min-h-[90vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Comprar por categorías</h2>
          <p className="text-gray-500">Encuentra tu estilo ideal</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* 2. CAMBIO AQUÍ: 
             Usamos 'cn' para agregar 'lg:justify-center' condicionalmente.
             
             Explicación:
             - '-ml-4': Es el margen negativo base del carousel (no lo tocamos).
             - 'categories?.length < 4': Si hay 1, 2 o 3 categorías...
             - 'lg:justify-center': ...las centramos horizontalmente PERO SOLO en pantallas grandes (lg).
             
             Por qué solo 'lg'? Porque en móvil/tablet mostramos menos items por fila (1 o 2),
             así que si tienes 3 categorías, en tablet SÍ ocupan más del 100% del ancho y 
             necesitan scroll, por lo que no debemos centrarlas ahí.
          */}
          <CarouselContent className={cn(
            "-ml-4", 
            categories?.length < 4 ? "lg:justify-center" : ""
          )}>
            {categories && categories.map((category) => (
              <CarouselItem key={category.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                <Link href={`/products?category=${category.name}`} className="group block h-full">
                  
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    
                    <Image
                      src={category.image || "/placeholder.svg"} 
                      alt={`Zapatillas de ${category.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <h3 className="text-white text-2xl font-bold mb-1 uppercase tracking-wide">{category.name}</h3>
                      {category.description && (
                        <p className="text-white/80 text-sm line-clamp-1">{category.description}</p>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Ocultamos las flechas si hay pocas categorías, ya que no hay nada que scrollear en desktop */}
          {categories?.length >= 4 && (
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-20px] md:left-[-50px]" />
              <CarouselNext className="right-[-20px] md:right-[-50px]" />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}