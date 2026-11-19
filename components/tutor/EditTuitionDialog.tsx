"use client"

import React, { useState } from "react"
import { Pencil } from "lucide-react"
import { toast } from "sonner"
import { ITuition, TTuitionMode } from "@/types"
import { updateTuition } from "@/lib/actions/tuitions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface EditTuitionDialogProps {
  tuition: ITuition
  onUpdate: (updated: ITuition) => void
}

export const EditTuitionDialog = ({
  tuition,
  onUpdate,
}: EditTuitionDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const updatedData = {
      title: formData.get("title") as string,
      subject: formData.get("subject") as string,
      classLevel: formData.get("classLevel") as string,
      mode: formData.get("mode") as TTuitionMode,
      location: formData.get("location") as string,
      monthlyFee: Number(formData.get("monthlyFee")),
      daysPerWeek: Number(formData.get("daysPerWeek")),
      description: formData.get("description") as string,
    }
    console.log(updatedData)

    const res = await updateTuition(tuition._id, updatedData)

    if (res.modifiedCount > 0) {
      // স্ক্রিনের টেবিল আপডেট করার জন্য প্যারেন্টকে নতুন ডেটা পাঠানো
      onUpdate({ ...tuition, ...updatedData })
      toast.success("Tuition updated successfully!")
      setOpen(false) // পপ-আপ বন্ধ করা
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* টেবিলের Edit বাটন */}
      <DialogTrigger
        type="button"
        className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        title="Edit Tuition"
      >
        <Pencil className="size-4" />
      </DialogTrigger>

      {/* পপ-আপ ফর্ম */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Tuition</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              defaultValue={tuition.title}
              required
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <input
                name="subject"
                defaultValue={tuition.subject}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Class Level</label>
              <input
                name="classLevel"
                defaultValue={tuition.classLevel}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Mode</label>
              <select
                name="mode"
                defaultValue={tuition.mode}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                name="location"
                defaultValue={tuition.location}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Monthly Fee (৳)</label>
              <input
                type="number"
                name="monthlyFee"
                defaultValue={tuition.monthlyFee}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Days / Week</label>
              <input
                type="number"
                name="daysPerWeek"
                defaultValue={tuition.daysPerWeek}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={tuition.description}
              required
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
