"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    avatar: string;
    image?: string;
    xp: number;
    accuracy: number;
    games: number;
}

export default function LeaderboardPage() {
    const [timeframe, setTimeframe] = useState("weekly");
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserRank = 15; // TODO: Get from profile API

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/leaderboard?timeframe=${timeframe}`);
                if (res.ok) {
                    const data = await res.json();
                    setLeaderboard(data);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            }
            setLoading(false);
        };

        fetchLeaderboard();
    }, [timeframe]);

    // Ensure we have at least 3 entries for podium (fill with placeholders if needed)
    const podiumData = [
        leaderboard[1] || { rank: 2, name: "---", avatar: "?", xp: 0, accuracy: 0, games: 0 },
        leaderboard[0] || { rank: 1, name: "---", avatar: "?", xp: 0, accuracy: 0, games: 0 },
        leaderboard[2] || { rank: 3, name: "---", avatar: "?", xp: 0, accuracy: 0, games: 0 },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-surface-light/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link href="/student" className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-surface-dark/80 text-slate-600 dark:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white font-display">Leaderboard</h1>
                        <p className="text-xs text-slate-500">Top performers this {timeframe.replace("ly", "").replace("alltime", "all time")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {["weekly", "monthly", "alltime"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={clsx(
                                "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors",
                                timeframe === t
                                    ? "bg-primary text-white"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {t === "alltime" ? "All Time" : t}
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-slate-400">Loading leaderboard...</div>
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">leaderboard</span>
                        <p className="text-slate-400">No players yet this {timeframe.replace("alltime", "period")}</p>
                        <p className="text-sm text-slate-500">Be the first to play!</p>
                    </div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        <div className="flex justify-center items-end gap-4 mb-8">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="size-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-xl font-bold border-4 border-slate-400/20">
                                    {podiumData[0].avatar}
                                </div>
                                <div className="mt-2 px-4 py-6 bg-white dark:bg-surface-dark rounded-t-2xl text-center border border-slate-200 dark:border-white/5 shadow-sm">
                                    <span className="text-2xl font-bold text-slate-400">2</span>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{podiumData[0].name.split(" ")[0]}</p>
                                    <p className="text-xs text-yellow-400">{podiumData[0].xp.toLocaleString()} XP</p>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-4">
                                <div className="relative">
                                    <div className="size-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                                        {podiumData[1].avatar}
                                    </div>
                                    <div className="absolute -top-2 -right-2">
                                        <span className="material-symbols-outlined text-yellow-400 text-2xl">emoji_events</span>
                                    </div>
                                </div>
                                <div className="mt-2 px-6 py-8 bg-gradient-to-b from-yellow-500/10 to-white dark:to-surface-dark rounded-t-2xl text-center border border-yellow-500/20 shadow-md">
                                    <span className="text-3xl font-bold text-yellow-400">1</span>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{podiumData[1].name.split(" ")[0]}</p>
                                    <p className="text-xs text-yellow-400">{podiumData[1].xp.toLocaleString()} XP</p>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="size-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-xl font-bold border-4 border-amber-600/20">
                                    {podiumData[2].avatar}
                                </div>
                                <div className="mt-2 px-4 py-6 bg-white dark:bg-surface-dark rounded-t-2xl text-center border border-slate-200 dark:border-white/5 shadow-sm">
                                    <span className="text-2xl font-bold text-amber-600">3</span>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{podiumData[2].name.split(" ")[0]}</p>
                                    <p className="text-xs text-yellow-400">{podiumData[2].xp.toLocaleString()} XP</p>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard List */}
                        <GlassPanel className="divide-y divide-white/5">
                            {leaderboard.slice(3).map((user) => (
                                <div key={user.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                                    <span className="text-lg font-bold text-slate-500 w-8 text-center">{user.rank}</span>
                                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.games} games • {user.accuracy}% accuracy</p>
                                    </div>
                                    <span className="text-yellow-400 font-bold">{user.xp.toLocaleString()} XP</span>
                                </div>
                            ))}
                        </GlassPanel>
                    </>
                )}

                {/* Current User Banner */}
                <div className="mt-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">#{currentUserRank}</span>
                        <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">Y</div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">You</p>
                            <p className="text-xs text-slate-400">Keep playing to climb!</p>
                        </div>
                    </div>
                    <Link href="/play/setup">
                        <NeonButton variant="primary" icon={<span className="material-symbols-outlined text-sm">play_arrow</span>}>
                            Play Now
                        </NeonButton>
                    </Link>
                </div>
            </main>
        </div>
    );
}
