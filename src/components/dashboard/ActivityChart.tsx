export function ActivityChart() {
    return (
        <div className="flex-1 min-h-[300px] w-full relative">
            <div className="absolute inset-0 flex items-end justify-between px-2 pb-6 gap-2">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-2">
                    <div className="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                    <div className="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                    <div className="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                    <div className="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                    <div className="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                </div>

                {/* SVG Curve */}
                <svg
                    className="absolute inset-0 w-full h-[calc(100%-32px)] overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3713ec" stopOpacity="0.5"></stop>
                            <stop offset="100%" stopColor="#3713ec" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,80 C10,70 15,90 25,60 C35,30 40,40 50,20 C60,0 70,40 85,30 C95,20 100,10 100,10 V100 H0 Z"
                        fill="url(#chartGradient)"
                    ></path>
                    <path
                        d="M0,80 C10,70 15,90 25,60 C35,30 40,40 50,20 C60,0 70,40 85,30 C95,20 100,10 100,10"
                        fill="none"
                        stroke="#3713ec"
                        strokeLinecap="round"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                    ></path>
                    <path
                        d="M0,90 C15,90 25,75 35,80 C45,85 55,50 65,55 C75,60 85,45 100,50"
                        fill="none"
                        stroke="#00f0ff"
                        strokeDasharray="2,2"
                        strokeLinecap="round"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                    ></path>
                </svg>

                {/* X Axis Labels */}
                <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-slate-400 px-1 font-medium font-mono uppercase">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>

                {/* Tooltip Indicator (Fake) */}
                <div className="absolute left-[50%] top-[20%] -translate-x-1/2 flex flex-col items-center">
                    <div className="bg-surface-dark text-white text-xs py-1 px-2 rounded shadow-lg border border-primary/30 whitespace-nowrap z-10">
                        Peak Usage: 1,240
                    </div>
                    <div className="w-px h-[200px] bg-primary/50 border-r border-dashed border-primary"></div>
                    <div className="w-3 h-3 bg-primary rounded-full absolute top-[calc(100%-8px)] shadow-[0_0_10px_#3713ec]"></div>
                </div>
            </div>
        </div>
    );
}
