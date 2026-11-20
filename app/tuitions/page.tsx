import React from "react"
import Link from "next/link"
import { BookOpen, GraduationCap, Sparkles } from "lucide-react"
import { getTutionApi } from "@/lib/api/getTuition"
import { ITuition } from "@/types"
import { TuitionCard } from "@/components/tuitions/TuitionCard"
import { TuitionFilters } from "@/components/tuitions/TuitionFilters"
import { TuitionPagination } from "@/components/tuitions/TuitionPagination"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/NavBar"

interface BrowseTuitionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const BrowseTuitionsPage = async ({
  searchParams,
}: BrowseTuitionsPageProps) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams()

  // Safely construct query string matching backend parameters
  if (search) {
    Object.entries(search).forEach(([key, val]) => {
      if (typeof val === "string") {
        urlSearch.set(key, val)
      } else if (Array.isArray(val) && val.length > 0) {
        urlSearch.set(key, val[0])
      }
    })
  }

  if (!urlSearch.has("page")) {
    urlSearch.set("page", "1")
  }

  const query = urlSearch.toString()

  // Server-side fetch tuitions with safe fallback
  let tuitions: ITuition[] = []
  let totalItems = 0
  let totalPages = 1
  try {
    const data = await getTutionApi(query)
    tuitions = Array.isArray(data?.tuitions) ? data.tuitions : []
    totalItems = data?.totalItems
    totalPages = data?.totalPages
  } catch (error) {
    console.error("Error fetching tuitions:", error)
  }

  const totalResults = totalItems

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Hero / Header Section */}
      <section className="border-b border-border/80 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge
                  variant="outline"
                  className="gap-1 border-primary/20 bg-primary/5 py-1 text-primary"
                >
                  <Sparkles className="size-3" />
                  <span>Verified Tutors & Mentorship</span>
                </Badge>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Browse Tuitions & Batches
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Find expert tutors by class level, subject, and mode (Online or
                Offline) to elevate your academic goals.
              </p>
            </div>

            {/* Total Active Count Badge */}
            <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-xs">
              <span className="text-2xl font-bold text-primary">
                {totalResults}
              </span>
              <p className="text-xs font-medium text-muted-foreground">
                Available Tuitions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column: Reusable Radio-based Filter Sidebar */}
          <div className="w-full shrink-0 lg:w-72">
            <div className="lg:sticky lg:top-20">
              <TuitionFilters />
            </div>
          </div>

          {/* Right Column: Tuition Grid & Pagination */}
          <main className="flex-1 space-y-6">
            {/* Results Status Bar */}
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 text-xs text-muted-foreground shadow-xs">
              <div>
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {totalResults}
                </span>{" "}
                {totalResults === 1 ? "tuition post" : "tuition posts"}
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Active & Approved Listings</span>
              </div>
            </div>

            {/* Tuition Cards Grid */}
            {totalResults > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tuitions.map((singleTuition) => (
                  <TuitionCard
                    key={singleTuition._id}
                    tuition={singleTuition}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/50 py-16 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <BookOpen className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  No Tuitions Found
                </h3>
                <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">
                  No tuition listings matched your selected filters. Try
                  resetting the radio filters or searching with different
                  keywords.
                </p>
                <Link
                  href="/tuitions"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <GraduationCap className="size-4" />
                  <span>Reset All Filters</span>
                </Link>
              </div>
            )}

            {/* Pagination Component */}
            {totalResults > 0 && (
              <div className="mt-8">
                <TuitionPagination
                  currentPage={Number(search?.page) || 1}
                  totalPages={totalPages}
                  totalItems={totalItems}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default BrowseTuitionsPage
