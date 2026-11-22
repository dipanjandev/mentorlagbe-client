"use client"

import React, { useEffect, useState } from "react"
import { authClient, useSession } from "@/lib/auth-client"
import { getUserByEmail, updateUserProfile } from "@/lib/actions/users"
import { Camera, Loader2, Mail, Phone, Save, Shield, User } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import NavBar from "@/components/NavBar"

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY

const ProfilePage = () => {
  const { data: session } = useSession()
  const userEmail = session?.user?.email

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState("")
  const [role, setRole] = useState("student")
  const [loading, setLoading] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)

  // ১. পেজ লোড হলে ডাটাবেজ থেকে ইউজারের বর্তমান তথ্য আনা
  useEffect(() => {
    if (!userEmail) return

    const loadProfile = async () => {
      try {
        setLoading(true)
        const dbUser = await getUserByEmail(userEmail)
        if (dbUser) {
          setName(dbUser.name || "")
          setPhone(dbUser.phone || "")
          setBio(dbUser.bio || "")
          setImage(dbUser.image || "")
          setRole(dbUser.role || "student")
        }
      } catch {
        toast.error("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [userEmail])

  // ২. ImgBB-তে প্রোফাইল ছবি আপলোড হ্যান্ডলার
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await res.json()

      if (data.success) {
        setImage(data.data.display_url)
        toast.success("Photo uploaded! Click Save Changes to update.")
      } else {
        toast.error("Image upload failed")
      }
    } catch {
      toast.error("Error uploading image")
    } finally {
      setUploadingImage(false)
    }
  }

  // ৩. ফর্ম সাবমিট ও প্রোফাইল সেভ হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userEmail) return

    try {
      setSaving(true)

      // ক. MongoDB-তে নাম, ফোন, বায়ো ও ছবি আপডেট করা
      await updateUserProfile(userEmail, { name, phone, bio, image })

      // খ. BetterAuth সেশন আপডেট করা (যাতে নেভবারে সাথে সাথে নাম ও ছবি বদলে যায়)
      await authClient.updateUser({
        name,
        image,
      })

      toast.success("Profile updated successfully!")
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-87.5 items-center justify-center text-sm text-gray-500">
        Loading profile...
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
        {/* হেডার কার্ড */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:flex-row">
          <div className="relative">
            {image ? (
              <Image
                height={200}
                width={200}
                src={image}
                alt={name}
                className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-2xl font-bold text-white uppercase">
                {name?.slice(0, 2) || "ML"}
              </div>
            )}

            {/* ছবি পরিবর্তনের ক্যামেরা বাটন */}
            <label
              htmlFor="avatar-upload"
              className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-emerald-600 p-2 text-white shadow-md transition-colors hover:bg-emerald-700"
              title="Upload new photo"
            >
              {uploadingImage ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
              <Mail className="h-4 w-4" />
              {userEmail}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1 sm:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300 capitalize">
                <Shield className="h-3 w-3" />
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* এডিট ফর্ম */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xs"
        >
          <h2 className="border-b border-border pb-3 text-lg font-bold text-foreground">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +880 1700-000000"
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Email (Read-Only) */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Email Address (Cannot be changed)
            </label>
            <input
              type="email"
              disabled
              value={userEmail || ""}
              className="w-full cursor-not-allowed rounded-lg border border-border bg-muted px-3.5 py-2 text-sm text-muted-foreground"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Bio / Academic Background
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio about your subjects, experience, or learning goals..."
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
