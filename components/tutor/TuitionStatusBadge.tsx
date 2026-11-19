import React from "react"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { TApprovalStatus } from "@/types"

interface TuitionStatusBadgeProps {
  status?: TApprovalStatus
}

export const TuitionStatusBadge: React.FC<TuitionStatusBadgeProps> = ({
  status = "pending",
}) => {
  switch (status) {
    case "approved":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-3.5" />
          Approved
        </span>
      )
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <Clock className="size-3.5" />
          Pending Review
        </span>
      )
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
          <XCircle className="size-3.5" />
          Rejected
        </span>
      )
    default:
      return null
  }
}
