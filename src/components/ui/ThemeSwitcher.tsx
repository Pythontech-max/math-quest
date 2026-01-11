"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-full bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />;
    }

    return (
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-black/20 rounded-xl border border-slate-200 dark:border-white/5">
            <button
                onClick={() => setTheme("light")}
                className={clsx(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all",
                    theme === "light"
                        ? "bg-white text-primary shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                )}
            >
                <span className="material-symbols-outlined text-lg">light_mode</span>
                <span className="text-xs font-bold">Light</span>
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={clsx(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all",
                    theme === "dark"
                        ? "bg-[#292348] text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                )}
            >
                <span className="material-symbols-outlined text-lg">dark_mode</span>
                <span className="text-xs font-bold">Dark</span>
            </button>
        </div>
    );
}
