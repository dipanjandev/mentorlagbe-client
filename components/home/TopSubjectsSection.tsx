"use client"

import React from "react"
import Link from "next/link"
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe2,
  Code2,
  BookMarked,
  LineChart,
  ArrowRight,
} from "lucide-react"

// জনপ্রিয় বিষয়সমূহের তালিকা
const subjects = [
  {
    name: "Higher Mathematics",
    keyword: "Math",
    description: "Calculus, Algebra, Geometry & Trigonometry",
    icon: Calculator,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    batches: "45+ Batches",
  },
  {
    name: "Physics",
    keyword: "Physics",
    description: "Mechanics, Waves, Thermodynamics & Modern Physics",
    icon: Atom,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
    batches: "38+ Batches",
  },
  {
    name: "Chemistry",
    keyword: "Chemistry",
    description: "Organic Synthesis, Inorganic & Physical Chemistry",
    icon: FlaskConical,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    batches: "32+ Batches",
  },
  {
    name: "Biology",
    keyword: "Biology",
    description: "Cell Biology, Genetics, Botany & Human Physiology",
    icon: Dna,
    color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400",
    batches: "25+ Batches",
  },
  {
    name: "English & IELTS",
    keyword: "IELTS",
    description: "Grammar, Academic Writing, Speaking & Band 7.5+",
    icon: Globe2,
    color: "from-purple-500/10 to-violet-500/10 text-purple-600 dark:text-purple-400",
    batches: "40+ Batches",
  },
  {
    name: "ICT & Programming",
    keyword: "ICT",
    description: "HSC ICT Syllabus, Python, Web & Algorithms",
    icon: Code2,
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-600 dark:text-cyan-400",
    batches: "20+ Batches",
  },
  {
    name: "Bangla Literature",
    keyword: "Bangla",
    description: "1st & 2nd Paper Creative Writing & Grammar",
    icon: BookMarked,
    color: "from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400",
    batches: "18+ Batches",
  },
  {
    name: "Accounting & Commerce",
    keyword: "Economics",
    description: "Principles of Accounting, Finance & Microeconomics",
    icon: LineChart,
    color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
    batches: "22+ Batches",
  },
]

// হোম ল্যান্ডিং পেজের Top Subjects সেকশন:
// জনপ্রিয় ক্যাটাগরিগুলো প্রদর্শন করে, যাতে ক্লিক করলে সরাসরি ওই বিষয়ের টিউশন সার্চ রেজাল্টে নিয়ে যায়
const TopSubjectsSection: React.FC = () => {
  return (
    <section className="border-b border-border/60 bg-muted/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশন হেডার */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            <span>Popular Academic Disciplines</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Explore Top Subjects &amp; Specialties
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            From secondary school foundations to competitive university admission tests — find your target subject.
          </p>
        </div>

        {/* ৮টি বিষয়ভিত্তিক কার্ড গ্রিড */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((sub) => {
            const Icon = sub.icon
            return (
              <Link
                key={sub.name}
                href={`/tuitions?search=${encodeURIComponent(sub.keyword)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${sub.color}`}>
                      <Icon className="size-5.5" />
                    </div>
                    <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {sub.batches}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                    {sub.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary pt-3 border-t border-border/50">
                  <span>Browse Batches</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TopSubjectsSection
