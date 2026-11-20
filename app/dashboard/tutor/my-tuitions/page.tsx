import Link from "next/link"
import { BookOpen, PlusCircle } from "lucide-react"
import { MyTuitionsTable } from "@/components/tutor/MyTuitionsTable"
import { getTutionApi } from "@/lib/api/getTuition"

const MyTuitionsPage = async () => {
  // TODO: Fetch real tuitions created by the logged-in tutor on the server
  const data = await getTutionApi()
  //   console.log(tuitions)
  const tuitionsList = Array.isArray(data?.tuitions) ? data.tuitions : []

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
