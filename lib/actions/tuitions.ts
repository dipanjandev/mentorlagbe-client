"use server"
import { ITuition } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// টিউশন তৈরি করার জন্য।
export const createTuition = async (data: Omit<ITuition, "_id"> | ITuition) => {
  const res = await fetch(`${BASE_URL}/tuitions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

// টিউশন ডিলিট করার জন্য।
export const deleteTuition = async (tuitionId: string) => {
  const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}`, {
    method: "DELETE",
  })
  return res.json()
}

// টিউশন আপডেট করার জন্য।
export const updateTuition = async (
  tuitionId: string,
  updatedData: Partial<ITuition>
) => {
  const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  return res.json()
}

// টিউশনের অ্যাপ্রুভাল স্ট্যাটাস আপডেট করার জন্য (অ্যাডমিন মডারেশন)
export const updateTuitionStatus = async (
  tuitionId: string,
  status: "approved" | "rejected" | "pending"
) => {
  const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}/status`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

// টিউশন কাউন্ট করার জন্য এপিআই।
export const getTuitionsCount = async (tutorEmail: string) => {
  const res = await fetch(
    `${BASE_URL}/tuitions/count?tutorEmail=${tutorEmail}`,
    {
      cache: "no-store",
    }
  )
  return res.json()
}
