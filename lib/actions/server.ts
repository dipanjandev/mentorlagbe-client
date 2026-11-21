import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// getserver সেশন নেয়ার জন্য। সর্ভার সাইডে যেন পুরো কোড লিখতে না হয় শুধু getSession কল করলেই হয়ে যায় সেজন্য এটা করা হয়েছে nextjs এর নিয়ম অনুসারে।
export const getSession = async () => {
  "use server"
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
