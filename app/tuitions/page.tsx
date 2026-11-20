import { getTutionApi } from "@/lib/api/getTuition"
import React from "react"

const BrowseTuitionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  //   console.log("search params", query)
  const tuition = await getTutionApi(query)
  //   console.log(tuition)

  return (
    <div>
      <p>Browse Tuition</p>
      <ul>
        {tuition.map((singleTuition) => (
          <li key={singleTuition._id}>{singleTuition.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default BrowseTuitionPage
