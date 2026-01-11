"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { NeonButton } from "@/components/ui/NeonButton";
import { StatCard } from "@/components/ui/StatCard";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Initial questions removed, fetching from API
const initialQuestions: Question[] = [];

type Question = {
    id: number | string;
    question: string; // Mapped from 'text' in DB
    answer: string;
    operation: string;
    difficulty: string;
    status: string;
    usageCount: number;
};

const operationIcons: Record<string, string> = {
    addition: "add",
    subtraction: "remove",
    multiplication: "close",
    division: "percent",
    ADDITION: "add",
    SUBTRACTION: "remove",
    MULTIPLICATION: "close",
    DIVISION: "percent",
};

const difficultyColors: Record<string, string> = {
    easy: "bg-green-500/10 text-green-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    hard: "bg-red-500/10 text-red-400",
    EASY: "bg-green-500/10 text-green-400",
    MEDIUM: "bg-yellow-500/10 text-yellow-400",
    HARD: "bg-red-500/10 text-red-400",
};

export default function ContentPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [operationFilter, setOperationFilter] = useState("all");

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const url = operationFilter !== 'all'
                    ? `/api/content?operation=${operationFilter}`
                    : '/api/content';

                const res = await fetch(url + (searchQuery ? `&search=${searchQuery}` : ''));
                if (res.ok) {
                    const data = await res.json();
                    setQuestions(data.map((q: any) => ({
                        id: q.id,
                        question: q.text, // Map DB 'text' to 'question'
                        answer: q.answer,
                        operation: q.operation, // Enum from DB is generally uppercase
                        difficulty: q.difficulty, // Enum from DB is generally uppercase
                        status: q.status,
                        usageCount: q.usageCount
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch content", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce search slightly or just run effect on dep change
        const timeoutId = setTimeout(() => {
            fetchQuestions();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, operationFilter]); // Re-fetch when filters change

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-[#292348] px-6 py-4 bg-surface-light/80 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Content Management</h2>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {questions.length} Questions
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <NeonButton variant="secondary" icon={<span className="material-symbols-outlined text-sm">upload</span>}>
                            Import CSV
                        </NeonButton>
                        <NeonButton variant="primary" icon={<span className="material-symbols-outlined text-sm">add</span>}>
                            Add Question
                        </NeonButton>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Questions"
                                value={questions.length.toString()}
                                trend="+12"
                                icon="quiz"
                                colorClass="text-primary"
                            />
                            <StatCard
                                title="Active"
                                value={questions.filter(q => q.status === "active").length.toString()}
                                trend="+5"
                                icon="check_circle"
                                colorClass="text-green-400"
                            />
                            <StatCard
                                title="Drafts"
                                value={questions.filter(q => q.status === "draft").length.toString()}
                                trend="1"
                                icon="edit_note"
                                colorClass="text-yellow-400"
                            />
                            <StatCard
                                title="Total Usage"
                                value={questions.reduce((sum, q) => sum + q.usageCount, 0).toLocaleString()}
                                trend="+18%"
                                icon="trending_up"
                                colorClass="text-accent"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <div className="flex gap-2">
                                {["all", "ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].map((op) => (
                                    <button
                                        key={op}
                                        onClick={() => setOperationFilter(op)}
                                        className={clsx(
                                            "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors flex items-center gap-2",
                                            operationFilter === op
                                                ? "bg-primary text-white"
                                                : "bg-surface-dark text-slate-400 hover:text-white border border-white/10"
                                        )}
                                    >
                                        {op !== "all" && operationIcons[op] && (
                                            <span className="material-symbols-outlined text-sm">{operationIcons[op]}</span>
                                        )}
                                        {op.toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Questions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {questions.map((question) => (
                                <GlassPanel key={question.id} className="p-5 hover:border-primary/30 transition-colors group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary">
                                                    {operationIcons[question.operation] || "calculate"}
                                                </span>
                                            </div>
                                            <div>
                                                <span className={clsx(
                                                    "px-2 py-0.5 rounded text-xs font-bold uppercase",
                                                    difficultyColors[question.difficulty] || "text-slate-400"
                                                )}>
                                                    {question.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={clsx(
                                            "px-2 py-1 rounded-full text-xs font-bold",
                                            question.status === "active"
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-slate-500/10 text-slate-400"
                                        )}>
                                            {question.status}
                                        </span>
                                    </div>

                                    <p className="text-xl font-bold text-white mb-2 font-mono">{question.question}</p>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Answer: <span className="text-green-400 font-bold">{question.answer}</span>
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-xs text-slate-500">
                                            Used {question.usageCount} times
                                        </span>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </GlassPanel>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
