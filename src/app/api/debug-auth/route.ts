import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        hasClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        authUrl: process.env.AUTH_URL,
        authSecretExists: !!process.env.AUTH_SECRET,
        clientIdStart: process.env.GOOGLE_CLIENT_ID?.substring(0, 5)
    });
}
