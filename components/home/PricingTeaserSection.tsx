import React from "react"
import Link from "next/link"
import { Check, ArrowRight, Sparkles, GraduationCap, Briefcase, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * PricingTeaserSection Component
 *
 * Highlights the Student Pro ($10) and Tutor Pro ($15) upgrade tiers with core benefits,
 * encouraging users to upgrade and explore full comparison on /pricing.
 */
export default function PricingTeaserSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-muted/20 border-t">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-primary border-primary/20 bg-primary/5 rounded-full"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Flexible & Transparent Pricing
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Invest in Your Academic & Teaching Growth
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Whether you are a student aiming for top grades or a passionate educator expanding your batches,
            MentorLagbe offers dedicated Pro upgrades tailored for your success.
          </p>
        </div>

        {/* Pricing Cards Grid (Student $10 vs Tutor $15) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {/* 1. Pro Student Card */}
          <div className="relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Pro Student</h3>
                    <p className="text-xs text-muted-foreground">For Learners & Exam Aspirants</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 hover:bg-blue-600 text-white font-medium text-xs">
                  Best Value
                </Badge>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Fast-track your mentorship bookings, receive priority responses from top tutors, and stand out with verified credentials.
              </p>

              {/* Price display */}
              <div className="mt-6 flex items-baseline gap-1 border-b pb-6">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">$10</span>
                <span className="text-sm font-medium text-muted-foreground">/ one-time upgrade</span>
              </div>

              {/* Feature list */}
              <ul className="mt-6 space-y-3.5 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Priority Booking:</strong> Faster tutor review & application queue
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Verified Student Badge</strong> displayed to all prospective tutors
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Early Access</strong> to freshly published high-demand batches
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>Direct phone & schedule confirmation support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Upgrade to Pro Student</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. Pro Tutor Card */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-primary/50 bg-card p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary">
            {/* Top highlight ribbon */}
            <div className="absolute -top-3.5 right-6">
              <Badge className="bg-gradient-to-r from-amber-500 to-primary text-white font-semibold text-xs px-3 py-1 shadow-sm flex items-center gap-1">
                <Zap className="h-3 w-3 fill-current" /> Most Popular
              </Badge>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Pro Tutor</h3>
                    <p className="text-xs text-muted-foreground">For High-Performance Educators</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Remove listing limitations, reach thousands of active students across Bangladesh, and unlock verified educator trust.
              </p>

              {/* Price display */}
              <div className="mt-6 flex items-baseline gap-1 border-b pb-6">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">$15</span>
                <span className="text-sm font-medium text-muted-foreground">/ one-time upgrade</span>
              </div>

              {/* Feature list */}
              <ul className="mt-6 space-y-3.5 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Unlimited Tuition Posts</strong> (no 2-post free limitation)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Verified Tutor Badge</strong> on profile and all listing cards
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>
                    <strong>Featured Placement</strong> on search results and homepage
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span>Priority applicant notifications and dedicated educator support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Upgrade to Pro Tutor</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Comparison Link */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Want to see the side-by-side feature matrix or have billing questions?{" "}
            <Link
              href="/pricing"
              className="font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View Full Pricing Comparison & FAQs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
