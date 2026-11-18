import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient("mongodb://localhost:27017/database")
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
})
