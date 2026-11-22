import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing & Pro Plans",
  description: "Upgrade your learning or teaching journey with MentorLagbe Pro subscriptions.",
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
