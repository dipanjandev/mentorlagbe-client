import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { getApplications } from "@/lib/actions/applications"
import { IApplication, TApplicationStatus } from "@/types"

export const metadata: Metadata = {
  title: "My Applications",
  description: "Review and manage all your submitted tuition applications.",
}

const statusStyles: Record<
  TApplicationStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    icon: <Clock className="size-3.5" />,
  },
  accepted: {
    label: "Accepted",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    icon: <CheckCircle2 className="size-3.5" />,
  },
  rejected: {
    label: "Rejected",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
    icon: <XCircle className="size-3.5" />,
  },
}

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const email = session?.user?.email

  // ২. সরাসরি await করে ডেটা লোড করা এবং টাইপ ডিক্লিয়ার করা।
  const applications: IApplication[] = await getApplications({
    studentEmail: email,
  })

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            Track the status of your submitted tuition and mentorship requests.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold text-foreground">
          <FileText className="size-3.5 text-primary" />
          <span>Total Applied: {applications.length}</span>
        </div>
      </div>

      {/* Empty State vs Data Table */}
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card p-12 text-center shadow-xs">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpen className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No applications yet
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            You haven&apos;t applied to any tuition batches yet. Explore
            available mentors and apply to get started.
          </p>
          <Link
            href="/tuitions"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            <span>Browse Tuitions</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/60 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3.5">Tuition & Schedule</th>
                  <th className="px-5 py-3.5">Subject</th>
                  <th className="px-5 py-3.5">Monthly Fee</th>
                  <th className="px-5 py-3.5">Applied On</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {applications.map((app) => {
                  const badge = statusStyles[app.status] || statusStyles.pending

                  return (
                    <tr
                      key={app._id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {app.tuitionTitle}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3 shrink-0" />
                          <span>{app.preferredSchedule}</span>
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-lg border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                          {app.subject}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-foreground">
                        ৳{app.monthlyFee?.toLocaleString()}
                        <span className="text-xs font-normal text-muted-foreground">
                          /mo
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {app.appliedAt ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            {new Date(app.appliedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.className}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/tuitions/${app.tuitionId}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                        >
                          <span>View</span>
                          <ExternalLink className="size-3" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApplicationsPage
