"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * ThemeToggle Component
 *
 * Smooth light/dark mode switcher with clean icon transition.
 * Uses useSyncExternalStore for hydration-safe client rendering (React 19 compliant).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // React 19 recommended hydration check without useEffect setState
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!isClient) {
    return (
      <div className="size-9 rounded-xl border border-border/60 bg-muted/40" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="size-4 text-slate-700 transition-transform duration-200 rotate-0 scale-100 dark:text-slate-300" />
      )}
    </button>
  )
}
