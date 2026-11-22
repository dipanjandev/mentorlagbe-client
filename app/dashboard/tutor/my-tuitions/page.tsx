import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { BookOpen, PlusCircle } from "lucide-react"
import { MyTuitionsTable } from "@/components/tutor/MyTuitionsTable"
import { getTutionApi } from "@/lib/api/getTuition"
import { auth } from "@/lib/auth"
import { ITuition } from "@/types"

export const metadata: Metadata = {
  title: "My Created Tuitions",
  description: "Manage, edit, delete, and control availability of your tuition offerings.",
}

/**
 * MyTuitionsPage (Tutor Dashboard)
 *
 * শুধুমাত্র লগইন করা নির্দিষ্ট টিউটরের তৈরি করা টিউশন ব্যাচগুলো ডাটাবেজ থেকে ফেচ করে
 * এবং এডিট, ডিলিট ও এক্টিভ/ক্লোজড স্ট্যাটাস নিয়ন্ত্রণের টেবিলে রেন্ডার করে।
 */
const MyTuitionsPage = async () => {
  // ১. লগইন করা টিউটরের সেশন ও ইমেইল সংগ্রহ করা
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const email = session?.user?.email

  // ২. শুধুমাত্র এই টিউটরের ইমেইল দিয়ে ফিল্টার করে তার নিজস্ব টিউশনগুলো ফেচ করা
  let tuitionsList: ITuition[] = []
  if (email) {
    try {
      const data = await getTutionApi(`tutorEmail=${email}`)
      tuitionsList = Array.isArray(data?.tuitions) ? data.tuitions : []
    } catch (error) {
      console.error("Error fetching tutor tuitions:", error)
    }
  }

  return (
    <div className="p-8">
      {/* Page Header (Server Rendered) */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              My Created Tuitions
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, edit, delete, and control the active availability of your
            posted tuition batches.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/dashboard/tutor/post-tuition"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          <PlusCircle className="size-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* Reusable Client Component Table */}
      <MyTuitionsTable initialTuitions={tuitionsList} />
    </div>
  )
}

export default MyTuitionsPage
