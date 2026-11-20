"use client"

import React, { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Filter, RotateCcw, Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Filter Options matching your backend query logic
const CLASS_LEVELS = [
  { label: "All Levels", value: "" },
  { label: "Class 1-5 (Primary)", value: "Class 1-5" },
  { label: "Class 6-8 (Junior)", value: "Class 6-8" },
  { label: "Class 9-10 (SSC)", value: "Class 9-10" },
  { label: "Class 11-12 (HSC)", value: "HSC" },
  { label: "O-Levels", value: "O-Levels" },
  { label: "A-Levels", value: "A-Levels" },
  { label: "University Admission", value: "Admission" },
]

const TUITION_MODES = [
  { label: "All Modes", value: "" },
  { label: "Online (Live Classes)", value: "Online" },
  { label: "Offline (In-Person / Home)", value: "Offline" },
]

const DAYS_PER_WEEK = [
  { label: "All Schedules", value: "" },
  { label: "2 Days / Week", value: "2" },
  { label: "3 Days / Week", value: "3" },
  { label: "4 Days / Week", value: "4" },
  { label: "5 Days / Week", value: "5" },
]

export const TuitionFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Current values from URL params
  const currentSearch = searchParams.get("search") || ""
  const currentClassLevel = searchParams.get("classLevel") || ""
  const currentMode = searchParams.get("mode") || ""
  const currentDays = searchParams.get("daysPerWeek") || ""

  // Local state for immediate search input feedback
  const [searchValue, setSearchValue] = useState(currentSearch)

  // Update URL search parameters
  const updateQueryParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    // ফিল্টার বদলালে 1 নাম্বার পেজে নিয়ে যাবে।
    params.delete(name)

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  // Handle Search Form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQueryParam("search", searchValue.trim())
  }

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchValue("")
    startTransition(() => {
      router.push(pathname)
    })
  }

  const hasActiveFilters = Boolean(
    currentSearch || currentClassLevel || currentMode || currentDays
  )

  return (
    <aside className="w-full space-y-6 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-primary" />
          <h2 className="text-base font-bold text-foreground">
            Filter Tuitions
          </h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* 1. Search Filter (matches req.query.search) */}
      <form onSubmit={handleSearchSubmit} className="space-y-2">
        <Label
          htmlFor="tuition-search"
          className="text-xs font-semibold text-foreground"
        >
          Search Tuition / Topic
        </Label>
        <div className="relative">
          <Input
            id="tuition-search"
            type="text"
            placeholder="Search by title or topic..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pr-10 text-xs"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
            title="Search"
          >
            <Search className="size-4" />
          </button>
        </div>
      </form>

      {/* 2. Class Level Filter (matches req.query.classLevel - Radio Group) */}
      <div className="space-y-3 border-t border-border/60 pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">
            Class Level
          </Label>
          {currentClassLevel && (
            <span className="text-[10px] font-medium text-primary">Active</span>
          )}
        </div>
        <RadioGroup
          value={currentClassLevel}
          onValueChange={(val) => updateQueryParam("classLevel", val as string)}
          className="space-y-2"
        >
          {CLASS_LEVELS.map((level) => {
            const id = `level-${level.value || "all"}`
            return (
              <div key={level.value} className="flex items-center space-x-2.5">
                <RadioGroupItem value={level.value} id={id} />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-xs font-normal text-muted-foreground transition hover:text-foreground"
                >
                  {level.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>

      {/* 3. Tuition Mode Filter (matches req.query.mode - Radio Group) */}
      <div className="space-y-3 border-t border-border/60 pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">
            Tuition Mode
          </Label>
          {currentMode && (
            <span className="text-[10px] font-medium text-primary">Active</span>
          )}
        </div>
        <RadioGroup
          value={currentMode}
          onValueChange={(val) => updateQueryParam("mode", val as string)}
          className="space-y-2"
        >
          {TUITION_MODES.map((mode) => {
            const id = `mode-${mode.value || "all"}`
            return (
              <div key={mode.value} className="flex items-center space-x-2.5">
                <RadioGroupItem value={mode.value} id={id} />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-xs font-normal text-muted-foreground transition hover:text-foreground"
                >
                  {mode.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>

      {/* 4. Days Per Week Filter (matches req.query.daysPerWeek - Radio Group) */}
      <div className="space-y-3 border-t border-border/60 pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">
            Schedule (Days / Week)
          </Label>
          {currentDays && (
            <span className="text-[10px] font-medium text-primary">Active</span>
          )}
        </div>
        <RadioGroup
          value={currentDays}
          onValueChange={(val) =>
            updateQueryParam("daysPerWeek", val as string)
          }
          className="space-y-2"
        >
          {DAYS_PER_WEEK.map((day) => {
            const id = `days-${day.value || "all"}`
            return (
              <div key={day.value} className="flex items-center space-x-2.5">
                <RadioGroupItem value={day.value} id={id} />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-xs font-normal text-muted-foreground transition hover:text-foreground"
                >
                  {day.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>

      {/* Pending transition indicator */}
      {isPending && (
        <div className="animate-pulse text-center text-[11px] text-muted-foreground">
          Updating results...
        </div>
      )}
    </aside>
  )
}
