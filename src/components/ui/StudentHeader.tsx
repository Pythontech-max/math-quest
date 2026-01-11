"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface StudentHeaderProps {
    title?: string;
    showBack?: boolean;
    showSettings?: boolean;
}

export function StudentHeader({ title = "MathMaster", showBack = true, showSettings = true }: StudentHeaderProps) {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        signOut({ callbackUrl: "/auth/signin" });
    };

    return (
        <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-50 bg-background-dark/90 backdrop-blur-md border-b border-white/5 w-full">
            {/* Left - Back Button */}
            {showBack ? (
                <button
                    onClick={() => router.back()}
                    className="size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-white transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            ) : (
                <div className="size-10" />
            )}

            {/* Center - Title */}
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
            </div>

            {/* Right - Settings/Profile */}
            {showSettings ? (
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="size-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white transition-transform hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-sm">person</span>
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-12 w-64 rounded-xl bg-[#1e1933] border border-white/10 shadow-xl overflow-hidden z-50">
                            {/* Theme Section */}
                            <div className="p-3 border-b border-white/5">
                                <p className="text-xs text-[#9b92c9] mb-2">Theme</p>
                                <ThemeSwitcher />
                            </div>

                            {/* Actions */}
                            <div className="p-2">
                                <button
                                    onClick={() => router.push("/student")}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">home</span>
                                    <span className="text-sm">Home</span>
                                </button>
                                <button
                                    onClick={() => router.push("/student/profile")}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">person</span>
                                    <span className="text-sm">Profile</span>
                                </button>
                                <button
                                    onClick={() => router.push("/student/leaderboard")}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">leaderboard</span>
                                    <span className="text-sm">Leaderboard</span>
                                </button>
                                <div className="my-1 h-px bg-white/5" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">logout</span>
                                    <span className="text-sm">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="size-10" />
            )}

            {/* Click outside to close */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </header>
    );
}
