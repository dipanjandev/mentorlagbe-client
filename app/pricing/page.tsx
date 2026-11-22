"use client"

import React, { useState } from "react"
import { Sparkles, ShieldCheck, Zap, UserCheck, ShieldAlert } from "lucide-react"
import { PricingCard, PricingPlan } from "@/components/pricing/PricingCard"
import { PricingComparisonTable } from "@/components/pricing/PricingComparisonTable"
import { PricingFAQ } from "@/components/pricing/PricingFAQ"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Pricing plans configured strictly from MentorLagbe requirements
const PRICING_PLANS: PricingPlan[] = [
  // 1. Free Tutor
  {
    id: "free-tutor",
    name: "Free Tutor",
    role: "tutor",
    roleLabel: "For Tutors",
    price: 0,
    description:
      "Ideal for individual tutors getting started with basic tuition listings.",
    buttonText: "Current Plan",
    features: [
      { text: "Post up to 2 Tuitions", included: true },
      { text: "Standard Applicant Review Dashboard", included: true },
      { text: "Full CRUD on Created Batches", included: true },
      { text: "Active / Closed Availability Switch", included: true },
      { text: "Verified Tutor Badge", included: false },
      { text: "Unlimited Tuition Posts", included: false },
      { text: "Featured Placement on Search & Home", included: false },
    ],
  },
  // 2. Pro Tutor ($15)
  {
    id: "pro-tutor",
    name: "Pro Tutor",
    role: "tutor",
    roleLabel: "For Tutors",
    price: 15,
    description:
      "For passionate educators looking to scale unlimited batches with verified trust.",
    isPopular: true,
    badgeText: "Recommended for Tutors",
    buttonText: "Upgrade to Pro Tutor ($15)",
    features: [
      { text: "Unlimited Tuition Posts (No 2-post limit)", included: true },
      { text: "Verified Tutor Badge on Profile & Cards", included: true },
      { text: "Featured Placement on Search & Homepage", included: true },
      { text: "Priority Student Applicant Notifications", included: true },
      { text: "Full CRUD on Created Batches", included: true },
      { text: "Active / Closed Availability Switch", included: true },
      { text: "Dedicated Priority Support", included: true },
    ],
  },
  // 3. Free Student
  {
    id: "free-student",
    name: "Free Student",
    role: "student",
    roleLabel: "For Students",
    price: 0,
    description:
      "Browse subject mentors and apply for your desired tuition batches.",
    buttonText: "Get Started Free",
    features: [
      { text: "Browse & Search Approved Tuitions", included: true },
      { text: "Multi-parameter Subject & Mode Filtering", included: true },
      { text: "Apply for Tuitions (Duplicate Prevention)", included: true },
      { text: "Track Application Status in Dashboard", included: true },
      { text: "Cancel Pending Applications", included: true },
      { text: "Priority Booking & Fast Response Guarantee", included: false },
      { text: "Verified Student Badge", included: false },
    ],
  },
  // 4. Pro Student ($10)
  {
    id: "pro-student",
    name: "Pro Student",
    role: "student",
    roleLabel: "For Students",
    price: 10,
    description:
      "Fast-track your mentorship bookings and receive priority tutor attention.",
    isPopular: true,
    badgeText: "Best for Students",
    buttonText: "Upgrade to Pro Student ($10)",
    features: [
      {
        text: "Priority Booking & Fast Tutor Response Guarantee",
        included: true,
      },
      { text: "Verified Student Badge on Applications", included: true },
      { text: "Browse & Search Approved Tuitions", included: true },
      { text: "Multi-parameter Subject & Mode Filtering", included: true },
      { text: "Unlimited Priority Applications", included: true },
      { text: "Early Access to Newly Opened Batches", included: true },
      { text: "Dedicated Academic Support", included: true },
    ],
  },
]

const PricingPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // User session details
  const userRole = session?.user?.role as "student" | "tutor" | "admin" | undefined
  const userPlan = session?.user?.plan || "free"
  const userName = session?.user?.name
  const isAdmin = userRole === "admin"
  const isTutor = userRole === "tutor"
  const isStudent = userRole === "student"
  const isGuest = !session?.user

  // Tab filter: only used for Guests and Admins
  const [selectedRole, setSelectedRole] = useState<"all" | "tutor" | "student">(
    "all"
  )

  // 1. Role-based Conditional Filtering:
  // - Students see strictly Student plans (2 cards)
  // - Tutors see strictly Tutor plans (2 cards)
  // - Admins and Guests can see all or use the role switcher tabs
  const plansToDisplay = isTutor
    ? PRICING_PLANS.filter((p) => p.role === "tutor")
    : isStudent
      ? PRICING_PLANS.filter((p) => p.role === "student")
      : PRICING_PLANS.filter((plan) => {
          if (selectedRole === "all") return true
          return plan.role === selectedRole
        })

  // Stripe Checkout Handler
  const handleStripeCheckout = async (plan: PricingPlan) => {
    // ১. এডমিন চেক: এডমিনদের কোনো সাবস্ক্রিপশন প্রয়োজন নেই
    if (isAdmin) {
      toast.info("Admin accounts have full platform access and do not require subscriptions.")
      return
    }

    // ২. ফ্রি প্ল্যানে পেমেন্ট দরকার নেই
    if (plan.price === 0) {
      toast.info(`You are viewing the ${plan.name} tier.`)
      return
    }

    // ৩. ইউজার লগইন করা আছে কি না চেক
    if (!session?.user) {
      toast.error("Please sign in first to upgrade your plan.")
      router.push("/sign-in")
      return
    }

    // ৪. রোল অনুযায়ী সঠিক প্ল্যান কি না চেক
    if (session.user.role !== plan.role) {
      toast.error(`This plan is only available for ${plan.role}s.`)
      return
    }

    // ৫. ইতিমধ্যেই Pro কি না চেক
    if (userPlan === "pro") {
      toast.info("You are already on the Pro plan!")
      return
    }

    try {
      toast.loading("Connecting to Stripe Checkout...")

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userRole: session.user.role,
          userEmail: session.user.email,
          userName: session.user.name,
        }),
      })

      const data = await res.json()
      toast.dismiss()

      // Stripe URL-এ রিডাইরেক্ট করা
      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.error(data?.error || "Failed to create checkout session")
      }
    } catch {
      toast.dismiss()
      toast.error("Something went wrong while connecting to Stripe.")
    }
  }

  // Dynamic Grid Class: Centered 2-column for single role, 4-column for All
  const isTwoCardLayout = isTutor || isStudent || selectedRole !== "all"
  const gridContainerClass = isTwoCardLayout
    ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <NavBar />

      {/* 1. Hero Header Section with Conditional Greeting */}
      <section className="relative overflow-hidden border-b border-border/80 bg-muted/20 py-16 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Conditional Role Badge */}
          {isAdmin ? (
            <Badge
              variant="outline"
              className="gap-1.5 border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
            >
              <ShieldAlert className="size-3.5" />
              <span>Admin Platform Oversight (Inspection Mode)</span>
            </Badge>
          ) : isTutor ? (
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary"
            >
              <UserCheck className="size-3.5" />
              <span>Tutor Membership Plans</span>
            </Badge>
          ) : isStudent ? (
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary"
            >
              <UserCheck className="size-3.5" />
              <span>Student Academic Plans</span>
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary"
            >
              <Sparkles className="size-3.5" />
              <span>Simple, Transparent Pricing</span>
            </Badge>
          )}

          {/* Conditional Heading */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {isAdmin
              ? "All Platform Pricing & Subscription Plans"
              : isTutor
                ? `Welcome, ${userName || "Tutor"} — Scale Your Mentorship`
                : isStudent
                  ? `Welcome, ${userName || "Student"} — Accelerate Your Learning`
                  : "Upgrade Your Learning & Teaching Experience"}
          </h1>

          {/* Conditional Subtitle */}
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            {isAdmin
              ? "Viewing all tutor and student subscription plans. Admin accounts have full management oversight across the platform."
              : isTutor
                ? "Upgrade to Pro Tutor ($15/mo) to unlock unlimited tuition listings, verified educator badge, and priority student applicants."
                : isStudent
                  ? "Upgrade to Pro Student ($10/mo) for priority booking review guarantee, verified student status, and dedicated assistance."
                  : "No hidden fees. Free tier available for everyone. Upgrade to Pro via Stripe to unlock unlimited posts, verified badges, and priority booking."}
          </p>

          {/* Role Filter Tabs (Only shown for Guests and Admins) */}
          {(isGuest || isAdmin) && (
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedRole("all")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    selectedRole === "all"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Plans
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("tutor")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    selectedRole === "tutor"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  For Tutors ($15/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("student")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    selectedRole === "student"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  For Students ($10/mo)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Pricing Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className={gridContainerClass}>
          {plansToDisplay.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handleStripeCheckout}
              isAdmin={isAdmin}
              currentUserRole={userRole}
              currentUserPlan={userPlan}
            />
          ))}
        </div>
      </section>

      {/* 3. Feature Highlights Banner */}
      <section className="border-y border-border/80 bg-muted/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Verified Trust
              </h3>
              <p className="text-xs text-muted-foreground">
                Pro members receive an official verification badge to foster trusted academic mentorship.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="size-5" />
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Stripe Hosted Checkout
              </h3>
              <p className="text-xs text-muted-foreground">
                Seamless, bank-level encrypted checkout redirected straight to Stripe official portal.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Cancel Anytime
              </h3>
              <p className="text-xs text-muted-foreground">
                Freedom to cancel subscriptions easily with zero penalty or locked-in commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Comparison Matrix */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="text-xs text-primary">
            Feature Comparison Matrix
          </Badge>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Compare Free vs. Pro Plans in Detail
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Everything clearly mapped to help you make the right choice.
          </p>
        </div>

        {/* Pass the role to show only the relevant comparison table */}
        <PricingComparisonTable role={isAdmin ? "all" : (userRole || selectedRole)} />
      </section>

      {/* 5. Pricing FAQ Section */}
      <section className="border-t border-border/80 bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingFAQ />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage
