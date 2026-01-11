"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface Achievement {
    id: number;
    icon: string;
    title: string;
    desc: string;
    unlocked: boolean;
}

interface GameHistory {
    id: string;
    operation: string;
    date: string;
    score: number;
    accuracy: number;
}

interface UserProfile {
    name: string;
    email: string;
    image?: string;
    joined: string;
    xp: number;
    level: number;
    rank: number;
    totalGames: number;
    accuracy: number;
    streakDays: number;
    achievements: Achievement[];
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [history, setHistory] = useState<GameHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, historyRes] = await Promise.all([
                    fetch("/api/profile"),
                    fetch("/api/profile/history?limit=4")
                ]);

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setProfile(profileData);
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

    // Default values while loading or for anonymous users
    const userData = profile || {
        name: "Guest User",
        email: "Sign in to save progress",
        joined: "Today",
        xp: 0,
        level: 1,
        rank: 0,
        totalGames: 0,
        accuracy: 0,
        streakDays: 0,
        achievements: [
            { id: 1, icon: "bolt", title: "Speed Demon", desc: "Complete 10 games under 2 min", unlocked: false },
            { id: 2, icon: "target", title: "Sharp Shooter", desc: "Get 100% accuracy 5 times", unlocked: false },
            { id: 3, icon: "local_fire_department", title: "On Fire", desc: "7-day streak", unlocked: false },
            { id: 4, icon: "emoji_events", title: "Champion", desc: "Reach Top 10", unlocked: false },
        ]
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-slate-400">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-surface-light/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link href="/student" className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-surface-dark/80 text-slate-600 dark:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white font-display">My Profile</h1>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </header>

            <main className="flex-1 p-6 max-w-2xl mx-auto w-full flex flex-col gap-6">
                {/* Profile Card */}
                <GlassPanel className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Avatar */}
                    <div className="relative z-10">
                        <div className="size-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-primary/30">
                            {userData.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 px-2 py-1 bg-yellow-500 rounded-full text-xs font-bold text-black">
                            Lv.{userData.level}
                        </div>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white relative z-10">{userData.name}</h2>
                    <p className="text-sm text-slate-400 relative z-10">{userData.email}</p>
                    <p className="text-xs text-slate-500 mt-1 relative z-10">Member since {userData.joined}</p>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4 w-full relative z-10">
                        <div className="p-3 rounded-xl bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-white/5 shadow-sm">
                            <p className="text-2xl font-bold text-yellow-400">{userData.xp.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">Total XP</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-dark/50 border border-white/5">
                            <p className="text-2xl font-bold text-green-400">{userData.accuracy}%</p>
                            <p className="text-xs text-slate-500">Accuracy</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-dark/50 border border-white/5">
                            <p className="text-2xl font-bold text-primary">#{userData.rank || "-"}</p>
                            <p className="text-xs text-slate-500">Rank</p>
                        </div>
                    </div>
                </GlassPanel>

                {/* Streak Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 flex items-center gap-4">
                    <div className="size-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-orange-400">local_fire_department</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-slate-900 dark:text-white">{userData.streakDays}-Day Streak!</p>
                        <p className="text-xs text-slate-400">
                            {userData.streakDays >= 7
                                ? "Amazing! Keep the momentum going!"
                                : `Keep it up! ${7 - userData.streakDays} more days for achievement.`}
                        </p>
                    </div>
                </div>

                {/* Achievements */}
                <GlassPanel className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Achievements</h3>
                        <span className="text-xs text-slate-500">{userData.achievements.filter(a => a.unlocked).length}/{userData.achievements.length}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {userData.achievements.map((ach) => (
                            <div
                                key={ach.id}
                                className={clsx(
                                    "p-4 rounded-xl border flex items-center gap-3 transition-colors",
                                    ach.unlocked
                                        ? "bg-primary/5 border-primary/20"
                                        : "bg-surface-dark/30 border-white/5 opacity-50"
                                )}
                            >
                                <div className={clsx(
                                    "size-10 rounded-full flex items-center justify-center",
                                    ach.unlocked ? "bg-primary/20 text-primary" : "bg-slate-700 text-slate-500"
                                )}>
                                    <span className="material-symbols-outlined">{ach.icon}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">{ach.title}</p>
                                    <p className="text-xs text-slate-500">{ach.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                {/* Recent Games */}
                <GlassPanel className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Games</h3>
                        <Link href="/student" className="text-xs text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <p className="text-slate-500 text-center py-4">No games played yet</p>
                        ) : (
                            history.map((game) => (
                                <div key={game.id} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-surface-dark/30 border border-slate-200 dark:border-white/5 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">calculate</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white capitalize">{game.operation.toLowerCase()}</p>
                                            <p className="text-xs text-slate-500">{game.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-400">{game.accuracy}%</p>
                                        <p className="text-xs text-slate-500">{game.score} pts</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </GlassPanel>

                {/* Actions */}
                <div className="flex gap-4">
                    <Link href="/play/setup" className="flex-1">
                        <NeonButton fullWidth variant="primary" icon={<span className="material-symbols-outlined">play_arrow</span>}>
                            Play Now
                        </NeonButton>
                    </Link>
                    <Link href="/student/leaderboard" className="flex-1">
                        <NeonButton fullWidth variant="secondary" icon={<span className="material-symbols-outlined">leaderboard</span>}>
                            Leaderboard
                        </NeonButton>
                    </Link>
                </div>
            </main>
        </div>
    );
}
