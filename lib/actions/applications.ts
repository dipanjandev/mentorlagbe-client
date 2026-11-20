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
