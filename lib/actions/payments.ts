"use server"

import { authFetch } from "./server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface IPayment {
  _id: string
  userEmail: string
  userName: string
  userRole: "student" | "tutor"
  planName: string
  amount: number
  currency: string
  transactionId: string
  stripeSessionId: string
  paymentStatus: "paid"
  paidAt: string
}

// প্ল্যাটফর্মের সব স্ট্রাইপ পেমেন্টের তালিকা আনার জন্য
export const getAllPayments = async (): Promise<IPayment[]> => {
  try {
    const res = await authFetch(`${BASE_URL}/payments`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching payments:", error)
    return []
  }
}
