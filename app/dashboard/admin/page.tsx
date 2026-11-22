import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  CreditCard,
  Clock,
} from "lucide-react"
import { getAllUsers, IUser } from "@/lib/actions/users"
import { getTutionApi } from "@/lib/api/getTuition"
import { getAllPayments } from "@/lib/actions/payments"
import { ITuition, IPayment } from "@/types"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Platform-wide governance, analytics, and revenue management.",
}

// এই পেজটি এডমিনকে পুরো প্ল্যাটফর্মের ইউজার, টিউটর, টিউশন অ্যাপ্রুভাল স্ট্যাটাস এবং মোট আয়ের সারাংশ দেখায়
const AdminDashboardPage = async () => {
  // ডাটা ফেচিং
  let allUsers: IUser[] = []
  let allTuitions: ITuition[] = []
  let allPayments: IPayment[] = []

  try {
    // promise.all দিয়ে একই সময়ে ৩টি ব্যাকএন্ড রাউটে রিকোয়েস্ট পাঠানো হয়।
    const [usersData, tuitionsData, paymentsData] = await Promise.all([
      // ব্যাকএন্ড থেকে ডাটা আসে এপিআই এর মাধ্যমে আগে আমরা যে এপিআই বানিয়ে রেখেছিলাম।
      getAllUsers().catch(() => []),
      getTutionApi("isAdmin=true").catch(() => ({ tuitions: [] })),
      getAllPayments().catch(() => []),
    ])
    allUsers = Array.isArray(usersData) ? usersData : []
    allTuitions = Array.isArray(tuitionsData?.tuitions)
      ? tuitionsData.tuitions
      : []
    allPayments = Array.isArray(paymentsData) ? paymentsData : []
  } catch (err) {
    console.error("Error loading admin overview:", err)
  }

  // পরিসংখ্যান হিসাব করা
  const totalUsers = allUsers.length
  const totalTutors = allUsers.filter((u) => u.role === "tutor").length
  const totalStudents = allUsers.filter((u) => u.role === "student").length

  const pendingTuitions = allTuitions.filter(
    (t) => !t.approvalStatus || t.approvalStatus === "pending"
  ).length
  const approvedTuitions = allTuitions.filter(
    (t) => t.approvalStatus === "approved"
  ).length

  const totalRevenue = allPayments.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  )

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* ১. ওয়েলকাম হেডার সেকশন */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <ShieldCheck className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Admin Platform Oversight
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor users, moderate tuition batches, and track Stripe
            subscription revenue.
          </p>
        </div>

        {/* Pending Tuitions Alert Badge */}
        {pendingTuitions > 0 && (
          <Link
            href="/dashboard/admin/tuitions"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-500/20 dark:text-amber-400"
          >
            <Clock className="size-4 animate-spin text-amber-600 dark:text-amber-400" />
            <span>{pendingTuitions} Pending Tuitions to Review</span>
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>

      {/* ২. রিকোয়ারমেন্ট অনুযায়ী ৪টি প্ল্যাটফর্ম পরিসংখ্যান কার্ড */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Card 1: Total Platform Users */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Users
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-foreground">
            {totalUsers}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {totalStudents} students & {totalTutors} tutors
          </p>
        </div>

        {/* Card 2: Total Tutors */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-blue-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Tutors
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GraduationCap className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {totalTutors}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Registered educator accounts
          </p>
        </div>

        {/* Card 3: Pending vs Approved Tuitions */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Tuitions (Live/Pending)
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="size-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {approvedTuitions}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              / {pendingTuitions} pending
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {allTuitions.length} total posts submitted
          </p>
        </div>

        {/* Card 4: Total Stripe Revenue */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-amber-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Stripe Revenue
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <DollarSign className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            ${totalRevenue.toFixed(2)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {allPayments.length} paid subscription transactions
          </p>
        </div>
      </div>

      {/* ৩. এডমিন ম্যানেজমেন্ট কুইক হাব */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Platform Administration Hub
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Action 1: User Management */}
          <Link
            href="/dashboard/admin/users"
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition hover:border-primary/40 hover:shadow-xs"
          >
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-105">
                <Users className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">
                User Management
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Inspect platform accounts, change roles (Student, Tutor, Admin),
                and manage permissions.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span>Manage users ({totalUsers})</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Action 2: Tuition Moderation */}
          <Link
            href="/dashboard/admin/tuitions"
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition hover:border-primary/40 hover:shadow-xs"
          >
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition group-hover:scale-105 dark:text-amber-400">
                <CheckSquare className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">
                Tuition Approval
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Review submitted batches, check tutor availability, and approve
                or reject listings.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Review posts ({allTuitions.length})</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Action 3: Stripe Transactions */}
          <Link
            href="/dashboard/admin/transactions"
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition hover:border-primary/40 hover:shadow-xs"
          >
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition group-hover:scale-105 dark:text-emerald-400">
                <CreditCard className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">
                Transactions
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                View verified Stripe Checkout payment records for Tutor and
                Student Pro upgrades.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>View revenue logs</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
