import React from "react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import FeaturedTuitionsSection from "@/components/home/FeaturedTuitionsSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import TopSubjectsSection from "@/components/home/TopSubjectsSection"
import PricingTeaserSection from "@/components/home/PricingTeaserSection"
import PlatformStatsSection from "@/components/home/PlatformStatsSection"
import { getTutionApi } from "@/lib/api/getTuition"
import { ITuition } from "@/types"

/**
 * MentorLagbe Home Landing Page
 *
 * Assembles all 6 required sections:
 * 1. HeroSection: Search, headline, verified trust metrics, quick tags
 * 2. FeaturedTuitionsSection: Dynamic 6 latest approved & active tuitions in a 3-column equal grid
 * 3. HowItWorksSection: 4-step visual workflow for students and tutors
 * 4. TopSubjectsSection: Subject category cards linking to filtered search
 * 5. PricingTeaserSection: Pro Student ($10) & Pro Tutor ($15) upgrade benefits & CTA
 * 6. PlatformStatsSection: Platform metrics and real student/guardian testimonials
 */
export default async function Page() {
  // ডাটাবেজ থেকে সর্বশেষ ৬টি অনুমোদিত ও সক্রিয় টিউশন ফেচ করা
  let featuredTuitions: ITuition[] = []

  try {
    const data = await getTutionApi("page=1&limit=6")
    if (data && Array.isArray(data.tuitions)) {
      featuredTuitions = data.tuitions
    }
  } catch (error) {
    console.error("Failed to fetch featured tuitions for home page:", error)
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <NavBar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Dynamic Featured Tuitions */}
        <FeaturedTuitionsSection tuitions={featuredTuitions} />

        {/* 3. How It Works Workflow */}
        <HowItWorksSection />

        {/* 4. Popular Subjects Explorer */}
        <TopSubjectsSection />

        {/* 5. Pricing Pro Teaser */}
        <PricingTeaserSection />

        {/* 6. Platform Stats & Verified Reviews */}
        <PlatformStatsSection />
      </main>

      <Footer />
    </div>
  )
}
