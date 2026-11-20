import { ITuition } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// টিউশনগুলো আনার এপিআই।
export const getTutionApi = async (query = ""): Promise<ITuition[]> => {
  // উপরে query দিলাম এবং ${query} এটা দিয়ে ব্যাকএন্ড এর কাছে পাঠিয়ে দিলাম।
  const res = await fetch(`${BASE_URL}/tuitions?${query}`)
  return res.json()
}
