import { ITuition } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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

export const deleteJob = async (tuitionId: string) => {
  const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}`, {
    method: "DELETE",
  })
  return res.json()
}
