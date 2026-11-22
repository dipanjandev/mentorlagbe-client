import React from "react"
import { Search, UserCheck, Send, GraduationCap, ArrowRight } from "lucide-react"

// হোম ল্যান্ডিং পেজের How MentorLagbe Works সেকশন:
// ৪ ধাপের ভিজ্যুয়াল প্রসেস ওয়ার্কফ্লো যা শিক্ষার্থী ও শিক্ষকদের প্ল্যাটফর্ম ব্যবহারের নিয়ম সহজে বুঝিয়ে দেয়
const steps = [
  {
    step: "01",
    title: "Search & Filter",
    description:
      "Explore verified tutors by subject, class level, mode (Online/Offline), and affordable monthly budget.",
    icon: Search,
  },
  {
    step: "02",
    title: "Review Batch Details",
    description:
      "Inspect tutor credentials, batch curriculum, class days per week, and tuition fee with full transparency.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Apply with Schedule",
    description:
      "Submit your preferred study time and custom learning note. Duplicate check protects your enrollment.",
    icon: Send,
  },
  {
    step: "04",
    title: "Confirm & Start Learning",
    description:
      "Once the mentor accepts your application, connect directly and start your academic success journey.",
    icon: GraduationCap,
  },
]

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="border-b border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশন হেডার */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How MentorLagbe Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            From discovering qualified mentors to your first live class session — streamlined in minutes.
          </p>
        </div>

        {/* ৪টি কার্ড গ্রিড */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  {/* স্টেপ নাম্বার ও আইকন */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-primary/30 transition-colors group-hover:text-primary">
                      {item.step}
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  {/* টাইটেল ও বিবরণ */}
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {item.description}
                  </p>
                </div>

                {/* ডেকোরেটিভ অ্যারো (ডেস্কটপ এ পরবর্তী ধাপের দিকে) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/40">
                    <ArrowRight className="size-4" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
