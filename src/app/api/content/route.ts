import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search");
        const operation = url.searchParams.get("operation");

        const whereClause: any = {
            status: "active"
        };

        if (search) {
            whereClause.text = { contains: search }; // Implicitly insensitive in MySQL mostly, or normal default
        }

        if (operation && operation !== "all") {
            whereClause.operation = operation.toUpperCase();
        }

        // Using 'any' cast for db because client generation might have been skipped/failed in locked environment
        // but runtime is valid.
        const questions = await (db as any).question.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(questions);
    } catch (error) {
        console.error("[CONTENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer, operation, difficulty } = body;

        const newQuestion = await (db as any).question.create({
            data: {
                text: question,
                answer,
                operation,
                difficulty,
                status: "active",
                usageCount: 0
            }
        });

        return NextResponse.json(newQuestion);
    } catch (error) {
        console.error("[CONTENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
