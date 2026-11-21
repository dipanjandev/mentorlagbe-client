import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { getSession } from "@/lib/actions/server"

export async function POST(req: Request) {
  const userSession = await getSession()

  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    const { userRole } = await req.json()

    const priceId =
      userRole === "tutor"
        ? "price_1UeG0j6QsRcHJYqwXR5OUHoa" // MentorPro ($15)
        : "price_1UeG4L6QsRcHJYqwCE2p1Rr0" // StudentPro ($10)

    // ১. Stripe-এ নাম ও ইমেইলসহ একটি Customer তৈরি করা (যাতে Stripe ড্যাশবোর্ডে নাম দেখায়)
    const customer = await stripe.customers.create({
      email: userSession?.user.email,
      name: userSession?.user.name,
    })

    // ২. Checkout Session তৈরি করা
    const session = await stripe.checkout.sessions.create({
      customer: customer.id, // customer_email এর বদলে customer.id দিলে নাম+ইমেইল দুটোই পাবে
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      // ৩. সাকসেস পেজ ও ডাটাবেজে দেখানোর জন্য metadata-তে নাম ও ইমেইল রাখা
      metadata: {
        userRole,
        userName: userSession?.user.name as string,
        userEmail: userSession?.user.email as string,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
