"use client"

import React, { useEffect, useState } from "react"
import { CheckSquare, Loader2, Inbox } from "lucide-react"
import { toast } from "sonner"
import { ITuition } from "@/types"
import { getTutionApi } from "@/lib/api/getTuition"
import { updateTuitionStatus } from "@/lib/actions/tuitions"
import TuitionApprovalStats from "@/components/dashboard/admin/TuitionApprovalStats"
import TuitionApprovalFilters from "@/components/dashboard/admin/TuitionApprovalFilters"
import TuitionApprovalRow from "@/components/dashboard/admin/TuitionApprovalRow"

// এই পেজটি এডমিনকে টিউটরদের পোস্ট করা সকল টিউশন রিভিউ করা এবং ব্যাচ চালু/বন্ধের অবস্থা দেখার ক্ষমতা দেয়
const TuitionApprovalPage = () => {
  const [tuitions, setTuitions] = useState<ITuition[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  // ১. পেজ লোড হওয়ার সাথে সাথে ব্যাকএন্ড থেকে সব টিউশন লোড করা (isAdmin=true পাঠিয়ে)
  useEffect(() => {
    document.title = "Tuition Approval & Monitoring | MentorLagbe"
    const fetchAllTuitions = async () => {
      try {
        setLoading(true)
        // isAdmin=true পাঠানোয় ব্যাকএন্ড পেন্ডিং, অ্যাপ্রুভড ও রিজেক্টেড সব টিউশন রিটার্ন করবে
        const data = await getTutionApi("isAdmin=true")
        setTuitions(Array.isArray(data?.tuitions) ? data.tuitions : [])
      } catch (error) {
        console.error("Failed to load tuitions:", error)
        toast.error("Failed to load tuition listings")
      } finally {
        setLoading(false)
      }
    }

    fetchAllTuitions()
  }, [])

  // ২. টিউশনের অ্যাপ্রুভাল স্ট্যাটাস (Approve বা Reject) পরিবর্তন করার হ্যান্ডলার
  const handleStatusChange = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      // ব্যাকএন্ডের PATCH /tuitions/:id/status এন্ডপয়েন্টে রিকোয়েস্ট পাঠানো
      const res = await updateTuitionStatus(id, newStatus)

      if (res?.success || res?.modifiedCount > 0) {
        toast.success(
          newStatus === "approved"
            ? "Tuition approved successfully and is now public!"
            : "Tuition post has been rejected."
        )

        // অপটিমিস্টিক UI আপডেট: ইউজার ইন্টারফেস সাথে সাথে আপডেট করে দেওয়া
        setTuitions((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, approvalStatus: newStatus } : t
          )
        )
      } else {
        toast.error(res?.message || "Failed to update tuition status")
      }
    } catch (error) {
      console.error("Error updating tuition approval:", error)
      toast.error("An error occurred while updating status")
    }
  }

  // ৩. সার্চ ইনপুট, এডমিন স্ট্যাটাস এবং টিউটরের ব্যাচ অ্যাভেইল্যাবিলিটি অনুযায়ী ফিল্টার করা
  const filteredTuitions = tuitions.filter((t) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      t.title?.toLowerCase().includes(searchLower) ||
      t.subject?.toLowerCase().includes(searchLower) ||
      t.tutorName?.toLowerCase().includes(searchLower) ||
      t.tutorEmail?.toLowerCase().includes(searchLower)

    const currentStatus = t.approvalStatus || "pending"
    const matchesStatus =
      statusFilter === "all" || currentStatus === statusFilter

    const isClosed = t.isActive === false
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "active" && !isClosed) ||
      (availabilityFilter === "closed" && isClosed)

    return matchesSearch && matchesStatus && matchesAvailability
  })

  return (
    <div className="space-y-6">
      {/* পেজ হেডার সেকশন */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckSquare className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Tuition Approval & Monitoring
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Review newly posted tuition batches, inspect tutor availability
          (Open/Closed), and approve or reject listings.
        </p>
      </div>

      {/* ১. সারাংশ স্ট্যাটাস কার্ডসমূহ (Total, Pending, Approved & Live, Closed by Tutor) */}
      <TuitionApprovalStats tuitions={tuitions} />

      {/* ২. সার্চ ও স্ট্যাটাস ফিল্টারিং বার */}
      <TuitionApprovalFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        availabilityFilter={availabilityFilter}
        onAvailabilityFilterChange={setAvailabilityFilter}
        totalCount={tuitions.length}
        filteredCount={filteredTuitions.length}
      />

      {/* ৩. টিউশন মডারেশন টেবিল */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs">
        {loading ? (
          <div className="flex min-h-75 flex-col items-center justify-center gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Loading tuition submissions...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/80 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Tuition Details
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tutor
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fee & Mode
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Approval
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Availability
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredTuitions.length > 0 ? (
                  filteredTuitions.map((tuition) => (
                    <TuitionApprovalRow
                      key={tuition._id}
                      tuition={tuition}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Inbox className="size-8 text-muted-foreground/60" />
                        <p className="text-sm font-semibold text-foreground">
                          No tuitions found
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try adjusting your search criteria or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TuitionApprovalPage
