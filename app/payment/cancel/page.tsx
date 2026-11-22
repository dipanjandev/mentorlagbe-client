import React from "react"
import Link from "next/link"
import { AlertCircle, Home, Sparkles } from "lucide-react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 text-center shadow-lg">
          {/* Warning Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <AlertCircle className="size-10" />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Checkout Cancelled
          </h1>

          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            You were not charged. If you experienced any technical difficulty or
            want to explore our plans again, feel free to try whenever you are
            ready.
          </p>

          <div className="mt-6 rounded-xl border border-border/80 bg-muted/20 p-4 text-xs text-muted-foreground">
            <p>
              Free accounts continue to enjoy all baseline features including
              browsing and posting up to 2 tuitions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
            >
              <Sparkles className="size-3.5" />
              <span>Return to Pricing</span>
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted"
            >
              <Home className="size-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CancelPage
