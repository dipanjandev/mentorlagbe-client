import React from "react"
import { Check, X, ShieldCheck } from "lucide-react"

interface PricingComparisonTableProps {
  role?: "tutor" | "student" | "admin" | "all"
}

export const PricingComparisonTable: React.FC<PricingComparisonTableProps> = ({
  role = "all",
}) => {
  const showTutor = role === "all" || role === "tutor" || role === "admin"
  const showStudent = role === "all" || role === "student" || role === "admin"

  return (
    <div className="space-y-12">
      {/* 1. Tutor Plans Comparison Matrix */}
      {showTutor && (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
          <div className="border-b border-border/80 bg-muted/40 px-6 py-4">
            <h3 className="text-base font-bold text-foreground">
              Tutor Plans: Free vs. Pro Tutor ($15/mo)
            </h3>
            <p className="text-xs text-muted-foreground">
              Compare capabilities designed to help educators grow their mentorship batches.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20 font-semibold text-foreground">
                  <th className="py-3.5 pr-4 pl-6">Core Capabilities</th>
                  <th className="px-6 py-3.5 text-center">Free Tutor ($0)</th>
                  <th className="px-6 py-3.5 text-center text-primary">Pro Tutor ($15/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Tuition Post Limit
                  </td>
                  <td className="px-6 py-3.5 text-center font-medium">Max 2 Posts</td>
                  <td className="px-6 py-3.5 text-center font-bold text-primary">
                    Unlimited Posts
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Verified Tutor Badge
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <X className="mx-auto size-4 text-muted-foreground/40" />
                  </td>
                  <td className="px-6 py-3.5 text-center text-primary">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <ShieldCheck className="size-4" />
                      <span>Verified Badge</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Featured Search Placement
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <X className="mx-auto size-4 text-muted-foreground/40" />
                  </td>
                  <td className="px-6 py-3.5 text-center text-primary">
                    <Check className="mx-auto size-4" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Student Applicant Management
                  </td>
                  <td className="px-6 py-3.5 text-center">Standard Accept/Reject</td>
                  <td className="px-6 py-3.5 text-center font-medium text-foreground">
                    Priority Management & Instant Notifications
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Platform Fee / Commission
                  </td>
                  <td className="px-6 py-3.5 text-center">0% Commission</td>
                  <td className="px-6 py-3.5 text-center font-medium text-primary">
                    0% Commission
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Student Plans Comparison Matrix */}
      {showStudent && (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
          <div className="border-b border-border/80 bg-muted/40 px-6 py-4">
            <h3 className="text-base font-bold text-foreground">
              Student Plans: Free vs. Pro Student ($10/mo)
            </h3>
            <p className="text-xs text-muted-foreground">
              Compare student features for fast-track booking and academic guidance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20 font-semibold text-foreground">
                  <th className="py-3.5 pr-4 pl-6">Core Capabilities</th>
                  <th className="px-6 py-3.5 text-center">Free Student ($0)</th>
                  <th className="px-6 py-3.5 text-center text-primary">Pro Student ($10/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Browse & Search Approved Tuitions
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <Check className="mx-auto size-4 text-foreground" />
                  </td>
                  <td className="px-6 py-3.5 text-center text-primary">
                    <Check className="mx-auto size-4" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Application Review Queue
                  </td>
                  <td className="px-6 py-3.5 text-center font-medium">Standard Queue</td>
                  <td className="px-6 py-3.5 text-center font-bold text-primary">
                    Priority Booking Queue
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Verified Student Badge
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <X className="mx-auto size-4 text-muted-foreground/40" />
                  </td>
                  <td className="px-6 py-3.5 text-center text-primary">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <ShieldCheck className="size-4" />
                      <span>Verified Badge</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Real-time Application Status
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <Check className="mx-auto size-4 text-foreground" />
                  </td>
                  <td className="px-6 py-3.5 text-center text-primary">
                    <Check className="mx-auto size-4" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 pl-6 font-medium text-foreground">
                    Dedicated Academic Support
                  </td>
                  <td className="px-6 py-3.5 text-center">Community</td>
                  <td className="px-6 py-3.5 text-center font-medium text-foreground">
                    Priority Helpdesk
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
