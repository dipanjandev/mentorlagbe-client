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
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">
              Total Revenue
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">
              ${totalRevenue.toFixed(2)} USD
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">
              Total Transactions
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {payments.length}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* ২. হেডার ও সার্চ বার */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Payment Transactions
          </h1>
          <p className="mt-0.5 text-xs text-gray-500">
            All verified Pro subscription payments via Stripe
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search email or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-9 text-sm focus:ring-2 focus:ring-black/10 focus:outline-none"
          />
        </div>
      </div>

      {/* ৩. পেমেন্ট টেবিল */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold tracking-wider text-gray-600 uppercase">
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
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
                >
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-semibold text-gray-900">
                      {payment.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {payment.userEmail}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                      {payment.planName}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">
                    ${payment.amount}
                  </td>

                  <td className="px-5 py-3.5 font-mono text-xs text-gray-600">
                    {payment.transactionId ||
                      payment.stripeSessionId?.slice(0, 18) + "..."}
                  </td>

                  <td className="px-5 py-3.5 text-xs text-gray-500">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 capitalize">
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
