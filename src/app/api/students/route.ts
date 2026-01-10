import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search");

        const students = await db.user.findMany({
            where: {
                role: "STUDENT",
                OR: search ? [
                    { name: { contains: search } },
                    { email: { contains: search } },
                ] : undefined,
            },
            include: {
                studentProfile: true, // Fetch XP, payment status, etc.
            },
            orderBy: {
                name: "asc",
            },
        });

        // Transform data to match frontend expectation
        const formattedStudents = students.map(s => ({
            id: s.id,
            name: s.name,
            email: s.email,
            role: s.role,
            status: s.isBlocked ? "blocked" : "active",
            joined: s.createdAt.toISOString().split("T")[0],
            // Profile data
            xp: s.studentProfile?.xp || 0,
            accuracy: s.studentProfile?.avgAccuracy || 0,
            paymentStatus: s.studentProfile?.paymentStatus || "PENDING",
            isPaid: s.studentProfile?.paymentStatus === "ACTIVE",
            lastPaymentDate: s.studentProfile?.nextPayment
                ? new Date(s.studentProfile.nextPayment.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                : null
        }));

        return NextResponse.json(formattedStudents);
    } catch (error) {
        console.error("[STUDENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body; // Password logic would need hashing

        // Simplified creation
        const student = await db.user.create({
            data: {
                name,
                email,
                role: "STUDENT",
                studentProfile: {
                    create: {
                        xp: 0,
                        avgAccuracy: 0,
                        paymentStatus: "PENDING"
                    }
                }
            }
        });

        return NextResponse.json(student);
    } catch (error) {
        console.error("[STUDENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
