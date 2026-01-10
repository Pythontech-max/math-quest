import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        // Allow anonymous submissions for demo, but save to user if logged in
        const body = await req.json();
        const {
            operation,
            difficulty,
            totalQuestions,
            score,
            correctCount,
            timeTakenSeconds,
            results // Array of { question, userAnswer, correctAnswer, isCorrect, timeTakenMs }
        } = body;

        const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
        const xpEarned = score; // XP equals score for now

        // If user is logged in, save to their profile
        if (session?.user?.id) {
            // Get or create student profile
            let profile = await db.studentProfile.findUnique({
                where: { userId: session.user.id }
            });

            if (!profile) {
                profile = await db.studentProfile.create({
                    data: {
                        userId: session.user.id,
                        xp: 0,
                        level: 1,
                        totalTests: 0,
                        avgAccuracy: 0
                    }
                });
            }

            // Create test session
            const testSession = await db.testSession.create({
                data: {
                    studentId: profile.id,
                    type: operation.toUpperCase(),
                    difficulty: difficulty.toUpperCase(),
                    totalQuestions,
                    score,
                    accuracy,
                    timeTakenSeconds,
                    results: results ? {
                        create: results.map((r: any) => ({
                            question: r.question,
                            userAnswer: r.userAnswer,
                            correctAnswer: r.correctAnswer,
                            isCorrect: r.isCorrect,
                            timeTakenMs: r.timeTakenMs || 0
                        }))
                    } : undefined
                }
            });

            // Update student profile stats
            const newTotalTests = profile.totalTests + 1;
            const newAvgAccuracy = ((profile.avgAccuracy * profile.totalTests) + accuracy) / newTotalTests;
            const newXp = profile.xp + xpEarned;
            const newLevel = Math.floor(newXp / 1000) + 1; // Level up every 1000 XP

            await db.studentProfile.update({
                where: { id: profile.id },
                data: {
                    xp: newXp,
                    level: newLevel,
                    totalTests: newTotalTests,
                    avgAccuracy: newAvgAccuracy
                }
            });

            return NextResponse.json({
                success: true,
                sessionId: testSession.id,
                xpEarned,
                newTotalXp: newXp,
                newLevel
            });
        }

        // Anonymous user - just return success without saving
        return NextResponse.json({
            success: true,
            xpEarned,
            message: "Sign in to save your progress!"
        });

    } catch (error) {
        console.error("[GAME_SUBMIT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
