import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your Stripe subscription upgrade was successful.",
}

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
