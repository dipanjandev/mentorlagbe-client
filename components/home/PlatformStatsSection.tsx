import React from "react"
import { Users, GraduationCap, Star, BookOpen, CheckCircle2 } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  subject: string
  avatar: string
  comment: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Tanzim Ahmed",
    role: "HSC 2025 Aspirant",
    subject: "Higher Mathematics & Physics",
    avatar: "TA",
    comment:
      "MentorLagbe made finding a BUET-graduated tutor so effortless! The booking process took less than 2 minutes, and the customized schedule fit my college routine seamlessly.",
    rating: 5,
  },
  {
    name: "Dr. Farhana Yasmin",
    role: "Parent of Grade 9 Student",
    subject: "Cambridge O-Level Science",
    avatar: "FY",
    comment:
      "As a working parent, verifying tutor credentials was always a headache. Through MentorLagbe's verified tutor system, we found an exceptional mentor who boosted my daughter's confidence in Chemistry.",
    rating: 5,
  },
  {
    name: "Rahat Al-Mamun",
    role: "Pro Tutor & Educator",
    subject: "Computer Science & ICT",
    avatar: "RM",
    comment:
      "Upgrading to Pro Tutor was the best decision for my teaching practice. I received verified student inquiries within days of posting my batch, and the applicant management dashboard is super smooth.",
    rating: 5,
  },
]

const STATS = [
  {
    label: "Active Students",
    value: "15,000+",
    description: "Learning across all education boards",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  },
  {
    label: "Verified Mentors",
    value: "850+",
    description: "From top universities & institutions",
    icon: GraduationCap,
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  },
  {
    label: "Satisfaction Rate",
    value: "98.4%",
    description: "Positive ratings from students & parents",
    icon: Star,
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  },
  {
    label: "Tuition Hours",
    value: "45,000+",
    description: "Sessions delivered online & in-person",
    icon: BookOpen,
    color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
  },
]

/**
 * PlatformStatsSection Component
 *
 * Displays high-level platform statistics and real-world reviews/testimonials
 * to establish trust and social proof.
 */
export default function PlatformStatsSection() {
  return (
    <section className="py-20 bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {stat.value}
                    </span>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonials Header */}
        <div className="mt-24 mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            Community Feedback
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Trusted by Thousands of Students & Guardians
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            See what learners, parents, and educators say about their experiences with MentorLagbe.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                {/* Quote content */}
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 flex items-center gap-3.5 border-t pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.role} • {item.subject}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
