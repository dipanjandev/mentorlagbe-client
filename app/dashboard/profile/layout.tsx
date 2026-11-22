import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Update Profile",
  description: "Manage your personal profile information, bio, and profile photo.",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
