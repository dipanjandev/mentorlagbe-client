"use server"

import { stripe } from "@/lib/stripe"
import { getDatabase } from "@/lib/db"
import { IPayment } from "@/types"

export interface VerifyPaymentResult {
  success: boolean
  alreadyFulfilled?: boolean
  error?: string
  payment?: IPayment
}

/**
 * Verifies a Stripe Checkout Session by ID, updates the user's plan to 'pro'
 * in the MongoDB 'user' collection, and records the transaction in the 'payments' collection.
 * Idempotent: safe against multiple page refreshes.
 */
export async function verifyAndFulfillPayment(
  sessionId: string
): Promise<VerifyPaymentResult> {
  if (!sessionId) {
    return { success: false, error: "Payment Session ID is missing." }
  }

  try {
    // স্ট্রাইপ থেকে সেশনটি আনা হল।
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || session.payment_status !== "paid") {
      return {
        success: false,
        error: "Payment was not marked as paid by Stripe.",
      }
    }

    const metadata = session.metadata || {}
    const userRole = (metadata.userRole as "student" | "tutor") || "student"
    const userEmail =
      (metadata.userEmail as string) ||
      (session.customer_details?.email as string) ||
      ""
    const userName =
      (metadata.userName as string) ||
      (session.customer_details?.name as string) ||
      "MentorLagbe Member"

    const planName = userRole === "tutor" ? "Pro Tutor" : "Pro Student"
    const amount = session.amount_total
      ? session.amount_total / 100
      : userRole === "tutor"
        ? 15
        : 10
    const currency = session.currency || "usd"
    const transactionId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.id

    const db = await getDatabase()
    const paymentsCollection = db.collection("payments")
    const usersCollection = db.collection("user")

    // চেক হচ্ছে যে ট্রানজেকশনটি কি হয়ে গেছে না কি হয় নাই।
    const existingPayment = await paymentsCollection.findOne({
      stripeSessionId: session.id,
    })

    if (existingPayment) {
      return {
        success: true,
        alreadyFulfilled: true,
        payment: {
          _id: existingPayment._id.toString(),
          userEmail: existingPayment.userEmail,
          userName: existingPayment.userName,
          userRole: existingPayment.userRole,
          planName: existingPayment.planName,
          amount: existingPayment.amount,
          currency: existingPayment.currency,
          transactionId: existingPayment.transactionId,
          stripeSessionId: existingPayment.stripeSessionId,
          paymentStatus: existingPayment.paymentStatus,
          paidAt: existingPayment.paidAt
            ? existingPayment.paidAt.toString()
            : new Date().toISOString(),
        },
      }
    }

    // পেমেন্ট কালেকশন এর মধ্যে ঢুকিয়ে দেয়া হচ্ছে।
    const newPaymentDoc = {
      userEmail,
      userName,
      userRole,
      planName,
      amount,
      currency,
      transactionId,
      stripeSessionId: session.id,
      paymentStatus: "paid" as const,
      paidAt: new Date(),
    }

    const insertResult = await paymentsCollection.insertOne(newPaymentDoc)

    // ফ্রি ভার্সন থেকে প্রো তে কনভার্ট করা হচ্ছে।
    if (userEmail) {
      await usersCollection.updateOne(
        { email: userEmail },
        {
          $set: {
            plan: "pro",
            updatedAt: new Date(),
          },
        }
      )
    }

    return {
      success: true,
      alreadyFulfilled: false,
      payment: {
        _id: insertResult.insertedId.toString(),
        userEmail,
        userName,
        userRole,
        planName,
        amount,
        currency,
        transactionId,
        stripeSessionId: session.id,
        paymentStatus: "paid",
        paidAt: newPaymentDoc.paidAt.toISOString(),
      },
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error("Payment verification and fulfillment error:", error)
    return { success: false, error: error.message }
  }
}
