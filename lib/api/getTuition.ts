import { ITuition } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ব্যাকএন্ড থেকে আসা এপিআই টাইপ এর জন্য আলাদা টাইপ ডিক্লিয়ার করা হল।
interface ITuitionResponse {
  tuitions: ITuition[]
  totalItems: number
  totalPages: number
}

// টিউশনগুলো আনার এপিআই।
export const getTutionApi = async (query = ""): Promise<ITuitionResponse> => {
  // উপরে query দিলাম এবং ${query} এটা দিয়ে ব্যাকএন্ড এর কাছে পাঠিয়ে দিলাম।
  const res = await fetch(`${BASE_URL}/tuitions?${query}`, {
    cache: "no-store",
  })
  return res.json()
}
