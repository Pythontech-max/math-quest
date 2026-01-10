import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const student = await db.user.findUnique({
            where: { id: params.id },
            include: { studentProfile: true }
        });

        if (!student) return new NextResponse("Not Found", { status: 404 });

        return NextResponse.json(student);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { isPaid, isBlocked } = body;

        // Handle Payment Toggle
        if (isPaid !== undefined) {
            await db.studentProfile.update({
                where: { userId: params.id },
                data: {
                    paymentStatus: isPaid ? "ACTIVE" : "PENDING",
                    nextPayment: isPaid ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null // Add 30 days
                }
            });
        }

        // Handle Block/Unblock
        if (isBlocked !== undefined) {
            await db.user.update({
                where: { id: params.id },
                data: { isBlocked }
            });
        }

        return new NextResponse("Updated", { status: 200 });
    } catch (error) {
        console.error("[STUDENT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.user.delete({
            where: { id: params.id }
        });

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
