import React from "react"
import Link from "next/link"
import { ShieldAlert, Home, LogIn } from "lucide-react"

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xs sm:p-10">
        {/* সতর্কবার্তা আইকন ব্যাজ */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400">
          <ShieldAlert className="size-8" />
        </div>

        {/* 403 স্ট্যাটাস ব্যাজ */}
        <div className="mt-5 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-red-600 uppercase dark:text-red-400">
          403 • Access Denied
        </div>

        {/* শিরোনাম ও বর্ণনা */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          You are not authorized
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page. The route
          you tried to open does not match your current account role.
        </p>

        {/* নেভিগেশন বাটন */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-2xs transition hover:opacity-90"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <LogIn className="size-4" />
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
