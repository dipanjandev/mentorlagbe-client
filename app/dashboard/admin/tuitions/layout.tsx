import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tuition Approval & Monitoring",
  description: "Review newly posted tuition batches and manage listing approvals.",
}

export default function TuitionApprovalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
