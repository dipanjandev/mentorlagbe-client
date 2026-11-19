"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  DollarSign,
  ExternalLink,
  Filter,
  Pencil,
  PlusCircle,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { ITuition } from "@/types"
import { TuitionStatusBadge } from "./TuitionStatusBadge"
import { DeleteTuitionDialog } from "./DeleteTuitionDialog"
import { deleteJob } from "@/lib/actions/tuitions"
import { toast } from "sonner"

interface MyTuitionsTableProps {
  initialTuitions: ITuition[]
}

export const MyTuitionsTable: React.FC<MyTuitionsTableProps> = ({
  initialTuitions,
}) => {
  const [tuitions, setTuitions] = useState<ITuition[]>(initialTuitions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter tuitions based on search input and admin status
  const filteredTuitions = tuitions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || t.approvalStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handlers with TODO markers for functionality
  const handleToggleActive = (id?: string, currentStatus?: boolean) => {
    if (!id) return
    const newStatus = !currentStatus

    // Optimistic UI update
    setTuitions((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isActive: newStatus } : item
      )
    )

    // TODO: Implement Toggle Status API Call
    // PATCH /api/tuitions/:id/toggle-status { isActive: newStatus }
    console.log(
      "TODO: Toggle Active/Closed status for tuition id:",
      id,
      newStatus
    )
  }

  const handleDelete = async (id: string) => {
    const res = await deleteJob(id)
    if (res.deletedCount > 0) {
      setTuitions((prev) => prev.filter((item) => item._id !== id))
      toast.success("Tuition deleted successfully!")
    }
  }

  const handleEdit = (id?: string) => {
    if (!id) return
    // TODO: Implement Edit Modal open or redirect to Edit page
    console.log("TODO: Open Edit modal or navigate to edit for tuition id:", id)
    alert(
      `TODO: Edit Tuition (ID: ${id}) - Plug in your Edit modal or update form here.`
    )
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or subject..."
            className="w-full rounded-lg border border-input bg-background py-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="all">All Approval Status</option>
            <option value="approved">Approved Only</option>
            <option value="pending">Pending Only</option>
            <option value="rejected">Rejected Only</option>
          </select>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <th className="py-4 pr-4 pl-6">Tuition / Details</th>
                <th className="px-4 py-4">Subject & Level</th>
                <th className="px-4 py-4">Fee & Schedule</th>
                <th className="px-4 py-4">Admin Status</th>
                <th className="px-4 py-4">Availability</th>
                <th className="py-4 pr-6 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTuitions.length > 0 ? (
                filteredTuitions.map((tuition) => (
                  <tr
                    key={tuition._id}
                    className="transition hover:bg-muted/20"
                  >
                    {/* Tuition Title & Banner */}
                    <td className="py-4 pr-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tuition.bannerImage}
                            alt={tuition.title}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="line-clamp-1 font-semibold text-foreground">
                            {tuition.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-medium">
                              {tuition.mode}
                            </span>
                            <span>•</span>
                            <span className="line-clamp-1">
                              {tuition.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Subject & Class Level */}
                    <td className="px-4 py-4">
                      <div className="font-medium text-foreground">
                        {tuition.subject}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tuition.classLevel}
                      </div>
                    </td>

                    {/* Monthly Fee & Days/Week */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 font-semibold text-foreground">
                        <DollarSign className="size-3.5 text-muted-foreground" />
                        <span>৳{tuition.monthlyFee.toLocaleString()} / mo</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span>{tuition.daysPerWeek} days / week</span>
                      </div>
                    </td>

                    {/* Admin Approval Status */}
                    <td className="px-4 py-4">
                      <TuitionStatusBadge status={tuition.approvalStatus} />
                    </td>

                    {/* Active / Closed Toggle Switch */}
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleActive(tuition._id, tuition.isActive)
                        }
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                          tuition.isActive
                            ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                            : "border-muted bg-muted/50 text-muted-foreground hover:bg-muted"
                        }`}
                        title="Click to toggle Active / Closed status"
                      >
                        {tuition.isActive ? (
                          <>
                            <ToggleRight className="size-4 text-primary" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="size-4 text-muted-foreground" />
                            <span>Closed</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-6 pl-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Public Details Link */}
                        <Link
                          href={`/tuitions/${tuition._id}`}
                          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="View Tuition Details"
                        >
                          <ExternalLink className="size-4" />
                        </Link>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleEdit(tuition._id)}
                          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="Edit Tuition"
                        >
                          <Pencil className="size-4" />
                        </button>

                        {/* Delete Button */}
                        <DeleteTuitionDialog
                          title={tuition.title}
                          onConfirm={() => handleDelete(tuition._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <BookOpen className="size-6" />
                      </div>
                      <p className="text-base font-medium text-foreground">
                        No tuitions found
                      </p>
                      <p className="max-w-sm text-xs text-muted-foreground">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search query or status filter."
                          : "You haven't posted any tuitions yet. Click below to create your first post."}
                      </p>
                      <Link
                        href="/dashboard/tutor/post-tuition"
                        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
                      >
                        <PlusCircle className="size-3.5" />
                        <span>Post a Tuition</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
