"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProfileStats {
    xp: number;
    accuracy: number;
    totalGames: number;
}

interface GameHistory {
    id: string;
    operation: string;
    date: string;
    accuracy: number;
    correct: number;
    total: number;
}

export default function StudentDashboard() {
    const [stats, setStats] = useState<ProfileStats>({ xp: 0, accuracy: 0, totalGames: 0 });
    const [history, setHistory] = useState<GameHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, historyRes] = await Promise.all([
                    fetch("/api/profile"),
                    fetch("/api/profile/history?limit=3")
                ]);

                if (profileRes.ok) {
                    const data = await profileRes.json();
                    setStats({
                        xp: data.xp || 0,
                        accuracy: data.accuracy || 0,
                        totalGames: data.totalGames || 0
                    });
                }

                if (historyRes.ok) {
                    const historyData = await historyRes.json();
                    setHistory(historyData);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 flex flex-col items-center">
            <header className="w-full max-w-4xl flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Student Portal</h1>
                <div className="flex items-center gap-4">
                    <Link href="/student/leaderboard" className="p-2 rounded-lg hover:bg-surface-dark text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">leaderboard</span>
                    </Link>
                    <Link href="/student/profile" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">ST</div>
                        <span className="text-slate-800 dark:text-white hidden sm:inline">Student</span>
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Quick Actions */}
                <GlassPanel className="p-8 flex flex-col items-center text-center gap-6">
                    <span className="material-symbols-outlined text-6xl text-primary">rocket_launch</span>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready for a mission?</h2>
                        <p className="text-slate-500 dark:text-slate-400">Start a new practice session to earn XP.</p>
                    </div>
                    <Link href="/play/setup" className="w-full">
                        <NeonButton fullWidth variant="primary">Start New Game</NeonButton>
                    </Link>
                </GlassPanel>

                {/* Stats Summary */}
                <GlassPanel className="p-8 flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Your Progress</h3>

                    {loading ? (
                        <div className="text-slate-400 text-center py-4">Loading stats...</div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-slate-400">Total XP</span>
                                <span className="text-xl font-bold text-yellow-400">{stats.xp.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-slate-400">Accuracy</span>
                                <span className="text-xl font-bold text-green-400">{stats.accuracy}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-slate-400">Missions Completed</span>
                                <span className="text-xl font-bold text-blue-400">{stats.totalGames}</span>
                            </div>
                        </>
                    )}
                </GlassPanel>

                {/* Recent History */}
                <div className="md:col-span-2">
                    <GlassPanel className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Missions</h3>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-slate-400 text-center py-4">Loading history...</div>
                            ) : history.length === 0 ? (
                                <div className="text-slate-500 text-center py-8">
                                    <span className="material-symbols-outlined text-4xl block mb-2">history</span>
                                    No missions completed yet. Start playing!
                                </div>
                            ) : (
                                history.map((game) => (
                                    <div key={game.id} className="flex justify-between items-center p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined">calculate</span>
                                            </div>
                                            <div>
                                                <p className="text-slate-900 dark:text-white font-bold capitalize">{game.operation.toLowerCase()} Practice</p>
                                                <p className="text-xs text-slate-500">{game.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-bold">{game.accuracy}%</p>
                                            <p className="text-xs text-slate-500">{game.correct}/{game.total} Correct</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </GlassPanel>
                </div>

            </main>
        </div>
    );
}
