"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Calendar, GraduationCap, MapPin, User, ArrowRight } from "lucide-react"
import { ITuition } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TuitionCardProps {
  tuition: ITuition
}

export const TuitionCard: React.FC<TuitionCardProps> = ({ tuition }) => {
  const router = useRouter()

  // Handler to navigate to tuition details page
  const handleViewDetails = (id?: string) => {
    if (!id) return
    // Navigate to single tuition details
    router.push(`/tuitions/${id}`)
  }

  return (
    <Card className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div>
        {/* Banner Image & Mode Badge */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tuition.bannerImage}
            alt={tuition.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <Badge
              variant={tuition.mode === "Online" ? "default" : "secondary"}
              className="font-medium shadow-sm"
            >
              {tuition.mode}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-5 pb-3">
          {/* Category & Class Level Tags */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/20 text-primary">
              <GraduationCap className="mr-1 size-3" />
              {tuition.classLevel}
            </Badge>
            <span className="text-xs font-semibold text-muted-foreground">
              {tuition.subject}
            </span>
          </div>

          {/* Title */}
          <CardTitle className="line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
            {tuition.title}
          </CardTitle>
        </CardHeader>

        {/* Tuition Meta Details */}
        <CardContent className="space-y-2.5 px-5 py-2 text-xs text-muted-foreground">
          {/* Schedule & Location */}
          <div className="flex items-center justify-between border-y border-border/60 py-2.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              <span className="font-medium text-foreground">
                {tuition.daysPerWeek} Days / Week
              </span>
            </div>
            <div className="flex max-w-[50%] items-center gap-1.5 truncate">
              <MapPin className="size-3.5 text-muted-foreground" />
              <span className="truncate">{tuition.location}</span>
            </div>
          </div>

          {/* Tutor Info */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="size-3.5" />
            </div>
            <span className="truncate font-medium text-foreground">
              {tuition.tutorName || "Verified Mentor"}
            </span>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Monthly Fee & Actions */}
      <CardFooter className="flex items-center justify-between border-t border-border/60 bg-muted/20 p-5 pt-3">
        {/* Fee */}
        <div>
          <span className="text-[11px] font-medium text-muted-foreground">
            Monthly Fee
          </span>
          <div className="flex items-center gap-0.5 text-base font-bold text-foreground">
            <span>৳ {tuition.monthlyFee?.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View Details Button */}
          <Button
            size="sm"
            onClick={() => handleViewDetails(tuition._id)}
            className="group/btn flex items-center gap-1 rounded-xl bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <span>Details</span>
            <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
