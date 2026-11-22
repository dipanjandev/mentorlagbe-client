"use server"

import { ITuition } from "@/types"
import { authFetch } from "./server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ১. নতুন টিউশন তৈরি করার জন্য (টিউটর authFetch দিয়ে টোকেন সহ)
export const createTuition = async (data: Omit<ITuition, "_id"> | ITuition) => {
  const res = await authFetch(`${BASE_URL}/tuitions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ২. টিউশন ডিলিট করার জন্য (টিউটর authFetch দিয়ে টোকেন সহ)
export const deleteTuition = async (tuitionId: string) => {
  const res = await authFetch(`${BASE_URL}/tuitions/${tuitionId}`, {
    method: "DELETE",
  })
  return res.json()
}

// ৩. টিউশন এডিট ও এক্টিভ/ক্লোজড আপডেট করার জন্য (টিউটর)
export const updateTuition = async (
  tuitionId: string,
  updatedData: Partial<ITuition>
) => {
  const res = await authFetch(`${BASE_URL}/tuitions/${tuitionId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  return res.json()
}

// ৪. টিউশনের অ্যাপ্রুভাল স্ট্যাটাস আপডেট করার জন্য (অ্যাডমিন মডারেশন)
export const updateTuitionStatus = async (
  tuitionId: string,
  status: "approved" | "rejected" | "pending"
) => {
  const res = await authFetch(`${BASE_URL}/tuitions/${tuitionId}/status`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

// ৫. নির্দিষ্ট টিউটরের সর্বমোট পোস্ট সংখ্যা কাউন্ট করার এপিআই
export const getTuitionsCount = async (tutorEmail: string) => {
  const res = await authFetch(
    `${BASE_URL}/tuitions/count?tutorEmail=${tutorEmail}`
  )
  return res.json()
}
