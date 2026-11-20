import { headers } from "next/headers"
import {
  Users,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Inbox,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { getApplications } from "@/lib/actions/applications"
import { IApplication, TApplicationStatus } from "@/types"
import { ApplicationStatusActions } from "@/components/tutor/ApplicationStatusActions"

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

const ManageApplicantsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const email = session?.user?.email

  // টিউটরের ইমেইল দিয়ে তার টিউশনে আসা আবেদনগুলো লোড করা
  const applications: IApplication[] = email
    ? await getApplications({ tutorEmail: email })
    : []

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Student Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            Review student requests, check their preferred schedules, and
            respond.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold text-foreground">
          <Users className="size-3.5 text-primary" />
          <span>Total Requests: {applications.length}</span>
        </div>
      </div>

      {/* Empty State vs Applications Table */}
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card p-12 text-center shadow-xs">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Inbox className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No applications received yet
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            When students apply to your posted tuition batches, their details
            and contact info will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/60 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3.5">Student Info</th>
                  <th className="px-5 py-3.5">Applied Tuition</th>
                  <th className="px-5 py-3.5">Schedule & Note</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
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
                      {/* Student Name, Email & Phone */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {app.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {app.studentEmail}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-foreground">
                          <Phone className="size-3 text-primary" />
                          <span>{app.studentPhone}</span>
                        </p>
                      </td>

                      {/* Tuition Title & Fee */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">
                          {app.tuitionTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {app.subject} • ৳{app.monthlyFee?.toLocaleString()}/mo
                        </p>
                      </td>

                      {/* Preferred Schedule & Learning Note */}
                      <td className="max-w-xs px-5 py-4">
                        <p className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <Clock className="size-3 shrink-0 text-primary" />
                          <span>{app.preferredSchedule}</span>
                        </p>
                        {app.studentNote && (
                          <p className="mt-1 line-clamp-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                            <MessageSquare className="mt-0.5 size-3 shrink-0" />
                            <span>{app.studentNote}</span>
                          </p>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.className}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Accept / Reject Action Buttons */}
                      <td className="px-5 py-4 text-right">
                        <ApplicationStatusActions
                          id={app._id}
                          status={app.status}
                        />
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

export default ManageApplicantsPage
