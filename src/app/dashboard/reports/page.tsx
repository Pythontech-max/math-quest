"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/ui/StatCard";
import { NeonButton } from "@/components/ui/NeonButton";

// Mock data for charts
const weeklyData = [
    { day: "Mon", sessions: 45, accuracy: 87 },
    { day: "Tue", sessions: 62, accuracy: 89 },
    { day: "Wed", sessions: 58, accuracy: 85 },
    { day: "Thu", sessions: 71, accuracy: 91 },
    { day: "Fri", sessions: 89, accuracy: 88 },
    { day: "Sat", sessions: 34, accuracy: 92 },
    { day: "Sun", sessions: 28, accuracy: 90 },
];

const operationStats = [
    { name: "Addition", sessions: 1245, accuracy: 92, color: "bg-green-500" },
    { name: "Subtraction", sessions: 987, accuracy: 88, color: "bg-blue-500" },
    { name: "Multiplication", sessions: 756, accuracy: 79, color: "bg-purple-500" },
    { name: "Division", sessions: 543, accuracy: 71, color: "bg-orange-500" },
];

const topStudents = [
    { name: "Alex Johnson", xp: 12500, accuracy: 94, games: 45 },
    { name: "Sarah Chen", xp: 11200, accuracy: 91, games: 38 },
    { name: "Mike Brown", xp: 9800, accuracy: 87, games: 32 },
    { name: "Emily Davis", xp: 8500, accuracy: 89, games: 28 },
    { name: "James Wilson", xp: 7200, accuracy: 85, games: 24 },
];

export default function ReportsPage() {
    const maxSessions = Math.max(...weeklyData.map(d => d.sessions));

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#292348] px-6 py-4 bg-background-dark/90 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-white">Analytics & Reports</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <select className="px-4 py-2 rounded-xl bg-surface-dark border border-white/10 text-slate-300 focus:outline-none focus:border-primary">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 90 Days</option>
                            <option>All Time</option>
                        </select>
                        <NeonButton variant="secondary" icon={<span className="material-symbols-outlined text-sm">download</span>}>
                            Export Report
                        </NeonButton>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Sessions"
                                value="3,531"
                                trend="+23%"
                                icon="sports_esports"
                                colorClass="text-primary"
                            />
                            <StatCard
                                title="Avg. Accuracy"
                                value="86%"
                                trend="+5%"
                                icon="target"
                                colorClass="text-green-400"
                            />
                            <StatCard
                                title="Questions Answered"
                                value="35,310"
                                trend="+18%"
                                icon="quiz"
                                colorClass="text-accent"
                            />
                            <StatCard
                                title="Avg. Session Time"
                                value="4m 32s"
                                trend="+12%"
                                icon="timer"
                                colorClass="text-yellow-400"
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Weekly Activity Chart */}
                            <GlassPanel className="p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Weekly Activity</h3>
                                <div className="flex items-end justify-between h-48 gap-2">
                                    {weeklyData.map((day, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full flex flex-col items-center gap-1">
                                                <span className="text-xs text-slate-400">{day.sessions}</span>
                                                <div
                                                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                                                    style={{ height: `${(day.sessions / maxSessions) * 140}px` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </GlassPanel>

                            {/* Operation Performance */}
                            <GlassPanel className="p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Performance by Operation</h3>
                                <div className="space-y-4">
                                    {operationStats.map((op, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-white font-medium">{op.name}</span>
                                                <span className="text-sm text-slate-400">{op.accuracy}% accuracy</span>
                                            </div>
                                            <div className="w-full bg-surface-dark rounded-full h-2">
                                                <div
                                                    className={`${op.color} h-2 rounded-full transition-all`}
                                                    style={{ width: `${op.accuracy}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{op.sessions.toLocaleString()} sessions</span>
                                        </div>
                                    ))}
                                </div>
                            </GlassPanel>
                        </div>

                        {/* Top Performers Table */}
                        <GlassPanel className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Top Performing Students</h3>
                                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                                    View All →
                                </button>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-white/5">
                                        <th className="text-left p-3">Rank</th>
                                        <th className="text-left p-3">Student</th>
                                        <th className="text-right p-3">XP</th>
                                        <th className="text-right p-3">Accuracy</th>
                                        <th className="text-right p-3">Games</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topStudents.map((student, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-3">
                                                <span className={`inline-flex items-center justify-center size-8 rounded-full font-bold text-sm ${i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                                                        i === 1 ? "bg-slate-400/20 text-slate-300" :
                                                            i === 2 ? "bg-orange-500/20 text-orange-400" :
                                                                "bg-surface-dark text-slate-400"
                                                    }`}>
                                                    {i + 1}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <span className="text-white font-medium">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="text-yellow-400 font-bold">{student.xp.toLocaleString()}</span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className={`font-bold ${student.accuracy >= 90 ? "text-green-400" :
                                                        student.accuracy >= 80 ? "text-yellow-400" : "text-red-400"
                                                    }`}>
                                                    {student.accuracy}%
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-slate-300">{student.games}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </GlassPanel>
                    </div>
                </div>
            </main>
        </div>
    );
}
