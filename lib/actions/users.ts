"use server"

import { authFetch } from "./server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface IUser {
  _id: string
  name: string
  email: string
  role: "student" | "tutor" | "admin"
  plan?: "free" | "pro"
  image?: string
  phone?: string
  bio?: string
}

// ১. প্ল্যাটফর্মের সব ইউজারের তালিকা আনার জন্য (শুধুমাত্র অ্যাডমিন authFetch দিয়ে)
export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const res = await authFetch(`${BASE_URL}/users`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// ২. ইউজারের রোল পরিবর্তন করার জন্য (শুধুমাত্র অ্যাডমিন authFetch দিয়ে)
export const updateUserRole = async (
  id: string,
  role: "student" | "tutor" | "admin"
) => {
  const res = await authFetch(`${BASE_URL}/users/${id}/role`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ role }),
  })
  return res.json()
}

// ৩. ইউজার ডিলিট করার জন্য (শুধুমাত্র অ্যাডমিন authFetch দিয়ে)
export const deleteUser = async (id: string) => {
  const res = await authFetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  })
  return res.json()
}

// ৪. ইমেইল দিয়ে ইউজারের প্রোফাইল তথ্য আনার জন্য (authFetch দিয়ে)
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const res = await authFetch(`${BASE_URL}/users/${email}`)
    return res.json()
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

// ৫. ইউজারের নিজের প্রোফাইল আপডেট করার জন্য (নাম, ফোন, বায়ো, ছবি)
export const updateUserProfile = async (
  email: string,
  payload: { name: string; phone: string; bio: string; image: string }
) => {
  const res = await authFetch(`${BASE_URL}/users/${email}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })
  return res.json()
}
