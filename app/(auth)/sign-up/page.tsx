"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  UploadCloud,
  UserCheck,
  BookOpen,
  ShieldCheck,
  ImageIcon,
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

type Role = "student" | "tutor" | "admin"

const SignUpPage = () => {
  const [role, setRole] = useState<Role>("student")
  //   console.log(role)

  const [imageUrl, setImageUrl] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)
  const router = useRouter()

  // ImgBB ইমেজ আপলোড হ্যান্ডেলার
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)
    // console.log(formData)

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
    const data = await res.json()
    // console.log(data)

    if (data.success) {
      setImageUrl(data.data.display_url)
    }
    setUploading(false)
  }

  // TODO: BetterAuth signUp.email ফাংশনালিটি এখানে লিখবে (role এবং imageUrl সহ)
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log({ role, imageUrl })

    const formData = new FormData(e.currentTarget)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { data, error } = await signUp.email({
      name,
      email,
      password,
      image: imageUrl,
      role,
    } as Record<string, unknown> as Parameters<typeof signUp.email>[0])
    // console.log("if data found", data)
    if (data) {
      toast.success("Account created successfully!")
      router.push("/")
    } else if (error) {
      toast.error(error.message || "Sign up failed!")
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
              Create an Account
            </CardTitle>
            <CardDescription className="text-slate-600">
              Select your role and fill in your details to get started
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* সবার উপরে: Role Selection Box (Student, Tutor, Admin) */}
            <div className="space-y-2">
              <Label className="text-slate-700">Select Account Role</Label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    role === "student"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-green-300"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    role === "tutor"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-green-300"
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Tutor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    role === "admin"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-green-300"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              {/* TODO: name ইনপুটের value এবং onChange বসাবে */}
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              {/* TODO: email ইনপুটের value এবং onChange বসাবে */}
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
              <Label htmlFor="password">Password</Label>
              {/* TODO: password ইনপুটের value এবং onChange বসাবে */}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Profile Photo: বাম পাশে প্রিভিউ এবং ডান পাশে আপলোড বক্স */}
            <div className="space-y-1.5">
              <Label htmlFor="photo">Profile Photo</Label>
              <div className="flex items-center gap-4">
                {/* বাম পাশে: Image Preview */}
                <Avatar className="h-16 w-16 shrink-0 border-2 border-slate-200">
                  <AvatarImage
                    src={imageUrl}
                    alt="Profile Preview"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-100 text-slate-400">
                    <ImageIcon className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>

                {/* ডান পাশে: Upload Box */}
                <label
                  htmlFor="photo"
                  className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-3.5 transition hover:border-green-500 hover:bg-green-50/40"
                >
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600">
                    <UploadCloud className="h-4 w-4" />
                  </div>

                  <span className="text-center text-xs font-medium text-slate-600">
                    {uploading
                      ? "Uploading image..."
                      : imageUrl
                        ? "Click to change photo"
                        : "Click to upload photo"}
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

            <Button
              type="submit"
              disabled={uploading}
              className="mt-2 w-full bg-green-600 font-semibold text-white hover:bg-green-700"
            >
              Create Account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-600 hover:underline"
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
