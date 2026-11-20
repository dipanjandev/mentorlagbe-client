"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Lock,
  LogIn,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { ITuition } from "@/types"
import { authClient } from "@/lib/auth-client" // তোমার auth-client পাথ অনুযায়ী মিলিয়ে নেবে
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createApplication } from "@/lib/actions/applications"

interface ApplyTuitionModalProps {
  tuition: ITuition
}

export const ApplyTuitionModal: React.FC<ApplyTuitionModalProps> = ({
  tuition,
}) => {
  const { data: session, isPending: isSessionLoading } = authClient.useSession()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ফর্মের স্টেট (রিকোয়ারমেন্ট অনুযায়ী ৩টি ফিল্ড)
  const [studentPhone, setStudentPhone] = useState("")
  const [preferredSchedule, setPreferredSchedule] = useState("")
  const [studentNote, setStudentNote] = useState("")
  //   console.log(studentPhone)
  //   console.log(preferredSchedule)
  //   console.log(studentNote)

  // Better Auth সেশন থেকে ইউজার ও রোল বের করা
  const user = session?.user as
    { name?: string; email?: string; role?: string } | undefined

  // ১. সেশন লোড হওয়ার সময়
  if (isSessionLoading) {
    return (
      <Button disabled className="h-12 w-full rounded-xl py-6">
        <Loader2 className="mr-2 size-4 animate-spin" />
        Checking eligibility...
      </Button>
    )
  }

  // ২. ইউজার লগইন করা না থাকলে
  if (!user) {
    return (
      <div className="space-y-3">
        <Link href="/sign-in" className="block">
          <Button className="w-full gap-2 rounded-xl py-6 text-sm font-semibold">
            <LogIn className="size-4" />
            <span>Sign In to Apply</span>
          </Button>
        </Link>
        <p className="text-center text-xs text-muted-foreground">
          You must be logged in as a Student to apply for this batch.
        </p>
      </div>
    )
  }

  // ৩. রিকোয়ারমেন্ট: Tutor বা Admin হলে Apply বাটন বন্ধ ও নোটিশ দেখাবে
  if (user.role !== "student") {
    return (
      <div className="space-y-2.5">
        <Button
          disabled
          variant="secondary"
          className="w-full cursor-not-allowed gap-2 rounded-xl py-6 text-sm font-semibold"
        >
          <Lock className="size-4" />
          <span>Apply Now (Students Only)</span>
        </Button>
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>
            You are logged in as a
            <strong className="capitalize">{user.role}</strong>. Only registered
            Students can apply for tuition listings.
          </span>
        </div>
      </div>
    )
  }

  // ৪. টিউশনটি যদি ক্লোজড (isActive: false) থাকে
  if (!tuition.isActive) {
    return (
      <Button disabled variant="secondary" className="w-full rounded-xl py-6">
        This Tuition Batch is Currently Closed
      </Button>
    )
  }

  // ৫. স্টুডেন্ট অ্যাপ্লিকেশন সাবমিট হ্যান্ডলার
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error("Please provide your phone number and preferred schedule.")
      return
    }

    // এটা দিয়ে বললাম যে id, email এগুলো undefine নয় এগুলো স্ট্রিং।
    if (!tuition._id || !tuition.tutorEmail || !user?.email) {
      toast.error("Missing required tuition or user information.")
      return
    }

    setIsSubmitting(true)

    const applicationPayload = {
      tuitionId: tuition._id,
      tuitionTitle: tuition.title,
      subject: tuition.subject,
      monthlyFee: tuition.monthlyFee,
      tutorEmail: tuition.tutorEmail,
      studentName: user.name || "Student",
      studentEmail: user.email,
      studentPhone: studentPhone.trim(),
      preferredSchedule: preferredSchedule.trim(),
      studentNote: studentNote.trim(),
      status: "pending",
      appliedAt: new Date().toISOString(),
    }
    // console.log("show data", applicationPayload)

    try {
      // এখানে ডাটা ফেচ করা হল
      const data = await createApplication(applicationPayload)

      //   যদি এপ্লাই করে থাকে তাহলে তাকে এরর দেখিয়ে ডায়লগ বন্ধ হবে।
      if (!data.success) {
        toast.error("You have already applied to this tuition.")
        setOpen(false)
        return
      }

      //   সাকসেস হলে সাকসেস মেসেজ দেখাবে।
      toast.success("Application submitted successfully!")
      setOpen(false)
      setStudentPhone("")
      setPreferredSchedule("")
      setStudentNote("")
    } catch (error) {
      // যদি সার্ভার রিলেটেড কোন ঝামেলা হয়ে থাকে তহেল ফেইলড দেখাবে
      console.error("Apply error:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      // স্পিনার ঘোরা বন্ধ হবে।
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
        <CheckCircle2 className="size-4" />
        <span>Apply Now</span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Tuition</DialogTitle>
          <DialogDescription className="line-clamp-1">
            {tuition.title} • ৳{tuition.monthlyFee?.toLocaleString()}/month
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
          {/* Student Read-only Info */}
          <div className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs">
            <p className="font-medium text-foreground">
              Applicant: {user.name}
            </p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label htmlFor="studentPhone" className="text-xs font-semibold">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="studentPhone"
              type="tel"
              required
              placeholder="e.g., 017XXXXXXXX"
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
            />
          </div>

          {/* Preferred Schedule */}
          <div className="space-y-1.5">
            <Label
              htmlFor="preferredSchedule"
              className="text-xs font-semibold"
            >
              Preferred Schedule <span className="text-destructive">*</span>
            </Label>
            <Input
              id="preferredSchedule"
              type="text"
              required
              placeholder="e.g., Sat, Mon, Wed at 5:00 PM"
              value={preferredSchedule}
              onChange={(e) => setPreferredSchedule(e.target.value)}
            />
          </div>

          {/* Learning Note */}
          <div className="space-y-1.5">
            <Label htmlFor="studentNote" className="text-xs font-semibold">
              Learning Note (Optional)
            </Label>
            <textarea
              id="studentNote"
              rows={3}
              placeholder="Share your current class, weak topics, or learning goals..."
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-1.5 rounded-xl"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-3.5" />
              )}
              <span>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
