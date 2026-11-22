"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo"
import UserMenu from "@/components/UserMenu"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useSession } from "@/lib/auth-client"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/#how-it-works" },
]

/**
 * NavBar Component
 *
 * Polished floating glassmorphic navbar with:
 * - Brand logo & responsive links
 * - Dark / Light theme toggle switcher
 * - Authenticated user menu & guest sign-in/up actions
 * - Seamless background blur & modern design tokens
 */
const NavBar = () => {
  const { data: session } = useSession()
  const user = session?.user

  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-2.5 sm:px-6 transition-all duration-300">
      {/* মেইন ফ্লোটিং গ্লাস বার */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-border/80 bg-background/85 px-4 sm:px-6 shadow-sm shadow-foreground/5 backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:border-border/60 dark:bg-card/80 dark:shadow-none">
        {/* বামে: Brand Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* মাঝখানে: Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* ডানে: Theme Switcher + Auth State অথবা Sign In / Sign Up */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Switcher */}
          <ThemeToggle />

          {session && user ? (
            <UserMenu user={user} />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-muted-foreground transition hover:bg-accent hover:text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border/80 bg-background/95 p-4 shadow-xl backdrop-blur-xl md:hidden dark:bg-card/95 animate-in fade-in-50 slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            {!session && (
              <div className="mt-3 flex flex-col gap-2 border-t border-border/70 pt-3 sm:hidden">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-border py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar
