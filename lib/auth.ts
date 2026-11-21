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
})
