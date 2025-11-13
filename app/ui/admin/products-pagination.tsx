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

  return (
    <div className="flex gap-2">
      <Link href={createPageURL(currentPage - 1)}>
        <Button variant="outline" size="sm" disabled={currentPage <= 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>
      </Link>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={currentPage === page ? "bg-black hover:bg-gray-800" : ""}
            >
              {page}
            </Button>
          </Link>
        ))}
      </div>

      <Link href={createPageURL(currentPage + 1)}>
        <Button variant="outline" size="sm" disabled={currentPage >= totalPages}>
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  )
}
