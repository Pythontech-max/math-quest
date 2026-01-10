import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get user with profile
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                studentProfile: true
            }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const profile = user.studentProfile;

        // Calculate user's rank
        const rank = profile ? await db.studentProfile.count({
            where: {
                xp: {
                    gt: profile.xp
                }
            }
        }) + 1 : 0;

        // Calculate streak (days with at least one game)
        let streakDays = 0;
        if (profile) {
            const recentSessions = await db.testSession.findMany({
                where: { studentId: profile.id },
                orderBy: { completedAt: "desc" },
                take: 100
            });

            // Count consecutive days
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let checkDate = new Date(today);
            for (let i = 0; i < 365; i++) {
                const dayStart = new Date(checkDate);
                const dayEnd = new Date(checkDate);
                dayEnd.setDate(dayEnd.getDate() + 1);

                const hasGame = recentSessions.some(s =>
                    s.completedAt >= dayStart && s.completedAt < dayEnd
                );

                if (hasGame) {
                    streakDays++;
                    checkDate.setDate(checkDate.getDate() - 1);
                } else if (i > 0) {
                    // Allow missing today but not previous days
                    break;
                } else {
                    checkDate.setDate(checkDate.getDate() - 1);
                }
            }
        }

        // Mock achievements for now - can be calculated based on actual data later
        const achievements = [
            {
                id: 1,
                icon: "bolt",
                title: "Speed Demon",
                desc: "Complete 10 games under 2 min",
                unlocked: (profile?.totalTests || 0) >= 10
            },
            {
                id: 2,
                icon: "target",
                title: "Sharp Shooter",
                desc: "Get 100% accuracy 5 times",
                unlocked: (profile?.avgAccuracy || 0) >= 90
            },
            {
                id: 3,
                icon: "local_fire_department",
                title: "On Fire",
                desc: "7-day streak",
                unlocked: streakDays >= 7
            },
            {
                id: 4,
                icon: "emoji_events",
                title: "Champion",
                desc: "Reach Top 10",
                unlocked: rank <= 10 && rank > 0
            },
        ];

        return NextResponse.json({
            id: user.id,
            name: user.name || "Student",
            email: user.email,
            image: user.image,
            joined: user.createdAt.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
            xp: profile?.xp || 0,
            level: profile?.level || 1,
            rank,
            totalGames: profile?.totalTests || 0,
            accuracy: Math.round(profile?.avgAccuracy || 0),
            streakDays,
            achievements,
            paymentStatus: profile?.paymentStatus || "PENDING"
        });

    } catch (error) {
        console.error("[PROFILE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
