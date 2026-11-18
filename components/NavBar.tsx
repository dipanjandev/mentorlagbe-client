"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo"
import UserMenu from "@/components/UserMenu"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/#how-it-works" },
]

const NavBar = () => {
  const { data: session } = useSession()
  // console.log(session)
  const user = session?.user
  // console.log(user)

  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* বামে: Brand Logo */}
        <Logo />

        {/* মাঝখানে: Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "font-semibold text-green-600"
                    : "text-slate-600 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* ডানে: Auth State অথবা Sign In / Sign Up */}
        <div className="flex items-center gap-3">
          {session && user ? (
            <UserMenu user={user} />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
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
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href
                    ? "font-semibold text-green-600"
                    : "text-slate-600 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!session && (
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 sm:hidden">
                <Button variant="outline" className="w-full">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar
