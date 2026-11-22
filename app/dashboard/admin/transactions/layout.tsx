import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Transaction History",
  description: "Inspect Stripe revenue transactions and subscription upgrade logs.",
}

export default function AdminTransactionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
