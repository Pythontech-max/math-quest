import clsx from "clsx";


interface KeypadProps {
    onInput: (val: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export function Keypad({ onInput, onDelete, onSubmit, disabled }: KeypadProps) {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <div className="relative z-10 bg-gray-50 dark:bg-[#1a162e] rounded-t-3xl p-6 pb-8 border-t border-gray-100 dark:border-[#292348] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mt-auto">
            <div className="grid grid-cols-3 gap-4 max-w-[320px] mx-auto">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onInput(key)}
                        disabled={disabled}
                        className="keypad-btn flex items-center justify-center w-full aspect-square rounded-full bg-white dark:bg-[#292348] shadow-sm border-b-4 border-gray-200 dark:border-[#1e1933] text-2xl font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#3b3267] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {key}
                    </button>
                ))}

                {/* Backspace */}
                <button
                    onClick={onDelete}
                    disabled={disabled}
                    className="keypad-btn flex items-center justify-center w-full aspect-square rounded-full bg-red-50 dark:bg-[#292348]/50 shadow-sm border-b-4 border-red-100 dark:border-[#1e1933] text-gray-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 active:scale-95 transition-all group disabled:opacity-50"
                >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                        backspace
                    </span>
                </button>

                {/* Zero */}
                <button
                    onClick={() => onInput("0")}
                    disabled={disabled}
                    className="keypad-btn flex items-center justify-center w-full aspect-square rounded-full bg-white dark:bg-[#292348] shadow-sm border-b-4 border-gray-200 dark:border-[#1e1933] text-2xl font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#3b3267] active:scale-95 transition-all disabled:opacity-50"
                >
                    0
                </button>

                {/* Submit */}
                <button
                    onClick={onSubmit}
                    disabled={disabled}
                    className="keypad-btn flex items-center justify-center w-full aspect-square rounded-full bg-primary shadow-neon border-b-4 border-[#250ba3] text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                        check
                    </span>
                </button>
            </div>
        </div>
    );
}
