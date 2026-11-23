import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string)
const db = client.db("mentorlagbe-db")

export const auth = betterAuth({
  // Enabled Database
  database: mongodbAdapter(db, {
    client,
  }),

  //   Enabled Email And Password
  emailAndPassword: {
    enabled: true,
  },

  // role ফিল্ডকে চালু করে দিলাম। নাহলে ডাটাবেজ এর মধ্যে ডুকতেছিল না।
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },

  // ব্যাকএন্ড লেভেল সিকিউরিটি গার্ড: কেউ বাইরে থেকে admin পাঠালেও গ্রহণ করবে না
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // পাবলিক রেজিস্ট্রেশনে শুধুমাত্র student অথবা tutor অনুমোদনযোগ্য : টার্নারি অপারেটর এর মাধ্যমে এটাই বলা হচ্ছে।
          const assignedRole = user.role === "tutor" ? "tutor" : "student"

          return {
            data: {
              ...user,
              role: assignedRole,
              plan: "free",
            },
          }
        },
      },
    },
  },
})
