import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

// getserver সেশন নেয়ার জন্য। সর্ভার সাইডে যেন পুরো কোড লিখতে না হয় শুধু getSession কল করলেই হয়ে যায় সেজন্য এটা করা হয়েছে nextjs এর নিয়ম অনুসারে।
export const getSession = async () => {
  "use server"
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export const getToken = async () => {
  const session = await getSession()
  if (!session || !session?.session?.token) {
    redirect("/unauthorized")
  }
  return session.session.token
}

export const authFetch = async (api: string, init?: RequestInit) => {
  const token = await getToken()
  const res = await fetch(api, {
    ...init,
    headers: {
      ...init?.headers,
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })
  return res
}

// সার্ভার থেকে সেশন আনার জন্য এই ফাংশন লিখা হয়েছে।
export const requireRole = async (role: string) => {
  const session = await getSession()
  if (!session || session.user.role !== role) {
    redirect("/unauthorized")
  }
  return session
}
