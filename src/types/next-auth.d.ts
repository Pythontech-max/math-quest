import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            role: "ADMIN" | "STUDENT"
            isBlocked: boolean
        } & DefaultSession["user"]
    }
}
