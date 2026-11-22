import React from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { ITuition } from "@/types"
import { TuitionCard } from "@/components/tuitions/TuitionCard"

interface FeaturedTuitionsSectionProps {
  tuitions: ITuition[]
}

// হোম ল্যান্ডিং পেজের Dynamic Featured Tuitions সেকশন:
// ডাটাবেজ থেকে সর্বশেষ ৬টি অনুমোদিত ও সক্রিয় টিউশন কার্ড সমান হাইট-উইডথে ৩ কলামে প্রদর্শন করে
const FeaturedTuitionsSection: React.FC<FeaturedTuitionsSectionProps> = ({
  tuitions,
}) => {
  // সর্বোচ্চ ৬টি টিউশন দেখানো নিশ্চিত করা
  const displayTuitions = tuitions.slice(0, 6)

  return (
    <section className="border-b border-border/60 bg-muted/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশন হেডার */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Verified Listings</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Tuitions &amp; Mentorships
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Explore the latest admin-approved tuition batches tailored for high school, college, and university.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="hidden items-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground md:inline-flex"
          >
            <span>View All Listings</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* ৩-কলাম রেসপনসিভ গ্রিড (সমান হাইট ও উইডথ) */}
        {displayTuitions.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayTuitions.map((tuition) => (
              <div key={tuition._id} className="h-full">
                <TuitionCard tuition={tuition} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
            <BookOpen className="size-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-semibold text-foreground">
              No Featured Tuitions Available Right Now
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              New tuition batches are added every day. Check out our browse section for all offerings.
            </p>
            <Link
              href="/tuitions"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Browse Tuitions
            </Link>
          </div>
        )}

        {/* মোবাইলের জন্য বটম বাটন */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/tuitions"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
          >
            <span>View All Listings</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedTuitionsSection
