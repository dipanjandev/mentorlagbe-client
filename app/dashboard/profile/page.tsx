"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import {
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  Camera,
  Loader2,
  Sparkles,
  Shield,
  Save,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { getUserByEmail, updateUserProfile, IUser } from "@/lib/actions/users"
import { Button } from "@/components/ui/button"

// এই পেজটি সব রোলের (Student, Tutor, Admin) ইউজারদের তাদের প্রোফাইল (নাম, ফোন, বায়ো ও ছবি) ImgBB দিয়ে আপডেট করার সুযোগ দেয়
const UpdateProfilePage = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // প্রোফাইল ফর্ম ফিল্ড স্টেট
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [userProfile, setUserProfile] = useState<IUser | null>(null)

  // ১. সেশন থেকে বর্তমান ইউজারের তথ্য লোড করা
  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.email) return
      try {
        setLoading(true)
        const profile = await getUserByEmail(session.user.email)
        if (profile) {
          setUserProfile(profile)
          setName(profile.name || session.user.name || "")
          setPhone(profile.phone || "")
          setBio(profile.bio || "")
          setImagePreview(profile.image || session.user.image || null)
        } else {
          setName(session.user.name || "")
          setImagePreview(session.user.image || null)
        }
      } catch (err) {
        console.error("Error loading user profile:", err)
        setName(session?.user?.name || "")
        setImagePreview(session?.user?.image || null)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [session?.user?.email, session?.user?.name, session?.user?.image])

  // ২. নতুন প্রোফাইল ছবি সিলেক্ট করার হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // ৩. প্রোফাইল সেভ করার মূল হ্যান্ডলার (ImgBB আপলোড সহ)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session?.user?.email) return

    try {
      setSaving(true)
      let finalImageUrl = imagePreview || ""

      // যদি নতুন কোনো ছবি সিলেক্ট করা হয়, তাহলে সেটি সরাসরি ImgBB API-তে আপলোড করা হবে
      if (imageFile) {
        const imgFormData = new FormData()
        imgFormData.append("image", imageFile)

        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imgFormData,
          }
        )

        const imgData = await imgRes.json()
        if (imgData.success) {
          finalImageUrl = imgData.data.display_url
        } else {
          toast.error("Failed to upload image to ImgBB")
          setSaving(false)
          return
        }
      }

      // ব্যাকএন্ডের PATCH /users/:email এপিআই কল করে ডাটাবেজে সেভ করা
      const res = await updateUserProfile(session.user.email, {
        name,
        phone,
        bio,
        image: finalImageUrl,
      })

      if (res?.success || res?.modifiedCount > 0 || res?.acknowledged) {
        toast.success("Profile updated successfully!")
        setImageFile(null)
      } else {
        toast.error("Failed to update profile. Please try again.")
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("An error occurred while saving your profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-xs font-medium text-muted-foreground">
          Loading your profile...
        </p>
      </div>
    )
  }

  const role = session?.user?.role || userProfile?.role || "student"
  const plan = session?.user?.plan || userProfile?.plan || "free"

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      {/* পেজ হেডার */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserIcon className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Update Profile
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your account settings, personal bio, phone number, and profile picture.
        </p>
      </div>

      {/* প্রোফাইল এডিটর ফর্ম কার্ড */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-2xs md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ১. প্রোফাইল পিকচার ও ওভারভিউ সেকশন */}
          <div className="flex flex-col items-center gap-6 pb-6 border-b border-border/60 sm:flex-row">
            {/* ছবির প্রিভিউ ও আপলোড বাটন */}
            <div className="relative group">
              <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-muted/40 shadow-sm transition group-hover:border-primary">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt={name || "User Avatar"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl font-extrabold uppercase text-primary">
                    {name ? name.slice(0, 2) : "ML"}
                  </span>
                )}
              </div>

              {/* ক্যামেরা আইকনযুক্ত ফাইল ইনপুট লেবেল */}
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
                title="Upload Photo via ImgBB"
              >
                <Camera className="size-4" />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* ইউজার তথ্য ও ব্যাজ */}
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground">
                {name || "Your Name"}
              </h2>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase">
                  <Shield className="size-3" />
                  <span>{role}</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    plan === "pro"
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "border border-border bg-muted/40 text-muted-foreground"
                  }`}
                >
                  <Sparkles className="size-3" />
                  <span>{plan} PLAN</span>
                </span>
              </div>
            </div>
          </div>

          {/* ২. ইনপুট ফিল্ডস গ্রিড */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <UserIcon className="size-3.5" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Email Address (Read-only) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Mail className="size-3.5" />
                <span>Email Address (Account ID)</span>
              </label>
              <input
                type="email"
                disabled
                value={session?.user?.email || ""}
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Phone className="size-3.5" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +880 1712 345678"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Role & Access (Read-only badge info) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Shield className="size-3.5" />
                <span>Account Role</span>
              </label>
              <input
                type="text"
                disabled
                value={`Verified ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          {/* Bio / About */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="size-3.5" />
              <span>Bio & Introduction</span>
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others a little about yourself, your educational background, or expertise..."
              className="w-full rounded-xl border border-input bg-background p-4 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          {/* ৩. সাবমিট বাটন */}
          <div className="flex justify-end pt-4 border-t border-border/60">
            <Button
              type="submit"
              disabled={saving}
              className="h-11 gap-2 rounded-xl px-6 text-sm font-semibold shadow-xs transition"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Saving to ImgBB & Database...</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfilePage
