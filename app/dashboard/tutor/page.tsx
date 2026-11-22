import React from "react"
import Link from "next/link"
import { headers } from "next/headers"
import {
  BookOpen,
  CheckCircle2,
  Users,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Layers,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { getApplications } from "@/lib/actions/applications"
import { getTutionApi } from "@/lib/api/getTuition"
import { IApplication, ITuition } from "@/types"

// এই পেজটি টিউটরকে তার মোট পোস্ট করা টিউশন, অ্যাক্টিভ ব্যাচ, মোট আবেদনকারী ও সাম্প্রতিক আবেদনের লাইভ পরিসংখ্যান দেখায়
const TutorDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const email = session?.user?.email
  const tutorName = session?.user?.name || "Tutor"
  const plan = session?.user?.plan || "free"

  // টিউটরের নিজস্ব টিউশনগুলো লোড করা
  let tutorTuitions: ITuition[] = []
  try {
    if (email) {
      const data = await getTutionApi(`tutorEmail=${email}`)
      tutorTuitions = Array.isArray(data?.tuitions) ? data.tuitions : []
    }
  } catch (err) {
    console.error("Error fetching tutor tuitions:", err)
  }

  // টিউটরের টিউশনে আসা আবেদনগুলো লোড করা
  const applicants: IApplication[] = email
    ? await getApplications({ tutorEmail: email })
    : []

  // পরিসংখ্যান হিসাব করা
  const totalTuitions = tutorTuitions.length
  const activeApproved = tutorTuitions.filter(
    (t) => t.approvalStatus === "approved" && t.isActive !== false
  ).length
  const totalApplicants = applicants.length

  // সাম্প্রতিক ৩টি আবেদন প্রিভিউয়ের জন্য
  const recentApplicants = applicants.slice(0, 3)

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* ১. ওয়েলকাম হেডার সেকশন */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <BookOpen className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Tutor Hub — {tutorName}
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your subject batches, review student applications, and expand
            your mentorship.
          </p>
        </div>

        {/* Post Tuition CTA */}
        <Link
          href="/dashboard/tutor/post-tuition"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
        >
          <PlusCircle className="size-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* ২. রিকোয়ারমেন্ট অনুযায়ী ৪টি স্ট্যাটাস কার্ড */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Card 1: Total Tuitions Posted */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Posted
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-foreground">
            {totalTuitions}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            All created tuition batches
          </p>
        </div>

        {/* Card 2: Active / Approved Tuitions */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Active & Approved
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {activeApproved}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Live and accepting students
          </p>
        </div>

        {/* Card 3: Total Applicants Received */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-blue-500/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Applicants
            </p>
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="size-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {totalApplicants}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Student application requests
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
              {plan === "pro" ? "PRO TUTOR" : "FREE PLAN"}
            </p>
          </div>
          {plan !== "pro" ? (
            <Link
              href="/pricing"
              className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              <span>Upgrade ($15 for Unlimited)</span>
              <ArrowRight className="size-3" />
            </Link>
          ) : (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              Unlimited posts & verified badge
            </p>
          )}
        </div>
      </div>

      {/* ৩. সাম্প্রতিক আবেদনকারী শিক্ষার্থীদের প্রিভিউ টেবিল */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Recent Student Applicants
            </h2>
          </div>
          {applicants.length > 0 && (
            <Link
              href="/dashboard/tutor/applicants"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Manage all ({applicants.length})
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs">
          {recentApplicants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border/80 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Tuition Batch
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Schedule
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
                  {recentApplicants.map((app) => (
                    <tr
                      key={app._id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">
                          {app.studentName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {app.studentEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-foreground">
                        {app.tuitionTitle}
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {app.preferredSchedule || "Flexible"}
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
                          href="/dashboard/tutor/applicants"
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <Users className="size-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                No applicants received yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                When students apply for your posted tuition batches, they will
                appear here.
              </p>
              <Link
                href="/dashboard/tutor/post-tuition"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
              >
                <PlusCircle className="size-3.5" />
                <span>Post a Tuition</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorDashboardPage
