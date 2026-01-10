import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get("limit") || "10");

        // Get user's student profile
        const profile = await db.studentProfile.findUnique({
            where: { userId: session.user.id }
        });

        if (!profile) {
            return NextResponse.json([]);
        }

        // Get recent test sessions
        const sessions = await db.testSession.findMany({
            where: { studentId: profile.id },
            orderBy: { completedAt: "desc" },
            take: limit
        });

        // Format for frontend
        const history = sessions.map(s => ({
            id: s.id,
            operation: s.type,
            difficulty: s.difficulty,
            date: s.completedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            score: s.score,
            accuracy: Math.round(s.accuracy),
            correct: Math.round((s.accuracy / 100) * s.totalQuestions),
            total: s.totalQuestions,
            timeTaken: s.timeTakenSeconds
        }));

        return NextResponse.json(history);

    } catch (error) {
        console.error("[PROFILE_HISTORY_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
