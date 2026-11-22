"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

// কাস্টম গ্লোবাল এরর বাউন্ডারি পেজ (রিকোয়ারমেন্ট অনুযায়ী 'Back to Home' বাটন সহ)
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // কনসোলে এরর লগ করা
    console.error("Global application error caught:", error)
  }, [error])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {/* এরর আইকন কন্টেইনার */}
        <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/10 text-destructive shadow-sm sm:size-24">
          <AlertTriangle className="size-10 sm:size-12" />
        </div>

        {/* হেডিং ও বিবরণ */}
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Something went wrong!
        </h1>
        <p className="mt-2.5 text-sm text-muted-foreground">
          An unexpected error occurred while processing your request. Please try reloading or head back to safety.
        </p>

        {/* এরর ডাইজেস্ট (যদি ডেভেলপমেন্টে পাওয়া যায়) */}
        {error?.digest && (
          <p className="mt-2 rounded-md bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        {/* অ্যাকশন বাটনসমূহ (Back to Home ও Try Again) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Try Again Button */}
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            <RotateCcw className="size-4" />
            <span>Try Again</span>
          </button>

          {/* Back to Home Button (Required by Spec) */}
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-input bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <Home className="size-4 text-muted-foreground" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
