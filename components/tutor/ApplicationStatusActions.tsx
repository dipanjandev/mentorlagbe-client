"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { updateApplicationStatus } from "@/lib/actions/applications"
import { TApplicationStatus } from "@/types"
import { Button } from "@/components/ui/button"

export function ApplicationStatusActions({
  id,
  status,
}: {
  id: string
  status: TApplicationStatus
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: "accepted" | "rejected") => {
    setLoading(true)
    try {
      const res = await updateApplicationStatus(id, newStatus)
      if (res.modifiedCount > 0) {
        toast.success(`Application ${newStatus}!`)
        router.refresh() // সার্ভার কম্পোনেন্টের ডেটা রিফ্রেশ করবে
      }
    } catch {
      toast.error("Failed to update status")
    } finally {
      setLoading(false)
    }
  }

  // স্ট্যাটাস আগেই বদলে গেলে আর বাটন দেখাবে না
  if (status !== "pending") {
    return <span className="text-xs text-muted-foreground">Action taken</span>
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        disabled={loading}
        onClick={() => handleStatusChange("accepted")}
        className="h-8 gap-1 rounded-lg bg-emerald-600 text-xs hover:bg-emerald-700"
      >
        <Check className="size-3.5" /> Accept
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={loading}
        onClick={() => handleStatusChange("rejected")}
        className="h-8 gap-1 rounded-lg text-xs"
      >
        <X className="size-3.5" /> Reject
      </Button>
    </div>
  )
}
