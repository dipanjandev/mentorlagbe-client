"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignInPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // BetterAuth signIn.email ফাংশনালিটি, toast নোটিফিকেশন এবং রিডাইরেক্ট
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      setLoading(true)
      const { data, error } = await signIn.email({
        email,
        password,
      })

      if (data) {
        toast.success("Login Successful! Welcome back.")
        router.push("/")
      } else if (error) {
        toast.error(error.message || "Invalid email or password. Please try again.")
      }
    } catch {
      toast.error("Something went wrong during sign in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-primary/5 via-background to-background px-4 py-12">
      {/* Background Decorative Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>

      <Card className="w-full max-w-md rounded-2xl border border-border/80 bg-card/95 shadow-xl backdrop-blur-xl transition-all duration-300">
        <CardHeader className="space-y-3 pb-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Sign in to access your MentorLagbe account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Mail className="size-3.5 text-muted-foreground" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="rounded-xl border-input bg-background/50 px-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Lock className="size-3.5 text-muted-foreground" />
                  <span>Password</span>
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="rounded-xl border-input bg-background/50 pr-10 pl-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-xl bg-primary py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-border/80 pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary transition hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignInPage
