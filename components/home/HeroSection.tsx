"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// হোম ল্যান্ডিং পেজের Hero সেকশন: হেডলাইন, সার্চ ইনপুট, সিলেকশন ব্যাজ ও ভিজ্যুয়াল কাউন্টার
const HeroSection: React.FC = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tuitions?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/tuitions")
    }
  }

  const popularTags = ["Higher Math", "Physics", "IELTS", "HSC Bangla", "ICT"]

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-24">
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ গ্লো */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:size-[36rem]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* বামের কন্টেন্ট (৭ কলাম) */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* টপ ব্যাজ */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Smart Tuition &amp; Academic Mentorship Platform</span>
            </div>

            {/* মূল হেডলাইন */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find Your Ideal Tutor or{" "}
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Mentorship Batch
              </span>{" "}
              Today
            </h1>

            {/* সাব-হেডলাইন */}
            <p className="mt-4 text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
              Connect with verified subject specialists across Bangladesh for personalized home tuition
              and interactive online batches. Designed to elevate grades and build true academic mastery.
            </p>

            {/* সার্চ ফর্ম */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-2 shadow-sm sm:flex-row sm:items-center sm:gap-0"
            >
              <div className="relative flex flex-1 items-center">
                <Search className="pointer-events-none absolute left-4 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by subject, class, or topic (e.g. Physics, Class 10)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-transparent py-3 pr-4 pl-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                className="h-11 rounded-xl px-6 text-sm font-semibold shadow-xs"
              >
                <span>Find Tutors</span>
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {/* ট্রেন্ডিং সার্চ ট্যাগস */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground lg:justify-start">
              <span className="font-medium">Trending:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => router.push(`/tuitions?search=${encodeURIComponent(tag)}`)}
                  className="rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-xs text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* ৩টি ট্রাস্ট হাইলাইটস */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-6 text-left">
              <div>
                <p className="text-2xl font-extrabold text-foreground">1,500+</p>
                <p className="text-xs text-muted-foreground">Verified Mentors</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Admin Moderated</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">Online/Offline</p>
                <p className="text-xs text-muted-foreground">Flexible Modes</p>
              </div>
            </div>
          </div>

          {/* ডানের ভিজ্যুয়াল কার্ড গ্রিড (৫ কলাম) */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative space-y-4">
              {/* ফিচার্ড ব্যাচ কার্ড ১ */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">HSC Physics Batch 2026</h4>
                      <p className="text-xs text-muted-foreground">Online • 3 Days/Week</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    $25/mo
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-3.5 text-primary" /> Verified BUET Mentor
                  </span>
                  <span className="font-semibold text-primary">Accepting</span>
                </div>
              </div>

              {/* ফিচার্ড ব্যাচ কার্ড ২ */}
              <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">IELTS Academic Masterclass</h4>
                      <p className="text-xs text-muted-foreground">Band 8.0+ Target • Interactive</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    $35/mo
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-blue-600" /> Pro Certified Mentor
                  </span>
                  <span className="font-semibold text-blue-600">4 Seats Left</span>
                </div>
              </div>

              {/* অ্যাক্টিভ স্টুডেন্ট কাউন্টার পিল */}
              <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/40 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground border-2 border-background">
                      S1
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white border-2 border-background">
                      S2
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white border-2 border-background">
                      S3
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-foreground">5,000+ Enrolled Students</span>
                </div>
                <Link
                  href="/tuitions"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Join Today →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
