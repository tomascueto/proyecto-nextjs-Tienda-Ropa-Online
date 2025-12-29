"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductsPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {isFirstPage ? (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only">Anterior</span>
        </Button>
      ) : (
        <Link href={createPageURL(currentPage - 1)}>
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only">Anterior</span>
          </Button>
        </Link>
      )}
      <div className="flex gap-1 flex-wrap justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={currentPage === page ? "bg-black hover:bg-gray-800" : "hidden sm:inline-flex"}
            >
              {page}
            </Button>
          </Link>
        ))}
        <Button variant="outline" size="sm" className="sm:hidden pointer-events-none border-0">
            Pág {currentPage} de {totalPages}
        </Button>
      </div>
      {isLastPage ? (
        <Button variant="outline" size="sm" disabled>
          <span className="sr-only sm:not-sr-only">Siguiente</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Link href={createPageURL(currentPage + 1)}>
          <Button variant="outline" size="sm">
            <span className="sr-only sm:not-sr-only">Siguiente</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      )}
      
    </div>
  )
}