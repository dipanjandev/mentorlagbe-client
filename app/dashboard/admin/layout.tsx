import { requireRole } from "@/lib/actions/server"
import React from "react"

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  // এখানে বলা হল এডমিনের বাইরে আর কাউকে এলাউ করবা না। এটা আবার লিখে রেখেছি server.ts এর মধ্যে।
  await requireRole("admin")
  return children
}

export default AdminDashboardLayout
