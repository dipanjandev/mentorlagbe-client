import React from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* বামে: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="rounded-lg bg-green-600 p-2 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            Mentor<span className="text-green-600">Lagbe</span>
          </span>
        </Link>

        {/* মাঝখানে: Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-green-600">
            Home
          </Link>
          <Link
            href="/tuitions"
            className="text-sm font-medium text-slate-600 hover:text-green-600"
          >
            Browse Tuitions
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 hover:text-green-600"
          >
            Pricing
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-green-600"
          >
            How It Works
          </Link>
        </nav>

        {/* ডানে: Sign In & Sign Up Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-slate-700 hover:text-green-600"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
