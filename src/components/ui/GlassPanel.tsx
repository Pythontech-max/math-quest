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
                "glass-panel rounded-xl shadow-2xl overflow-hidden",
                "bg-[#1c1833]/60 dark:bg-[#1c1833]/60 bg-white/80", // Fallback/Base
                "border border-white/10",
                "backdrop-blur-xl",
                className
            )}
        >
            {children}
        </div>
    );
}
