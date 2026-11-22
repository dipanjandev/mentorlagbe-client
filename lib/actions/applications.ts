"use server"

import { authFetch } from "./server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface IApplicationPayload {
  tuitionId: string
  tuitionTitle: string
  subject: string
  monthlyFee: number
  tutorEmail: string
  studentName: string
  studentEmail: string
  studentPhone: string
  preferredSchedule: string
  studentNote: string
}

// ১. স্টুডেন্ট কর্তৃক টিউশনে আবেদন সাবমিট করা (authFetch দিয়ে টোকেন সহ)
export const createApplication = async (payload: IApplicationPayload) => {
  const res = await authFetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}

// ২. স্টুডেন্ট বা টিউটরের আবেদন তালিকা লোড করা (নিরাপদে অ্যারে রিটার্ন করে)
export const getApplications = async (params: {
  studentEmail?: string
  tutorEmail?: string
}) => {
  try {
    const query = new URLSearchParams()
    if (params.studentEmail) query.append("studentEmail", params.studentEmail)
    if (params.tutorEmail) query.append("tutorEmail", params.tutorEmail)

    const res = await authFetch(`${BASE_URL}/applications?${query.toString()}`)
    const data = await res.json()
    // ডাটা সঠিক অ্যারে হলে রিটার্ন করবে, অন্যথায় পেজ ক্র্যাশ এড়াতে খালি অ্যারে দিবে
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching applications:", error)
    return []
  }
}

// ৩. টিউটর কর্তৃক আবেদন Accept বা Reject করা (authFetch দিয়ে টোকেন সহ)
export const updateApplicationStatus = async (
  id: string,
  status: "accepted" | "rejected"
) => {
  const res = await authFetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return res.json()
}
