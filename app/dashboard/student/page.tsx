import React from "react"
import Link from "next/link"
import { headers } from "next/headers"
import {
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { getApplications } from "@/lib/actions/applications"
import { IApplication } from "@/types"

// এই পেজটি স্টুডেন্টকে তার সর্বমোট আবেদন, গৃহীত ও অপেক্ষমান আবেদনের সংখ্যা এবং সাম্প্রতিক আবেদনের সারাংশ দেখায়
const StudentDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const email = session?.user?.email
  const userName = session?.user?.name || "Student"
  const plan = session?.user?.plan || "free"

  // স্টুডেন্টের সব আবেদন ফেচ করা
  const applications: IApplication[] = email
    ? await getApplications({ studentEmail: email })
    : []

  // পরিসংখ্যান হিসাব করা
  const totalApplied = applications.length
  const acceptedCount = applications.filter(
    (a) => a.status === "accepted"
  ).length
  const pendingCount = applications.filter((a) => a.status === "pending").length

  // সাম্প্রতিক ৩টি আবেদন প্রিভিউয়ের জন্য
  const recentApplications = applications.slice(0, 3)

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* ১. ওয়েলকাম হেডার সেকশন */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <GraduationCap className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {userName}!
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your tuition applications, session confirmations, and academic
            mentorships.
          </p>
        </div>

        {/* Browse Tuitions CTA */}
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
        >
          <BookOpen className="size-4" />
          <span>Browse Tuitions</span>
        </Link>
      </div>

      {/* ২. রিকোয়ারমেন্ট অনুযায়ী ৪টি স্ট্যাটাস কার্ড */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Card 1: Total Applied Tuitions */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Applied
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-foreground">
            {totalApplied}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Submitted tuition applications
          </p>
        </div>

        {/* Card 2: Accepted Applications */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Accepted
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {acceptedCount}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Confirmed tuition batches
          </p>
        </div>

        {/* Card 3: Pending Applications */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-amber-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Pending
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {pendingCount}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Awaiting tutor review
          </p>
        </div>

        {/* Card 4: Current Plan */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-amber-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Current Plan
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="size-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-2xl font-extrabold text-foreground uppercase">
              {plan === "pro" ? "PRO STUDENT" : "FREE PLAN"}
            </p>
          </div>
          {plan !== "pro" ? (
            <Link
              href="/pricing"
              className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              <span>Upgrade to Pro ($10)</span>
              <ArrowRight className="size-3" />
            </Link>
          ) : (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              Priority booking enabled
            </p>
          )}
        </div>
      </div>

      {/* ৩. সাম্প্রতিক আবেদনের সংক্ষিপ্ত টেবিল */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Recent Applications
            </h2>
          </div>
          {applications.length > 0 && (
            <Link
              href="/dashboard/student/my-applications"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all ({applications.length})
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs">
          {recentApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border/80 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">
                      Tuition Title
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Monthly Fee
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {recentApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {app.tuitionTitle}
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {app.subject}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-foreground">
                        ${app.monthlyFee}/mo
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                            app.status === "accepted"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : app.status === "rejected"
                                ? "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                : "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href="/dashboard/student/my-applications"
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <FileText className="size-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                No applications submitted yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Explore available tuition listings and apply for your academic
                batch today.
              </p>
              <Link
                href="/tuitions"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
              >
                <BookOpen className="size-3.5" />
                <span>Explore Tuitions</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardPage
