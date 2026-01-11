"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { StudentHeader } from "@/components/ui/StudentHeader";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupPage() {
    const router = useRouter();
    const [operation, setOperation] = useState("addition");
    const [difficulty, setDifficulty] = useState("easy");
    const [questions, setQuestions] = useState("10");

    const handleStart = () => {
        // Navigate with query params
        const params = new URLSearchParams({
            op: operation,
            diff: difficulty,
            count: questions,
        });
        router.push(`/play/game?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center">
            {/* Top Header with Theme & Logout */}
            <div className="w-full max-w-[600px]">
                <StudentHeader title="Mission Control" />
            </div>

            <main className="flex-1 px-6 py-8 flex flex-col gap-10 w-full max-w-[600px] mb-24">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-white leading-tight">Configure Mission</h2>
                    <p className="text-[#9b92c9] text-sm font-normal">
                        Prepare your ship for the next math quadrant.
                    </p>
                </div>

                {/* Operation */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">calculate</span>
                        <h3 className="text-white text-lg font-bold">Select Operation</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: "addition", label: "Addition", icon: "add" },
                            { id: "subtraction", label: "Subtraction", icon: "remove" },
                            { id: "multiplication", label: "Multiplication", icon: "close" },
                            { id: "division", label: "Division", icon: "percent" },
                            { id: "place_values", label: "Place Values", icon: "pin" },
                        ].map((op) => (
                            <label key={op.id} className="cursor-pointer group">
                                <input
                                    type="radio"
                                    name="operation"
                                    value={op.id}
                                    checked={operation === op.id}
                                    onChange={(e) => setOperation(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={clsx(
                                        "selection-card border rounded-2xl p-4 flex flex-col items-center gap-3 h-full transition-all",
                                        operation === op.id
                                            ? "bg-primary/10 border-primary shadow-[0_0_20px_-5px_rgba(55,19,236,0.6)]"
                                            : "bg-[#1e1933] border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "icon-wrapper size-12 rounded-full flex items-center justify-center transition-colors",
                                            operation === op.id ? "bg-primary text-white" : "bg-[#292348] text-[#9b92c9]"
                                        )}
                                    >
                                        <span className="material-symbols-outlined text-3xl">{op.icon}</span>
                                    </div>
                                    <span className="font-bold text-white">{op.label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Difficulty */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">
                            signal_cellular_alt
                        </span>
                        <h3 className="text-white text-lg font-bold">Difficulty Level</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { id: "easy", label: "Rookie", sub: "Numbers 1-10", icon: "sentiment_satisfied", color: "text-green-400" },
                            { id: "medium", label: "Cadet", sub: "Numbers 1-50", icon: "sentiment_neutral", color: "text-yellow-400" },
                            { id: "hard", label: "Commander", sub: "Numbers 1-100", icon: "sentiment_very_dissatisfied", color: "text-red-400" },
                        ].map((d) => (
                            <label key={d.id} className="cursor-pointer w-full">
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={d.id}
                                    checked={difficulty === d.id}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={clsx(
                                        "selection-card border rounded-xl p-4 flex items-center justify-between transition-all",
                                        difficulty === d.id
                                            ? "bg-primary/10 border-primary shadow-[0_0_20px_-5px_rgba(55,19,236,0.6)]"
                                            : "bg-[#1e1933] border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={clsx(
                                                "icon-wrapper size-10 rounded-full bg-[#292348] flex items-center justify-center transition-colors",
                                                d.color
                                            )}
                                        >
                                            <span className="material-symbols-outlined">{d.icon}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">{d.label}</span>
                                            <span className="text-[#9b92c9] text-xs">{d.sub}</span>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(
                                            "size-6 rounded-full border-2 flex items-center justify-center",
                                            difficulty === d.id ? "border-primary" : "border-[#292348]"
                                        )}
                                    >
                                        {difficulty === d.id && (
                                            <div className="size-2.5 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Questions */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">list_alt</span>
                        <h3 className="text-white text-lg font-bold">Mission Length</h3>
                    </div>
                    <div className="bg-[#1e1933] p-2 rounded-2xl border border-white/5 flex justify-between gap-1">
                        {["5", "10", "20", "50"].map((q) => (
                            <label key={q} className="cursor-pointer flex-1">
                                <input
                                    type="radio"
                                    name="questions"
                                    value={q}
                                    checked={questions === q}
                                    onChange={(e) => setQuestions(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={clsx(
                                        "h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                                        questions === q
                                            ? "bg-white/10 text-white"
                                            : "text-[#9b92c9] hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {q}
                                </div>
                            </label>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <div className="fixed bottom-0 w-full max-w-[600px] p-6 z-40">
                <NeonButton fullWidth onClick={handleStart} variant="primary" icon={<span className="material-symbols-outlined">arrow_forward</span>}>
                    Start Mission
                </NeonButton>
            </div>
        </div>
    );
}
