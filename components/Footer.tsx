import React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Sparkles } from "lucide-react"
import Logo from "@/components/Logo"

// রিকোয়ারমেন্ট অনুযায়ী Footer Component:
// লোগো, ট্যাগলাইন, নেভিগেশন লিংকস, কন্টাক্ট ইনফো (ইমেইল/ফোন/লোকেশন),
// কপিরাইট টেক্সট এবং সোশ্যাল মিডিয়াতে অবশ্যই নতুন 𝕏 লোগো (টুইটার পাখির বদলে)।
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/80 bg-card text-card-foreground">
      {/* মেইন ফুটার কন্টেন্ট গ্রিড */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* কলাম ১ ও ২: ব্র্যান্ড ও পরিচিতি */}
          <div className="space-y-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              MentorLagbe is Bangladesh&apos;s smart tuition finder &amp; 1-on-1
              academic mentorship platform connecting students with verified
              subject specialists.
            </p>

            {/* সোশ্যাল মিডিয়া লিঙ্কস (নতুন 𝕏 লোগো সহ) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Official New 𝕏 Logo (Strict Requirement: NOT the old Twitter bird) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <svg
                  className="size-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.81a1.63 1.63 0 1 0 1.63 1.63 1.63 1.63 0 0 0-1.63-1.63Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/dipanjandev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* কলাম ৩: কুইক নেভিগেশন */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tuitions"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Pricing &amp; Pro Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৪: পোর্টাল ও ড্যাশবোর্ডস */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Dashboards
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard/student"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Student Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tutor"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Tutor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tutor/post-tuition"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Post a Tuition
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  Admin Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৫: কন্টাক্ট ইনফো (রিকোয়ারমেন্ট অনুযায়ী ইমেইল/ফোন/লোকেশন) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@mentorlagbe.com"
                  className="hover:underline"
                >
                  dipanjan.shirso@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href="tel:+8801700123456" className="hover:underline">
                  +880 1716-164345
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Madhyanagar, Sunamganj, Sylhet.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* বটম বার: কপিরাইট ও লিগ্যাল */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 MentorLagbe. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-primary">
              Terms of Service
            </Link>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              <Sparkles className="size-3" />
              <span>Smart Tuition Network</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
