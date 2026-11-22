import React from "react"
import Link from "next/link"
import { Home, BookOpen, Compass } from "lucide-react"

// কাস্টম 404 Not Found পেজ (রিকোয়ারমেন্ট অনুযায়ী 'Back to Home' বাটন সহ)
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {/* ৪-০-৪ ভিজ্যুয়াল ব্যাজ */}
        <div className="relative mb-6 flex size-24 items-center justify-center rounded-3xl border border-primary/20 bg-primary/5 text-primary shadow-sm sm:size-28">
          <Compass className="size-12 animate-[spin_10s_linear_infinite] sm:size-14" />
          <span className="absolute -bottom-2.5 rounded-full border border-border/80 bg-card px-3 py-0.5 text-xs font-extrabold uppercase tracking-widest text-primary shadow-xs">
            404 Error
          </span>
        </div>

        {/* হেডিং ও বিবরণ */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Oops! The page you are looking for does not exist, has been removed, or the link might be broken.
        </p>

        {/* নেভিগেশন অ্যাকশন বাটনসমূহ (Back to Home আবশ্যক) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Back to Home Button (Required by Spec) */}
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>

          {/* Browse Tuitions Button */}
          <Link
            href="/tuitions"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-input bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <BookOpen className="size-4 text-muted-foreground" />
            <span>Browse Tuitions</span>
          </Link>
        </div>

        {/* হেল্প টেক্সট */}
        <div className="mt-12 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            Looking for something specific? Return to{" "}
            <Link href="/" className="font-semibold text-primary underline underline-offset-4">
              MentorLagbe Home
            </Link>{" "}
            or contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}
