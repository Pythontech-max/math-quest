export function UserDonut() {
    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Circle */}
                <path
                    className="text-slate-200 dark:text-white/5"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                ></path>
                {/* Segment 1: Active (Blue) - 70% */}
                <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="70, 100"
                    strokeWidth="3"
                ></path>
                {/* Segment 2: Pending (Cyan) - 20% */}
                <path
                    className="text-accent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-70"
                    strokeWidth="3"
                ></path>
                {/* Segment 3: Blocked (Pink) - 10% */}
                <path
                    className="text-accent-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="10, 100"
                    strokeDashoffset="-90"
                    strokeWidth="3"
                ></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold font-display dark:text-white">
                    12.4k
                </span>
                <span className="text-[10px] text-slate-500 uppercase">Total</span>
            </div>
        </div>
    );
}
