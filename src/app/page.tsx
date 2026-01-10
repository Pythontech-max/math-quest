"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">functions</span>
                    <span className="text-xl font-bold text-white font-display">MathQuest</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/auth/signin">
                        <NeonButton variant="secondary">Sign In</NeonButton>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="max-w-3xl flex flex-col items-center gap-8 animate-fade-in-up">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                        <span className="text-sm font-medium text-primary">Gamified Math Learning</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white font-display leading-tight tracking-tight">
                        Master Math Through
                        <span className="block bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                            Fun Missions
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                        Practice addition, subtraction, multiplication & division with engaging challenges.
                        Track progress, earn XP, and climb the leaderboard.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <Link href="/auth/signin" className="flex-1">
                            <NeonButton fullWidth variant="primary" icon={<span className="material-symbols-outlined">rocket_launch</span>}>
                                Start Learning
                            </NeonButton>
                        </Link>
                        <Link href="/play/setup" className="flex-1">
                            <NeonButton fullWidth variant="secondary" icon={<span className="material-symbols-outlined">play_arrow</span>}>
                                Try Demo
                            </NeonButton>
                        </Link>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                    {[
                        { icon: "calculate", title: "4 Operations", desc: "Addition, subtraction, multiplication & division" },
                        { icon: "emoji_events", title: "Earn XP", desc: "Complete missions to level up and unlock rewards" },
                        { icon: "leaderboard", title: "Compete", desc: "Climb the global leaderboard against other students" },
                    ].map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-surface-dark/50 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-3 hover:border-primary/30 transition-colors">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">{f.icon}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">{f.title}</h3>
                            <p className="text-sm text-slate-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-slate-500 text-sm">
                © 2024 MathQuest. Built for learning.
            </footer>
        </div>
    );
}
