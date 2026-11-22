import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post New Tuition",
  description: "Create and publish a new tuition batch or 1-on-1 mentorship listing.",
}

export default function PostTuitionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
