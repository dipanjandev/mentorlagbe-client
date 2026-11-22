import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new student or tutor account on MentorLagbe.",
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
