"use client"

import React, { useEffect, useState } from "react"
import { DollarSign, CreditCard, Search, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { IPayment } from "@/types"
import { getAllPayments } from "@/lib/actions/payments"

const TransectionCountPage = () => {
  const [payments, setPayments] = useState<IPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true)
        const data = await getAllPayments()
        setPayments(data)
      } catch {
        toast.error("Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }
    loadPayments()
  }, [])

  // মোট আয় হিসাব করা (reduce দিয়ে সব amount যোগ করা)
  const totalRevenue = payments.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  )

  // ইমেইল, নাম বা ট্রানজেকশন আইডি দিয়ে সার্চ
  const filteredPayments = payments.filter(
    (p) =>
      p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Loading transactions...
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* ১. টোটাল রেভিনিউ ও ট্রানজেকশন কার্ড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">
              Total Revenue
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totalRevenue.toFixed(2)} USD
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-xs">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">
              Total Transactions
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {payments.length}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 text-blue-600 dark:text-blue-400">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* ২. হেডার ও সার্চ বার */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Payment Transactions
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            All verified Pro subscription payments via Stripe
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search email or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {/* ৩. পেমেন্ট টেবিল */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <th className="px-5 py-3.5">User</th>
              <th className="px-5 py-3.5">Plan</th>
              <th className="px-5 py-3.5">Amount</th>
              <th className="px-5 py-3.5">Transaction ID</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-border/60 transition-colors hover:bg-muted/40"
                >
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-semibold text-foreground">
                      {payment.userName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {payment.userEmail}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-purple-100 dark:bg-purple-950/50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300">
                      {payment.planName}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    ${payment.amount}
                  </td>

                  <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                    {payment.transactionId ||
                      payment.stripeSessionId?.slice(0, 18) + "..."}
                  </td>

                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 capitalize">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {payment.paymentStatus || "paid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransectionCountPage
