"use server"

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

// সব পেমেন্টের তালিকা আনার জন্য।
export const getAllPayments = async (): Promise<IPayment[]> => {
  const res = await fetch(`${BASE_URL}/payments`, {
    cache: "no-store",
  })
  return res.json()
}
