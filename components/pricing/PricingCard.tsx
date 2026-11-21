"use client"

import React from "react"
import { Check, X, Sparkles, ArrowRight } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  id: string
  name: string
  role: "tutor" | "student"
  roleLabel: string
  price: number
  description: string
  isPopular?: boolean
  features: PricingFeature[]
  buttonText: string
  badgeText?: string
}

interface PricingCardProps {
  plan: PricingPlan
  onSelect: (plan: PricingPlan) => void
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const isFree = plan.price === 0

  return (
    <Card
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
        plan.isPopular
          ? "border-primary/60 bg-linear-to-b from-primary/4 to-card shadow-lg ring-1 ring-primary/30"
          : "border-border/80 bg-card hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {/* Popular / Pro Ribbon */}
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="flex items-center gap-1 rounded-bl-xl bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-xs">
            <Sparkles className="size-3" />
            <span>{plan.badgeText || "Most Popular"}</span>
          </div>
        </div>
      )}

      <div>
        <CardHeader className="p-6 pb-4">
          {/* Target Role Tag */}
          <div className="mb-2">
            <Badge
              variant="outline"
              className={
                plan.role === "tutor"
                  ? "border-primary/20 bg-primary/5 text-primary"
                  : "border-secondary/30 bg-secondary/10 text-foreground"
              }
            >
              {plan.roleLabel}
            </Badge>
          </div>

          <CardTitle className="text-xl font-bold text-foreground">
            {plan.name}
          </CardTitle>

          <CardDescription className="mt-1 text-xs text-muted-foreground">
            {plan.description}
          </CardDescription>

          {/* Pricing Display */}
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-foreground">
              ${plan.price}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {isFree ? "forever free" : "/ month"}
            </span>
          </div>
        </CardHeader>

        {/* Feature List */}
        <CardContent className="space-y-3 px-6 py-4">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Included Capabilities:
          </p>
          <ul className="space-y-2.5 text-xs">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2.5 ${
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground/50 line-through"
                }`}
              >
                {feature.included ? (
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" />
                  </span>
                ) : (
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
                    <X className="size-3" />
                  </span>
                )}
                <span className="leading-tight">{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      {/* Card Action Button */}
      <CardFooter className="border-t border-border/60 bg-muted/20 p-6 pt-4">
        <Button
          onClick={() => onSelect(plan)}
          variant={plan.isPopular ? "default" : "outline"}
          className={`w-full gap-2 rounded-xl text-xs font-semibold ${
            plan.isPopular
              ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              : "border-border hover:bg-muted"
          }`}
        >
          <span>{plan.buttonText}</span>
          {!isFree && <ArrowRight className="size-3.5" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
