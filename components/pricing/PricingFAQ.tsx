import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export const PricingFAQ: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <HelpCircle className="size-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Everything You Need to Know
        </h2>
        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
          Have questions about Pro plans or Stripe payment processing? Find answers below.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
        <Accordion className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              How does the Pro Tutor subscription work?
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
              Free Tutors can post up to 2 active tuition listings. Upgrading to the Pro Tutor Plan
              ($15/month) grants unlimited posts, a verified tutor badge, and priority placement on
              the search and home page.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              What benefits does a Pro Student receive?
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
              Pro Students ($10/month) get priority booking verification, guaranteeing that tutors
              review their application before the general queue. They also get a verified student
              badge and early access to newly opened tuition batches.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              Is my payment information secure with Stripe?
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
              Yes, 100%. All transactions are processed through Stripe Checkout with raw body
              signature webhook verification. MentorLagbe never stores your sensitive card details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              Can I cancel my Pro subscription at any time?
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
              Absolutely. You can cancel your subscription at any time from your dashboard profile
              without any hidden cancellation fees. You will retain Pro benefits until the end of your
              current billing period.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
