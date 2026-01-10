import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { authConfig } from "./auth.config"
// Force rebuild after removing AUTH_URL

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    trustHost: true,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" }, // Required for middleware compatibility with database
    debug: true,
    callbacks: {
        ...authConfig.callbacks,
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub || "";

                // Fetch user role from DB if possible using the ID
                const dbUser = await db.user.findUnique({
                    where: { id: token.sub },
                    select: { role: true, isBlocked: true }
                });
                session.user.role = dbUser?.role || "STUDENT";
                session.user.isBlocked = dbUser?.isBlocked || false;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
})
