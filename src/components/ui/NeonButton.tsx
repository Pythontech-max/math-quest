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
            "bg-primary text-white hover:brightness-110",
        secondary:
            "bg-primary/10 text-white border border-primary/20 hover:bg-primary/20",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        google: "bg-white text-slate-900 hover:bg-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(55,19,236,0.2)]",
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
