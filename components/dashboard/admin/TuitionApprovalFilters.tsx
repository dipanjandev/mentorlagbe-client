"use client"

import React from "react"
import { Search, Filter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TuitionApprovalFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  availabilityFilter: string
  onAvailabilityFilterChange: (value: string) => void
  totalCount: number
  filteredCount: number
}

// এই কম্পোনেন্টটি দিয়ে এডমিন টিউশনের নাম দিয়ে সার্চ, এডমিন স্ট্যাটাস এবং টিউটরের ব্যাচ চালু/বন্ধ ফিল্টার করতে পারেন
const TuitionApprovalFilters: React.FC<TuitionApprovalFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  totalCount,
  filteredCount,
}) => {
  // কোনো ফিল্টার সক্রিয় আছে কি না তা চেক করা
  const hasActiveFilters = Boolean(
    searchTerm || statusFilter !== "all" || availabilityFilter !== "all"
  )

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-2xs sm:flex-row sm:items-center">
      {/* বামে: ফিল্টারের রেজাল্ট কাউন্ট */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Showing</span>
        <span className="font-bold text-foreground">{filteredCount}</span>
        <span>of</span>
        <span className="font-bold text-foreground">{totalCount}</span>
        <span>tuition posts</span>
      </div>

      {/* ডানে: সার্চ ইনপুট, স্ট্যাটাস ড্রপডাউন এবং অ্যাভেইল্যাবিলিটি ড্রপডাউন */}
      <div className="flex flex-wrap items-center gap-3">
        {/* ১. সার্চ ইনপুট */}
        <div className="relative w-full sm:w-56">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search title, tutor..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-2 pr-4 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* ২. এডমিন স্ট্যাটাস ফিল্টার সিলেক্টর */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="rounded-xl border border-input bg-background py-2 pr-8 pl-8 text-xs font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="all">All Approval</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* ৩. টিউটর অ্যাভেইল্যাবিলিটি ফিল্টার (Active vs Closed) */}
        <div className="relative flex items-center">
          <select
            value={availabilityFilter}
            onChange={(e) => onAvailabilityFilterChange(e.target.value)}
            className="rounded-xl border border-input bg-background py-2 pr-4 pl-3 text-xs font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="all">All Batches</option>
            <option value="active">Active (Open)</option>
            <option value="closed">Closed by Tutor</option>
          </select>
        </div>

        {/* ৪. ফিল্টার রিসেট বাটন */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange("")
              onStatusFilterChange("all")
              onAvailabilityFilterChange("all")
            }}
            className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default TuitionApprovalFilters
