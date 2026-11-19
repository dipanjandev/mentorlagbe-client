"use client"

import React, { useState } from "react"
import {
  BookOpen,
  Calendar,
  DollarSign,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react"
import { createTuition } from "@/lib/actions/tuitions"
import { TTuitionMode } from "@/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const PostTuitionPage = () => {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Handle image selection preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  // Form submission handler using standard FormData
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const imageFile = formData.get("bannerImage") as File

    // imagebb তে আপলোডের প্রসেস এবং লিংক বের করার কাজ।
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
    const bannerImage = imgData.data.display_url

    // Requirement-aligned collected data object
    const tuitionData = {
      title: formData.get("title") as string,
      subject: formData.get("subject") as string,
      classLevel: formData.get("classLevel") as string,
      //   এখানে TTuitionMode দিয়ে টাইপ দেয়া হল।
      mode: formData.get("mode") as TTuitionMode,
      location: formData.get("location") as string,
      monthlyFee: Number(formData.get("monthlyFee")),
      daysPerWeek: Number(formData.get("daysPerWeek")),
      bannerImage,
      description: formData.get("description") as string,
    }

    // console.log("Collected Tuition Data ready for API / ImgBB:", tuitionData)

    // TODO: Apply your custom functionality here (e.g., ImgBB upload & API call)
    const result = await createTuition(tuitionData)
    // console.log(result)
    if (result.insertedId) {
      toast.success("Tuition posted successfully!")
      router.push("/dashboard/tutor/my-tuitions")
    }
  }

  return (
    <div className="w-full p-10">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Post a New Tuition
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new subject batch or 1-on-1 mentorship listing for
            interested students.
          </p>
        </div>

        {/* Plan Limit Badge */}
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          <span>Free Plan: 2 Posts Max | Pro Plan: Unlimited</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <div className="border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground">
                Basic Information
              </h2>
              <p className="text-xs text-muted-foreground">
                Provide the core details of your tuition post.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Tuition Title */}
              <div className="col-span-2 space-y-1.5">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-foreground"
                >
                  Tuition Title <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. HSC Higher Math & Physics Specialized Batch"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <Layers className="size-4 text-muted-foreground" />
                  <span>
                    Subject <span className="text-destructive">*</span>
                  </span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Mathematics, Physics, ICT, English"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              {/* Class Level */}
              <div className="space-y-1.5">
                <label
                  htmlFor="classLevel"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <GraduationCap className="size-4 text-muted-foreground" />
                  <span>
                    Class Level <span className="text-destructive">*</span>
                  </span>
                </label>
                <select
                  id="classLevel"
                  name="classLevel"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="" disabled>
                    Select class level
                  </option>
                  <option value="Class 1-5">Class 1-5 (Primary)</option>
                  <option value="Class 6-8">Class 6-8 (Junior)</option>
                  <option value="Class 9-10">Class 9-10 (SSC)</option>
                  <option value="HSC">Class 11-12 (HSC)</option>
                  <option value="O-Levels">O-Levels (Cambridge/Edexcel)</option>
                  <option value="A-Levels">A-Levels (Cambridge/Edexcel)</option>
                  <option value="Admission">University Admission</option>
                  <option value="Undergraduate">Undergraduate / Diploma</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Tuition Logistics & Schedule */}
          <div className="space-y-4">
            <div className="border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground">
                Logistics & Pricing
              </h2>
              <p className="text-xs text-muted-foreground">
                Set tuition mode, preferred schedule, and monthly fees.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Mode */}
              <div className="space-y-1.5">
                <label
                  htmlFor="mode"
                  className="text-sm font-medium text-foreground"
                >
                  Tuition Mode <span className="text-destructive">*</span>
                </label>
                <select
                  id="mode"
                  name="mode"
                  required
                  defaultValue="Online"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="Online">Online (Live Class)</option>
                  <option value="Offline">Offline (Home / In-Person)</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label
                  htmlFor="location"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>
                    Location <span className="text-destructive">*</span>
                  </span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Dhanmondi, Dhaka or Online Platform (Google Meet)"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              {/* Monthly Fee */}
              <div className="space-y-1.5">
                <label
                  htmlFor="monthlyFee"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span>
                    Monthly Fee (৳ / USD){" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                <input
                  id="monthlyFee"
                  name="monthlyFee"
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 3500"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              {/* Days Per Week */}
              <div className="space-y-1.5">
                <label
                  htmlFor="daysPerWeek"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>
                    Days Per Week <span className="text-destructive">*</span>
                  </span>
                </label>
                <select
                  id="daysPerWeek"
                  name="daysPerWeek"
                  required
                  defaultValue="3"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="1">1 Day / Week</option>
                  <option value="2">2 Days / Week</option>
                  <option value="3">3 Days / Week</option>
                  <option value="4">4 Days / Week</option>
                  <option value="5">5 Days / Week</option>
                  <option value="6">6 Days / Week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Media & Detailed Description */}
          <div className="space-y-4">
            <div className="border-b border-border/60 pb-3">
              <h2 className="text-base font-semibold text-foreground">
                Media & Description
              </h2>
              <p className="text-xs text-muted-foreground">
                Upload a cover banner and describe the tuition details.
              </p>
            </div>

            {/* Banner Image Upload */}
            <div className="space-y-2">
              <label
                htmlFor="bannerImage"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <ImageIcon className="size-4 text-muted-foreground" />
                <span>
                  Banner Image (ImgBB API){" "}
                  <span className="text-destructive">*</span>
                </span>
              </label>

              <div className="flex items-center gap-6">
                <label
                  htmlFor="bannerImage"
                  className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-input bg-muted/20 px-6 py-6 transition hover:border-primary hover:bg-muted/40"
                >
                  <Upload className="mb-2 size-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Click to select an image
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG, or WEBP (Max 5MB)
                  </span>
                  <input
                    id="bannerImage"
                    name="bannerImage"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {/* Preview Box */}
                {imagePreview && (
                  <div className="relative size-28 overflow-hidden rounded-xl border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Banner Preview"
                      className="size-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Tuition Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                placeholder="Write about what you will cover, prerequisites, class schedule time, study materials provided, and mentor experience..."
                className="w-full resize-y rounded-xl border border-input bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-border/60 pt-6">
            <button
              type="reset"
              onClick={() => setImagePreview(null)}
              className="rounded-xl border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <Sparkles className="size-4" />
              <span>Publish Tuition</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostTuitionPage
