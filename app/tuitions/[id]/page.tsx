import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  ShieldCheck,
  User,
} from "lucide-react"
import { getSingleTuitionApi } from "@/lib/api/getTuition"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { ApplyTuitionModal } from "@/components/tuitions/ApplyTuitionModal"

interface TuitionDetailsPageProps {
  params: Promise<{ id: string }>
}

const TuitionDetailsPage = async ({ params }: TuitionDetailsPageProps) => {
  const { id } = await params

  // কার্ডের Details বাটনে ক্লিক করলে useRouter দিয়ে ইউজার /tuitions/[id] ডাইনামিক রাউটে চলে যায়। যেহেতু এটি একটি Server Component, তাই পেজ লোড হওয়ার সাথে সাথেই আমি await params দিয়ে URL থেকে id টা ধরেছি এবং getSingleTuitionApi(id) কল করে ব্যাকএন্ডের /tuitions/:id এন্ডপয়েন্ট থেকে findOne() দিয়ে ডেটা এনে রেন্ডার করেছি।
  const tuition = await getSingleTuitionApi(id)

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-border/60 bg-muted/20 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Browse Tuitions</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge
              variant={tuition.isActive ? "default" : "secondary"}
              className="text-xs"
            >
              {tuition.isActive ? "Accepting Students" : "Batch Closed"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column (2/3 width): Banner, Title, Overview & Description */}
          <div className="space-y-8 lg:col-span-2">
            {/* Banner Image Card */}
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tuition.bannerImage}
                  alt={tuition.title}
                  className="size-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground shadow-sm">
                    {tuition.mode}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-background/90 backdrop-blur-xs"
                  >
                    {tuition.classLevel}
                  </Badge>
                </div>
              </div>

              {/* Header Info */}
              <div className="space-y-4 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
                  <BookOpen className="size-4" />
                  <span>{tuition.subject}</span>
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {tuition.title}
                </h1>

                {/* Quick Meta Pills */}
                <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-5 sm:grid-cols-4">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="size-3.5 text-primary" />
                      Class Level
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {tuition.classLevel}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3.5 text-primary" />
                      Schedule
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {tuition.daysPerWeek} Days / Week
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Monitor className="size-3.5 text-primary" />
                      Class Mode
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {tuition.mode}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 text-primary" />
                      Location
                    </span>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {tuition.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description Section */}
            <section className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
              <h2 className="text-lg font-bold text-foreground">
                About This Tuition & Mentorship
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {tuition.description}
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border/60 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <CheckCircle className="size-4 text-emerald-500" />
                  <span>Structured Weekly Lesson Plan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <CheckCircle className="size-4 text-emerald-500" />
                  <span>Regular Progress & Exam Evaluation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <CheckCircle className="size-4 text-emerald-500" />
                  <span>Direct Q&A and Doubt Solving</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <CheckCircle className="size-4 text-emerald-500" />
                  <span>Verified MentorLagbe Listing</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (1/3 width): Sticky Fee Card, Apply Button & Tutor Profile */}
          <aside className="space-y-6">
            <div className="space-y-6 lg:sticky lg:top-20">
              {/* Fee & Apply Action Card */}
              <div className="space-y-6 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="flex items-baseline justify-between border-b border-border/60 pb-5">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Monthly Tuition Fee
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-primary">
                        ৳ {tuition.monthlyFee?.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / month
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {tuition.mode}
                  </Badge>
                </div>

                {/* Summary Checklist */}
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="size-3.5 text-primary" />
                      Weekly Classes
                    </span>
                    <span className="font-semibold text-foreground">
                      {tuition.daysPerWeek} Days
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-primary" />
                      Area / Platform
                    </span>
                    <span className="max-w-40 truncate font-semibold text-foreground">
                      {tuition.location}
                    </span>
                  </li>
                </ul>

                {/* Separate Client Component for Role-Restricted Apply Flow */}
                <ApplyTuitionModal tuition={tuition} />
              </div>

              {/* Tutor Profile Summary Card */}
              <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Mentor Information
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" />
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">
                      {tuition.tutorName || "Verified Mentor"}
                    </p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <Mail className="size-3 shrink-0" />
                      <span>{tuition.tutorEmail}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default TuitionDetailsPage
