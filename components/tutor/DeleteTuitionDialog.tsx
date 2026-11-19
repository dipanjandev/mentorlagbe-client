"use client"

import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteTuitionDialogProps {
  title: string
  onConfirm: () => void
}

export const DeleteTuitionDialog = ({
  title,
  onConfirm,
}: DeleteTuitionDialogProps) => {
  return (
    <AlertDialog>
      {/* ১. টেবিলের ভেতরে যে ডিলিট বাটনটি দেখা যাবে */}
      <AlertDialogTrigger
        type="button"
        className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
        title="Delete Tuition"
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>

      {/* ২. বাটনে ক্লিক করলে যে পপ-আপটি খুলবে */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-semibold text-foreground">`{title}`</span>.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
