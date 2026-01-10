"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";

function ResultsContent() {
    const searchParams = useSearchParams();
    const score = parseInt(searchParams.get("score") || "0");
    const total = parseInt(searchParams.get("total") || "10");
    const correct = parseInt(searchParams.get("correct") || "0");
    const operation = searchParams.get("op") || "addition";
    const difficulty = searchParams.get("diff") || "easy";
    const timeTaken = parseInt(searchParams.get("time") || "0");

    const [xpEarned, setXpEarned] = useState(score);
    const [submitted, setSubmitted] = useState(false);

    const accuracy = Math.round((correct / total) * 100) || 0;

    // Submit results to backend
    useEffect(() => {
        if (submitted) return;

        const submitResults = async () => {
            try {
                const res = await fetch("/api/game/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        operation,
                        difficulty,
                        totalQuestions: total,
                        score,
                        correctCount: correct,
                        timeTakenSeconds: timeTaken
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.xpEarned) setXpEarned(data.xpEarned);
                }
            } catch (error) {
                console.error("Failed to submit results:", error);
            }
            setSubmitted(true);
        };

        submitResults();
    }, [submitted, operation, difficulty, total, score, correct, timeTaken]);

    // Determine rank/feedback based on accuracy
    let rank = "Cadet";
    let message = "Good practice! Keep training.";
    let color = "text-blue-400";

    if (accuracy >= 90) {
        rank = "Commander";
        message = "Outstanding! Mission accomplished perfectly.";
        color = "text-yellow-400";
    } else if (accuracy >= 70) {
        rank = "Captain";
        message = "Great job! You're mastering the coordinates.";
        color = "text-green-400";
    }

    return (
        <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none",
                accuracy >= 90 ? "bg-yellow-500" : accuracy >= 70 ? "bg-green-500" : "bg-blue-500"
            )}></div>

            <main className="relative z-10 w-full max-w-md flex flex-col gap-8 animate-fade-in-up">

                {/* Header Badge */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">trophy</span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Mission Report</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-display mt-2">{rank}</h1>
                    <p className="text-[#9b92c9]">{message}</p>
                </div>

                {/* Main Stats Card */}
                <div className="bg-[#1e1933]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">

                    {/* Circle Progress */}
                    <div className="relative size-40 flex items-center justify-center">
                        <svg className="size-full -rotate-90">
                            <circle cx="80" cy="80" r="70" className="stroke-[#292348]" strokeWidth="12" fill="none" />
                            <circle
                                cx="80" cy="80" r="70"
                                className={clsx("transition-all duration-1000 ease-out",
                                    accuracy >= 90 ? "stroke-yellow-400" : accuracy >= 70 ? "stroke-green-400" : "stroke-blue-400"
                                )}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray="440"
                                strokeDashoffset={440 - (440 * accuracy) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">{accuracy}%</span>
                            <span className="text-xs text-[#9b92c9] uppercase tracking-wider font-bold">Accuracy</span>
                        </div>
                    </div>

                    {/* Stat Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-[#292348]/50 rounded-2xl p-4 flex flex-col items-center gap-1 border border-white/5">
                            <span className="text-[#9b92c9] text-xs font-bold uppercase">Score</span>
                            <span className="text-2xl font-bold text-white">{score}</span>
                        </div>
                        <div className="bg-[#292348]/50 rounded-2xl p-4 flex flex-col items-center gap-1 border border-white/5">
                            <span className="text-[#9b92c9] text-xs font-bold uppercase">Correct</span>
                            <span className="text-2xl font-bold text-white">{correct}/{total}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full">
                    <Link href="/play/setup" className="w-full">
                        <NeonButton fullWidth variant="primary" icon={<span className="material-symbols-outlined">restart_alt</span>}>
                            Play Again
                        </NeonButton>
                    </Link>
                    <Link href="/student" className="w-full">
                        <NeonButton fullWidth variant="secondary" icon={<span className="material-symbols-outlined">home</span>}>
                            Back to Dashboard
                        </NeonButton>
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-white">Calculating...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
