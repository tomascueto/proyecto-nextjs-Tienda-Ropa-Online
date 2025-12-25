'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/app/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import ShopByCategories from "./shopByCategories"
import { Category } from "@/app/lib/definitions"
import { jost } from "@/app/ui/fonts"

type Props = {
  carouselImages: string[],
  categories: Category[]
}

export default function Hero({ carouselImages, categories }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage((currentImage + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [currentImage, carouselImages])

  const changeImage = (newIndex: number) => {
    setFade(false)
    setTimeout(() => {
      setCurrentImage(newIndex)
      setFade(true)
    }, 500)
  }

  const nextImage = () => changeImage((currentImage + 1) % carouselImages.length)
  const prevImage = () => changeImage((currentImage - 1 + carouselImages.length) % carouselImages.length)

  return (
    <>
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* COLUMNA IZQUIERDA: Carousel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
              <Image
                src={carouselImages[currentImage] || "/placeholder.svg"}
                alt="Zapatillas destacadas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
                priority
              />

              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm"
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm"
                  onClick={nextImage}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeImage(index)}
                    aria-label={`Ir a la imagen ${index + 1}`}
                    className="p-2 group focus:outline-none" 
                  >
                    <span 
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImage ? "bg-black w-6" : "bg-black/30 w-1.5 group-hover:bg-black/50"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`flex flex-col justify-center items-center text-center space-y-8 order-1 lg:order-2 ${jost.className}`}>
            
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold tracking-wider uppercase mb-2">
              Nueva Colección 2025
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
              DEFINÍ <br className="hidden lg:block" />
              TU CAMINO.
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed">
              Encontrá el equilibrio perfecto entre rendimiento y estilo urbano con las marcas que lideran el juego.
            </p>

            <div className="pt-4">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  Explorar Tienda
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm font-semibold text-gray-600 uppercase tracking-widest">
              <span>Nike</span>
              <span>•</span>
              <span>Adidas</span>
              <span>•</span>
              <span>Jordan</span>
            </div>

          </div>
        </div>
      </main>
      
      <ShopByCategories categories={categories} />
    </>
  )
}