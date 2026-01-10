import clsx from "clsx";
import { GlassPanel } from "./GlassPanel";

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: string; // Material symbol name
    colorClass?: string; // e.g., text-primary, text-accent
    progress?: number; // 0-100
    footer?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    trend,
    trendUp = true,
    icon,
    colorClass = "text-primary",
    progress,
    footer,
    className,
}: StatCardProps) {
    return (
        <GlassPanel
            className={clsx(
                "p-5 relative group hover:-translate-y-1 transition-transform duration-300",
                className
            )}
        >
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span
                    className={clsx("material-symbols-outlined text-6xl", colorClass)}
                >
                    {icon}
                </span>
            </div>

            <div className="flex flex-col relative z-10">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {title}
                </span>

                <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold font-display text-slate-900 dark:text-white">
                        {value}
                    </span>
                    {trend && (
                        <span
                            className={clsx(
                                "flex items-center text-xs font-bold mb-1 px-1.5 py-0.5 rounded",
                                trendUp
                                    ? "text-green-500 bg-green-500/10"
                                    : "text-red-500 bg-red-500/10"
                            )}
                        >
                            <span className="material-symbols-outlined text-sm mr-0.5">
                                {trendUp ? "trending_up" : "trending_down"}
                            </span>
                            {trend}
                        </span>
                    )}
                </div>

                {progress !== undefined && (
                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                        <div
                            className={clsx("h-full rounded-full", colorClass.replace("text-", "bg-"))}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {footer && <p className="text-xs text-slate-400 mt-4">{footer}</p>}
            </div>
        </GlassPanel>
    );
}
