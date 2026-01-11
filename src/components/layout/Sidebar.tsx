import Link from "next/link";
import clsx from "clsx";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export function Sidebar() {
    const navItems = [
        { icon: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
        { icon: "school", label: "Students", href: "/dashboard/students" },
        { icon: "payments", label: "Payments", href: "/dashboard/payments" },
        { icon: "library_books", label: "Content", href: "/dashboard/content" },
        { type: "divider" },
        { icon: "analytics", label: "Reports", href: "/dashboard/reports" },
        { icon: "settings", label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-surface-light dark:bg-[#141122] border-r border-slate-200 dark:border-[#292348] h-full transition-colors duration-200 z-20">
            <div className="flex flex-col h-full p-4">
                {/* Logo */}
                <div className="flex flex-col mb-8 px-2">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                            <span className="material-symbols-outlined text-white text-xl">
                                calculate
                            </span>
                        </div>
                        <h1 className="text-slate-900 dark:text-white text-xl font-bold font-display tracking-tight">
                            MathMaster
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-[#9b92c9] text-xs font-normal mt-1 pl-10">
                        Admin Console v2.0
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-2 flex-1">
                    {navItems.map((item, idx) =>
                        item.type === "divider" ? (
                            <div
                                key={idx}
                                className="my-2 h-px bg-slate-200 dark:bg-[#292348]"
                            ></div>
                        ) : (
                            <Link
                                key={idx}
                                href={item.href || "#"}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                    item.active
                                        ? "bg-primary/10 text-primary dark:bg-[#292348] dark:text-white border-l-4 border-primary shadow-sm"
                                        : "text-slate-600 dark:text-[#9b92c9] hover:bg-slate-100 dark:hover:bg-[#292348]/50 hover:text-primary dark:hover:text-white"
                                )}
                            >
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        )
                    )}
                </nav>

                {/* Theme Switcher */}
                <div className="mb-6 px-2">
                    <ThemeSwitcher />
                </div>

                {/* System Health */}
                <div className="mt-auto">
                    <div className="rounded-xl bg-slate-50 dark:bg-gradient-to-br dark:from-[#292348] dark:to-primary/20 p-4 border border-slate-200 dark:border-[#292348]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                System Healthy
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-black/30 rounded-full h-1.5 mb-1">
                            <div
                                className="bg-accent h-1.5 rounded-full"
                                style={{ width: "92%" }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                            <span>Server Load</span>
                            <span>92%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
