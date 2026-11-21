import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { getSession } from "@/lib/actions/server"

export async function POST(req: Request) {
  const userSession = await getSession()

  // ১. ইউজার অথেনটিকেটেড কি না চেক (Strict Auth Guard)
  if (!userSession?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to upgrade." },
      { status: 401 }
    )
  }

  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    const body = await req.json().catch(() => ({}))
    const userRole = body.userRole || userSession.user.role || "student"

    const priceId =
      userRole === "tutor"
        ? "price_1UeG0j6QsRcHJYqwXR5OUHoa" // MentorPro ($15)
        : "price_1UeG4L6QsRcHJYqwCE2p1Rr0" // StudentPro ($10)

    // ২. Stripe-এ কাস্টমার তৈরি করা (নাম এবং ইমেইলসহ)
    const customer = await stripe.customers.create({
      email: userSession.user.email,
      name: userSession.user.name || undefined,
    })

    // ৩. Checkout Session তৈরি করা
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      // ৪. ডাটাবেজ আপডেট ও হিস্ট্রির জন্য metadata-তে প্রয়োজনীয় তথ্য রাখা
      metadata: {
        userRole,
        userName: userSession.user.name || "MentorLagbe User",
        userEmail: userSession.user.email,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error("Stripe Checkout Session creation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
