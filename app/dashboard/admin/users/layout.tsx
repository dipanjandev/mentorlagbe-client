import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage platform users, update roles, and govern permissions.",
}

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
