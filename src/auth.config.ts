import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig = {
    providers: [
        Google({
            clientId: "596084116048-emhhqvlfj39o0uqr0poirhplt264us4h.apps.googleusercontent.com",
            clientSecret: "pWq2OREY1Usuf6_oJb1Ot1GHVhtE",
        })
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // return Response.redirect(new URL('/dashboard', nextUrl));
                // We handle redirects in middleware.ts or logic, but authorized callback is key
            }
            return true;
        },
    },
} satisfies NextAuthConfig;
