import clsx from "clsx";
import { ReactNode } from "react";

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
    return (
        <div
            className={clsx(
                "glass-panel rounded-xl shadow-2xl overflow-hidden shadow-slate-200/50 dark:shadow-none",
                className
            )}
        >
            {children}
        </div>
    );
}
