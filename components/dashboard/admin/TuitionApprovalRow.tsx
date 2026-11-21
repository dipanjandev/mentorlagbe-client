"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  X,
  ExternalLink,
  BookOpen,
  Loader2,
  MapPin,
  Globe,
  PauseCircle,
} from "lucide-react"
import { ITuition } from "@/types"
import { TuitionStatusBadge } from "@/components/tutor/TuitionStatusBadge"

interface TuitionApprovalRowProps {
  tuition: ITuition
  onStatusChange: (id: string, newStatus: "approved" | "rejected") => Promise<void>
}

// এই কম্পোনেন্টটি টেবিলের প্রতিটি টিউশন রো রেন্ডার করে এবং এডমিনকে স্ট্যাটাস ও অ্যাভেইল্যাবিলিটি দেখে সিদ্ধান্ত নিতে সাহায্য করে
const TuitionApprovalRow: React.FC<TuitionApprovalRowProps> = ({
  tuition,
  onStatusChange,
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  // স্ট্যাটাস পরিবর্তনের হ্যান্ডলার
  const handleAction = async (status: "approved" | "rejected") => {
    if (!tuition._id) return
    try {
      setIsUpdating(true)
      await onStatusChange(tuition._id, status)
    } finally {
      setIsUpdating(false)
    }
  }

  const currentStatus = tuition.approvalStatus || "pending"
  // টিউটর নিজে ব্যাচটি বন্ধ করে রেখেছে কি না
  const isBatchClosed = tuition.isActive === false

  return (
    <tr className="border-b border-border/60 transition-colors hover:bg-muted/30">
      {/* ১. টিউশন তথ্য (ব্যানার, টাইটেল ও ক্লাস লেভেল) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* ব্যানার থাম্বনেইল */}
          <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/40">
            {tuition.bannerImage ? (
              <Image
                src={tuition.bannerImage}
                alt={tuition.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <BookOpen className="size-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <p className="line-clamp-1 max-w-[200px] text-sm font-semibold text-foreground sm:max-w-xs">
              {tuition.title}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-primary">{tuition.subject}</span>
              <span>•</span>
              <span>{tuition.classLevel}</span>
            </div>
          </div>
        </div>
      </td>

      {/* ২. টিউটরের তথ্য */}
      <td className="px-6 py-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">
            {tuition.tutorName || "Unknown Tutor"}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {tuition.tutorEmail}
          </p>
        </div>
      </td>

      {/* ৩. মোড ও মাসিক ফি */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-foreground">
            ${tuition.monthlyFee}
            <span className="text-[11px] font-normal text-muted-foreground">
              /month
            </span>
          </span>
          <span className="inline-flex w-fit items-center gap-1 rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {tuition.mode === "Online" ? (
              <Globe className="size-2.5 text-blue-500" />
            ) : (
              <MapPin className="size-2.5 text-amber-500" />
            )}
            <span>{tuition.mode}</span>
          </span>
        </div>
      </td>

      {/* ৪. এডমিন অ্যাপ্রুভাল স্ট্যাটাস */}
      <td className="px-6 py-4">
        <TuitionStatusBadge status={currentStatus} />
      </td>

      {/* ৫. টিউটর ব্যাচ অ্যাভেইল্যাবিলিটি (Active vs Closed) */}
      <td className="px-6 py-4">
        {isBatchClosed ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400"
            title="Tutor has marked this tuition batch as closed/paused."
          >
            <PauseCircle className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Closed by Tutor</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Accepting Students</span>
          </span>
        )}
      </td>

      {/* ৬. এডমিন অ্যাকশন বাটনসমূহ (Approve, Reject, View) */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* View Details Link */}
          <Link
            href={`/tuitions/${tuition._id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View Details in new tab"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <ExternalLink className="size-3.5" />
          </Link>

          {isUpdating ? (
            <div className="flex size-8 items-center justify-center">
              <Loader2 className="size-4 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Approve Button */}
              <button
                type="button"
                disabled={currentStatus === "approved"}
                onClick={() => handleAction("approved")}
                title="Approve Tuition"
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
              >
                <Check className="size-3.5" />
                <span className="hidden sm:inline">Approve</span>
              </button>

              {/* Reject Button */}
              <button
                type="button"
                disabled={currentStatus === "rejected"}
                onClick={() => handleAction("rejected")}
                title="Reject Tuition"
                className="inline-flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
              >
                <X className="size-3.5" />
                <span className="hidden sm:inline">Reject</span>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

export default TuitionApprovalRow
