import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const status = url.searchParams.get("status");

        // Get all students with payment info
        const students = await db.user.findMany({
            where: {
                role: "STUDENT",
                studentProfile: {
                    isNot: null
                }
            },
            include: {
                studentProfile: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // Transform to payment records
        // In real app, you'd have a separate Payment model
        // For now, we derive payment status from studentProfile
        const payments = students
            .filter(s => s.studentProfile)
            .map((student, index) => {
                const profile = student.studentProfile!;
                const isPaid = profile.paymentStatus === "ACTIVE";

                // Determine plan based on payment cycle
                let plan = "Basic";
                let amount = 9.99;
                if (profile.paymentCycle === "ANNUAL") {
                    plan = "Annual";
                    amount = 99.99;
                } else if (isPaid) {
                    plan = "Pro";
                    amount = 19.99;
                }

                // Mock date - in real app this would come from payment records
                const paymentDate = profile.nextPayment
                    ? new Date(profile.nextPayment.getTime() - 30 * 24 * 60 * 60 * 1000)
                    : student.createdAt;

                return {
                    id: index + 1,
                    student: student.name || "Unknown",
                    email: student.email || "",
                    plan,
                    amount,
                    date: paymentDate.toISOString().split("T")[0],
                    status: profile.paymentStatus === "ACTIVE" ? "completed"
                        : profile.paymentStatus === "PENDING" ? "pending"
                            : "failed"
                };
            })
            .filter(p => !status || status === "all" || p.status === status);

        // Calculate stats
        const completedPayments = payments.filter(p => p.status === "completed");
        const pendingPayments = payments.filter(p => p.status === "pending");
        const failedPayments = payments.filter(p => p.status === "failed");

        const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
        const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

        return NextResponse.json({
            payments,
            stats: {
                totalRevenue,
                pendingAmount,
                totalTransactions: payments.length,
                failedCount: failedPayments.length
            }
        });

    } catch (error) {
        console.error("[PAYMENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { studentId, status } = body;

        // Update student payment status
        await db.studentProfile.update({
            where: { userId: studentId },
            data: {
                paymentStatus: status,
                nextPayment: status === "ACTIVE"
                    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    : null
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("[PAYMENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
