import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "google";
    icon?: ReactNode;
    fullWidth?: boolean;
}

export function NeonButton({
    children,
    className,
    variant = "primary",
    icon,
    fullWidth = false,
    ...props
}: NeonButtonProps) {
    const baseStyles =
        "group relative flex items-center justify-center overflow-hidden rounded-full h-12 px-6 font-bold transition-all duration-300 active:scale-95";

    const variants = {
        primary:
            "bg-primary text-white hover:brightness-110 shadow-glow",
        secondary:
            "bg-primary/10 text-primary dark:text-white border border-primary/20 hover:bg-primary/20",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        google: "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm",
    };

    return (
        <button
            className={clsx(
                baseStyles,
                variants[variant],
                fullWidth ? "w-full" : "w-auto",
                className
            )}
            {...props}
        >
            {/* Icon Wrapper */}
            {icon && <span className="mr-2 flex items-center">{icon}</span>}

            {/* Text */}
            <span className="leading-normal tracking-[0.015em]">{children}</span>


        </button>
    );
}
