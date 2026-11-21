"use server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface IUser {
  _id: string
  name: string
  email: string
  role: "student" | "tutor" | "admin"
  plan?: "free" | "pro"
  image?: string
}

// সব ইউজারের তালিকা আনার জন্য।
export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  })
  return res.json()
}

// ইউজারের রোল পরিবর্তন করার জন্য।
export const updateUserRole = async (
  id: string,
  role: "student" | "tutor" | "admin"
) => {
  const res = await fetch(`${BASE_URL}/users/${id}/role`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ role }),
  })
  return res.json()
}

// ইউজার ডিলিট করার জন্য।
export const deleteUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  })
  return res.json()
}
