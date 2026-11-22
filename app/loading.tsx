import React from "react"
import { Loader2, Sparkles } from "lucide-react"

// গ্লোবাল লোডিং পেজ (Next.js Suspense এর মাধ্যমে ডেটা ফেচিং এর সময় স্মুথভাবে প্রদর্শিত হয়)
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="relative flex flex-col items-center gap-6">
        {/* লোগো ও পালসিং স্পিনার ব্যাকগ্রাউন্ড */}
        <div className="relative flex size-20 items-center justify-center">
          {/* অ্যানিমেটেড পালস রিং */}
          <span className="absolute size-20 animate-ping rounded-full bg-primary/20 duration-1000"></span>
          <span className="absolute size-16 rounded-full bg-primary/10"></span>

          {/* সেন্টার স্পিনার আইকন */}
          <div className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Loader2 className="size-6 animate-spin" />
          </div>
        </div>

        {/* টেক্সট ও ব্র্যান্ড মেসেজ */}
        <div className="space-y-1.5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-primary">
            <Sparkles className="size-4" />
            <span>MentorLagbe</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Loading Content...
          </h2>
          <p className="max-w-xs text-xs text-muted-foreground sm:text-sm">
            Please hold on a moment while we fetch the latest tuitions and records.
          </p>
        </div>

        {/* স্কেলিটন প্রগ্রেস অ্যানিমেশন বার */}
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-24 animate-[shimmer_1.5s_infinite] rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  )
}
