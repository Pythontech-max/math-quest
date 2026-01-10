import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const days = parseInt(url.searchParams.get("days") || "7");

        const dateFilter = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        // Get all test sessions in the timeframe
        const sessions = await db.testSession.findMany({
            where: {
                completedAt: {
                    gte: dateFilter
                }
            },
            include: {
                student: {
                    include: {
                        user: true
                    }
                }
            }
        });

        // Calculate stats
        const totalSessions = sessions.length;
        const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
        const avgAccuracy = sessions.length > 0
            ? Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length)
            : 0;
        const avgSessionTime = sessions.length > 0
            ? Math.round(sessions.reduce((sum, s) => sum + s.timeTakenSeconds, 0) / sessions.length)
            : 0;

        // Group by day of week
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weeklyData = dayNames.map(day => ({ day, sessions: 0, accuracy: 0, count: 0 }));

        sessions.forEach(session => {
            const dayIndex = session.completedAt.getDay();
            weeklyData[dayIndex].sessions++;
            weeklyData[dayIndex].accuracy += session.accuracy;
            weeklyData[dayIndex].count++;
        });

        // Calculate average accuracy per day
        weeklyData.forEach(day => {
            if (day.count > 0) {
                day.accuracy = Math.round(day.accuracy / day.count);
            }
        });

        // Group by operation
        const operationStats: Record<string, { sessions: number; accuracy: number; count: number }> = {
            ADDITION: { sessions: 0, accuracy: 0, count: 0 },
            SUBTRACTION: { sessions: 0, accuracy: 0, count: 0 },
            MULTIPLICATION: { sessions: 0, accuracy: 0, count: 0 },
            DIVISION: { sessions: 0, accuracy: 0, count: 0 },
        };

        sessions.forEach(session => {
            if (operationStats[session.type]) {
                operationStats[session.type].sessions++;
                operationStats[session.type].accuracy += session.accuracy;
                operationStats[session.type].count++;
            }
        });

        const operationData = [
            { name: "Addition", ...operationStats.ADDITION, color: "bg-green-500" },
            { name: "Subtraction", ...operationStats.SUBTRACTION, color: "bg-blue-500" },
            { name: "Multiplication", ...operationStats.MULTIPLICATION, color: "bg-purple-500" },
            { name: "Division", ...operationStats.DIVISION, color: "bg-orange-500" },
        ].map(op => ({
            ...op,
            accuracy: op.count > 0 ? Math.round(op.accuracy / op.count) : 0
        }));

        // Get top students
        const students = await db.studentProfile.findMany({
            include: {
                user: true
            },
            orderBy: {
                xp: "desc"
            },
            take: 5
        });

        const topStudents = students.map(s => ({
            name: s.user.name || "Unknown",
            xp: s.xp,
            accuracy: Math.round(s.avgAccuracy),
            games: s.totalTests
        }));

        return NextResponse.json({
            totalSessions,
            totalQuestions,
            avgAccuracy,
            avgSessionTime,
            weeklyData: weeklyData.slice(1).concat(weeklyData[0]), // Start from Monday
            operationStats: operationData,
            topStudents
        });

    } catch (error) {
        console.error("[REPORTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
