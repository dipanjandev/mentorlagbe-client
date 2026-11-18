"use client"

import React from "react"
import Link from "next/link"
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
  // TODO: BetterAuth signIn.email ফাংশনালিটি, toast নোটিফিকেশন এবং রিডাইরেক্ট এখানে লিখবে
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // TODO: এখানে signIn.email({ email, password }) কল করবে
    // console.log({ email, password })
    const { data, error } = await signIn.email({
      email,
      password,
    })
    if (data) {
      toast.success("Login Successfull!")
      router.push("/")
    } else if (error) {
      toast.error(error.message || "Something Went Wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader className="space-y-3 pb-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-600">
              Sign in to your MentorLagbe account to continue
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* TODO: লগইন হওয়ার সময় বাটন disabled বা লোডিং টেক্সট দেখাতে চাইলে স্টেট বসাবে */}
            <Button
              type="submit"
              className="mt-2 w-full bg-green-600 font-semibold text-white hover:bg-green-700"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-600 hover:underline"
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
