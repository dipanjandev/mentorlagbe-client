"use client"

import React from "react"
import { Search, Filter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserFilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleFilterChange: (value: string) => void
  totalCount: number
  filteredCount: number
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  totalCount,
  filteredCount,
}) => {
  const hasActiveFilters = Boolean(searchTerm || roleFilter !== "all")

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-xs sm:flex-row sm:items-center">
      {/* Left: Summary Count */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Showing</span>
        <span className="font-bold text-foreground">{filteredCount}</span>
        <span>of</span>
        <span className="font-bold text-foreground">{totalCount}</span>
        <span>registered users</span>
      </div>

      {/* Right: Search & Role Filter */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-2 pr-4 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* Role Select Dropdown */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="rounded-xl border border-input bg-background py-2 pr-8 pl-8 text-xs font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="tutor">Tutors</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange("")
              onRoleFilterChange("all")
            }}
            className="h-8 gap-1 rounded-xl text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserFilterBar
