import React from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

const Logo = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <div className="rounded-xl bg-green-600 p-2 text-white shadow-xs">
        <GraduationCap className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Mentor<span className="text-green-600">Lagbe</span>
      </span>
    </Link>
  )
}

export default Logo
