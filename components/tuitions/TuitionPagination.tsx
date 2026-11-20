"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TuitionPaginationProps {
  currentPage?: number
  totalPages?: number
  totalItems?: number
}

export const TuitionPagination: React.FC<TuitionPaginationProps> = ({
  currentPage = 1,
  totalPages = 5,
  totalItems = 24,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handler for changing pages
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    // Update 'page' in URL search parameters
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())

    // TODO: Connect page change API or update your backend query params
    console.log("TODO: Navigate to page number:", page, "with query:", params.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
      {/* Page Info */}
      <p className="text-xs text-muted-foreground">
        Showing Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span> (Total {totalItems} Tuitions)
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="gap-1 rounded-xl text-xs"
        >
          <ChevronLeft className="size-3.5" />
          <span>Previous</span>
        </Button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          const isActive = pageNum === currentPage
          return (
            <Button
              key={pageNum}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => handlePageChange(pageNum)}
              className={`size-8 rounded-xl text-xs font-medium ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              {pageNum}
            </Button>
          )
        })}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="gap-1 rounded-xl text-xs"
        >
          <span>Next</span>
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
