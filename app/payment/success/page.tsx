import React from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Home,
  LayoutDashboard,
} from "lucide-react"
import { verifyAndFulfillPayment } from "@/lib/actions/payment"
import NavBar from "@/components/NavBar"

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center shadow-md">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="size-6" />
            </div>
            <h1 className="mt-4 text-xl font-bold text-foreground">
              Missing Payment Session
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              No valid Stripe session ID was found. If you completed a payment,
              please check your email or contact support.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/pricing"
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Return to Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Verify the session and fulfill database records
  const result = await verifyAndFulfillPayment(session_id)

  if (!result.success || !result.payment) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center shadow-md">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="size-6" />
            </div>
            <h1 className="mt-4 text-xl font-bold text-foreground">
              Payment Verification Failed
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              {result.error ||
                "We could not verify your payment with Stripe. Please check your bank statement or contact support."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/pricing"
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { payment } = result
  const dashboardLink =
    payment.userRole === "tutor" ? "/dashboard/tutor" : "/dashboard/student"

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-border/80 bg-card p-8 shadow-lg">
          {/* Top Checkmark Header */}
          <div className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-10" />
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>Payment Verified & Pro Active</span>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Congratulations! You are now Pro
            </h1>

            <p className="mt-1.5 text-xs text-muted-foreground">
              Your subscription upgrade has been confirmed and updated in your
              account.
            </p>
          </div>

          {/* Unlocked Benefits Banner */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <ShieldCheck className="size-4" />
              <span>Unlocked Pro Privileges:</span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {payment.userRole === "tutor"
                ? "You now have unlimited tuition posting privileges, verified tutor status, and prioritized visibility."
                : "Your tuition applications now receive priority booking review with an official verified student badge."}
            </p>
          </div>

          {/* Receipt / Transaction Details */}
          <div className="mt-6 space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4 text-xs">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Subscribed Plan</span>
              <span className="font-bold text-foreground">
                {payment.planName}
              </span>
            </div>

            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-foreground">
                ${payment.amount} {payment.currency?.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Payment Status</span>
              <span className="font-semibold text-emerald-600 capitalize dark:text-emerald-400">
                {payment.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-[11px] text-foreground">
                {payment.transactionId?.slice(0, 20)}...
              </span>
            </div>

            <div className="flex justify-between pt-0.5">
              <span className="text-muted-foreground">Subscriber Email</span>
              <span className="font-medium text-foreground">
                {payment.userEmail}
              </span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={dashboardLink}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <LayoutDashboard className="size-4" />
              <span>Go to Your Dashboard</span>
              <ArrowRight className="size-3.5" />
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-semibold text-foreground transition hover:bg-muted"
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
