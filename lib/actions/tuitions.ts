"use server"
import { ITuition } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// টিউশন তৈরি করার জন্য।
export const createTuition = async (data: ITuition) => {
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
