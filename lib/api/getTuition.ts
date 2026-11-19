const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// টিউশনগুলো আনার এপিআই।
export const getTutionApi = async () => {
  const res = await fetch(`${BASE_URL}/tuitions`)
  return res.json()
}
