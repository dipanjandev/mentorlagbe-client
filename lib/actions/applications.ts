"use server"
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

export const createApplication = async (payload: IApplicationPayload) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}

// ইমেইল অনুযায়ী আবেদন আনার জন্য।
export const getApplications = async (params: {
  studentEmail?: string
  tutorEmail?: string
}) => {
  // ইমেইলগুলোকে স্ট্রিং বানানোর জন্য।
  const query = new URLSearchParams()
  if (params.studentEmail) query.append("studentEmail", params.studentEmail)
  if (params.tutorEmail) query.append("tutorEmail", params.tutorEmail)

  const res = await fetch(`${BASE_URL}/applications?${query.toString()}`, {
    cache: "no-store",
  })
  return res.json()
}

// টিউটরের দেয়া স্ট্যাটাস।
export const updateApplicationStatus = async (
  id: string,
  status: "accepted" | "rejected"
) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return res.json()
}
