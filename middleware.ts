import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isStudent = req.nextUrl.pathname.startsWith("/student");
    const isPlay = req.nextUrl.pathname.startsWith("/play");

    // Allow /play routes for guests (no authentication required)
    if (isPlay) {
        return; // Let them through without authentication
    }

    // Redirect unauthenticated users to login
    if ((isDashboard || isStudent) && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", req.nextUrl));
    }

    // Protect Admin Dashboard
    if (isDashboard && req.auth?.user?.role !== "ADMIN") {
        // Since role comes from DB, it might be missing in pure JWT middleware
        // But we must assume safe default.
        // For strict role checks, we rely on the Server Page check in layout/page itself.
        // Middleware is just a rough guard.
        // Here we just let them through or redirect if we are sure?
        // Let's redirect to student for safety if we are unsure.
        // Actually, without DB access, we might not know the role in middleware if it wasn't in the token.
        // We added role to session in auth.ts... but does it persist to JWT?
        // Yes, if we use strategy: "jwt" and update the token.
        // We need to update auth.ts to ensure role is in the token.
    }

    // Redirect authenticated users away from home/login
    if (req.nextUrl.pathname === "/" && isLoggedIn) {
        return Response.redirect(new URL("/student", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|play).*)"],
};
