import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "Your Stripe payment checkout was cancelled.",
}

export default function PaymentCancelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
