"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  UploadCloud,
  UserCheck,
  BookOpen,
  ImageIcon,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
} from "lucide-react"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Role = "student" | "tutor"

const SignUpPage = () => {
  const [role, setRole] = useState<Role>("student")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const router = useRouter()

  // ImgBB ইমেজ আপলোড হ্যান্ডেলার
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await res.json()

      if (data.success) {
        setImageUrl(data.data.display_url)
        toast.success("Profile photo uploaded successfully!")
      } else {
        toast.error("Failed to upload photo to ImgBB.")
      }
    } catch {
      toast.error("Image upload network error.")
    } finally {
      setUploading(false)
    }
  }

  // BetterAuth signUp.email ফাংশনালিটি এবং কনফার্ম পাসওয়ার্ড ভ্যালিডেশন
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // ১. পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড চেক
    if (password !== confirmPassword) {
      toast.error("Passwords do not match! Please verify both fields.")
      return
    }

    // ২. ন্যূনতম পাসওয়ার্ড লেংথ চেক
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    try {
      setSubmitting(true)
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        image: imageUrl,
        role,
      } as Record<string, unknown> as Parameters<typeof signUp.email>[0])

      if (data) {
        toast.success("Account created successfully! Welcome to MentorLagbe.")
        router.push("/")
      } else if (error) {
        toast.error(error.message || "Sign up failed! Please try again.")
      }
    } catch {
      toast.error("An error occurred during account creation.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-primary/5 via-background to-background px-4 py-12">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>

      <Card className="w-full max-w-lg rounded-2xl border border-border/80 bg-card/95 shadow-xl backdrop-blur-xl transition-all duration-300">
        <CardHeader className="space-y-3 pb-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Create an Account
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Select your role and enter your details to join MentorLagbe
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* সবার উপরে: Role Selection Box (Student ও Tutor) */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground">Select Account Role</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-xs font-semibold transition ${
                    role === "student"
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <BookOpen className="size-4" />
                  <span>Student (Learn)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3.5 text-xs font-semibold transition ${
                    role === "tutor"
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <UserCheck className="size-4" />
                  <span>Tutor (Teach)</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <User className="size-3.5 text-muted-foreground" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="rounded-xl border-input bg-background/50 px-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email */}
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

            {/* Password Grid (Password & Confirm Password) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Lock className="size-3.5 text-muted-foreground" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Lock className="size-3.5 text-muted-foreground" />
                  <span>Confirm Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    required
                    className="rounded-xl border-input bg-background/50 pr-10 pl-3.5 py-2.5 text-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition hover:text-foreground focus:outline-none"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="space-y-1.5">
              <Label htmlFor="photo" className="text-xs font-semibold text-foreground">Profile Photo (Optional)</Label>
              <div className="flex items-center gap-4">
                {/* Image Preview */}
                <Avatar className="size-16 shrink-0 border-2 border-border/80 shadow-xs">
                  <AvatarImage
                    src={imageUrl}
                    alt="Profile Preview"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    <ImageIcon className="size-6" />
                  </AvatarFallback>
                </Avatar>

                {/* Upload Trigger */}
                <label
                  htmlFor="photo"
                  className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-background/50 p-3.5 transition hover:border-primary hover:bg-primary/5"
                >
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                    <UploadCloud className="size-4" />
                  </div>

                  <span className="text-center text-xs font-medium text-muted-foreground">
                    {uploading
                      ? "Uploading image to ImgBB..."
                      : imageUrl
                        ? "Photo uploaded! Click to change"
                        : "Click to upload avatar image"}
                  </span>

                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={uploading || submitting}
              className="mt-2 w-full cursor-pointer rounded-xl bg-primary py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-border/80 pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary transition hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUpPage
