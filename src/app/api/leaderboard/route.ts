import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const timeframe = url.searchParams.get("timeframe") || "weekly";

        // Calculate date filter based on timeframe
        let dateFilter: Date | undefined;
        const now = new Date();

        if (timeframe === "weekly") {
            dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (timeframe === "monthly") {
            dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        // "alltime" = no date filter

        // Get students with their profiles, ordered by XP
        const students = await db.user.findMany({
            where: {
                role: "STUDENT",
                isBlocked: false,
                studentProfile: {
                    isNot: null
                }
            },
            include: {
                studentProfile: {
                    include: {
                        testSessions: dateFilter ? {
                            where: {
                                completedAt: {
                                    gte: dateFilter
                                }
                            }
                        } : true
                    }
                }
            }
        });

        // Calculate XP for the timeframe
        const leaderboardData = students
            .map(student => {
                const profile = student.studentProfile;
                if (!profile) return null;

                let xp: number;
                let games: number;
                let accuracy: number;

                if (timeframe === "alltime") {
                    // Use stored profile values
                    xp = profile.xp;
                    games = profile.totalTests;
                    accuracy = profile.avgAccuracy;
                } else {
                    // Calculate from filtered sessions
                    const sessions = profile.testSessions || [];
                    xp = sessions.reduce((sum, s) => sum + s.score, 0);
                    games = sessions.length;
                    accuracy = sessions.length > 0
                        ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
                        : 0;
                }

                return {
                    id: student.id,
                    name: student.name || "Anonymous",
                    avatar: (student.name || "A").charAt(0).toUpperCase(),
                    image: student.image,
                    xp,
                    games,
                    accuracy: Math.round(accuracy)
                };
            })
            .filter(Boolean)
            .sort((a, b) => (b?.xp || 0) - (a?.xp || 0))
            .slice(0, 50) // Top 50
            .map((student, index) => ({
                ...student,
                rank: index + 1
            }));

        return NextResponse.json(leaderboardData);

    } catch (error) {
        console.error("[LEADERBOARD_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
