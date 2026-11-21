"use client"

import React from "react"
import { BookOpen, Clock, CheckCircle2, PauseCircle } from "lucide-react"
import { ITuition } from "@/types"

interface TuitionApprovalStatsProps {
  tuitions: ITuition[]
}

// এই কম্পোনেন্টটি এডমিনকে এক নজরে সব টিউশন, পেন্ডিং, লাইভ অ্যাক্টিভ এবং টিউটর কর্তৃক বন্ধ থাকা পোস্টের সংখ্যা দেখায়
const TuitionApprovalStats: React.FC<TuitionApprovalStatsProps> = ({
  tuitions,
}) => {
  // স্ট্যাটাস ও অ্যাভেইল্যাবিলিটি অনুযায়ী টিউশন সংখ্যা হিসাব করা
  const total = tuitions.length
  const pending = tuitions.filter(
    (t) => !t.approvalStatus || t.approvalStatus === "pending"
  ).length

  // লাইভ আছে: এডমিন অনুমোদিত এবং টিউটর বন্ধ করেনি
  const approvedAndLive = tuitions.filter(
    (t) => t.approvalStatus === "approved" && t.isActive !== false
  ).length

  // টিউটর কর্তৃক বন্ধ রাখা হয়েছে
  const closedByTutor = tuitions.filter((t) => t.isActive === false).length

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* ১. সর্বমোট টিউশন পোস্ট */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Listings
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-foreground">{total}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          All submitted tuition posts
        </p>
      </div>

      {/* ২. অপেক্ষমান পোস্ট (Pending) - এডমিনের দৃষ্টি আকর্ষণ করতে অ্যাম্বার কালার */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-2xs transition hover:border-amber-500/50">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Pending Review
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-amber-700 dark:text-amber-400">
          {pending}
        </p>
        <p className="mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80">
          Awaiting admin decision
        </p>
      </div>

      {/* ৩. অনুমোদিত ও লাইভ পোস্ট (Approved & Live) */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-emerald-500/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Approved & Live
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
          {approvedAndLive}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Live on public browse page
        </p>
      </div>

      {/* ৪. টিউটর কর্তৃক বন্ধ রাখা পোস্ট (Closed by Tutor) */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-rose-500/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Closed by Tutor
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <PauseCircle className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-rose-600 dark:text-rose-400">
          {closedByTutor}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Batch paused by tutor
        </p>
      </div>
    </div>
  )
}

export default TuitionApprovalStats
