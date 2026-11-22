import { requireRole } from "@/lib/actions/server"
import React from "react"

const TutorDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  // এখানে বলা হল টিউটরের বাইরে আর কাউকে এলাউ করবা না। এটা আবার লিখে রেখেছি server.ts এর মধ্যে।
  await requireRole("tutor")
  return children
}

export default TutorDashboardLayout
