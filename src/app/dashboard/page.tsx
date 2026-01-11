"use client";

import { StatCard } from "@/components/ui/StatCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { UserDonut } from "@/components/dashboard/UserDonut";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        revenue: 0,
        blockedUsers: 0
    });
    const [performers, setPerformers] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [statsRes, leaderboardRes, paymentsRes] = await Promise.all([
                    fetch('/api/stats'),
                    fetch('/api/leaderboard?timeframe=alltime'),
                    fetch('/api/payments')
                ]);

                if (statsRes.ok) {
                    const data = await statsRes.ok ? await statsRes.json() : null;
                    if (data) {
                        setStats(prev => ({
                            ...prev,
                            totalUsers: data.totalUsers,
                            activeUsers: data.activeUsers,
                            revenue: data.revenue
                        }));
                    }
                }

                if (leaderboardRes.ok) {
                    const data = await leaderboardRes.json();
                    setPerformers(data.slice(0, 5));
                }

                if (paymentsRes.ok) {
                    const data = await paymentsRes.json();
                    setTransactions(data.payments.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] opacity-20 dark:opacity-40"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] opacity-10 dark:opacity-30"></div>
                </div>

                {/* Top Header */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-[#292348] px-6 py-4 bg-surface-light/80 dark:bg-[#141122]/90 backdrop-blur-md z-10 sticky top-0">
                    <div className="hidden md:flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white tracking-tight">
                            Dashboard Overview
                        </h2>
                    </div>
                    <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
                        <label className="hidden md:flex relative group max-w-md w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400">
                                    search
                                </span>
                            </div>
                            <input
                                className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-200 rounded-lg bg-white dark:bg-[#292348] dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary transition-all shadow-sm"
                                placeholder="Search students, payments..."
                                type="text"
                            />
                        </label>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-slate-500 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-[#292348]">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-secondary border-2 border-surface-light dark:border-[#141122]"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 dark:bg-[#292348] mx-1"></div>
                            <button className="flex items-center gap-2 group">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 border-2 border-surface-light dark:border-[#141122] overflow-hidden flex items-center justify-center">
                                        <span className="text-xs text-slate-900 dark:text-white font-bold">AD</span>
                                    </div>
                                </div>
                                <div className="hidden lg:flex flex-col items-start">
                                    <span className="text-sm font-bold text-slate-700 dark:text-white">
                                        Admin User
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Super Admin
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 z-10">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Registered"
                                value={stats.totalUsers.toLocaleString()}
                                trend="+5%"
                                icon="groups"
                                colorClass="text-primary"
                                progress={75}
                            />
                            <StatCard
                                title="Active Learners"
                                value={stats.activeUsers.toLocaleString()}
                                trend="+12%"
                                icon="bolt"
                                colorClass="text-accent"
                                footer={`Currently online: ${Math.floor(stats.activeUsers * 0.1)}`}
                                className="border-l-4 border-l-accent"
                            />
                            <StatCard
                                title="Monthly Revenue"
                                value={`$${stats.revenue.toLocaleString()}`}
                                trend="+8%"
                                icon="attach_money"
                                colorClass="text-green-400"
                                progress={65}
                            />
                            <StatCard
                                title="Blocked Accounts"
                                value={stats.blockedUsers.toString()}
                                trend="+2"
                                trendUp={false}
                                icon="block"
                                colorClass="text-red-500"
                                footer="Requires Review: 4"
                                className="border-l-4 border-l-red-500"
                            />
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <GlassPanel className="lg:col-span-2 p-6 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                                            Platform Activity
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Student engagement over the last 7 days
                                        </p>
                                    </div>
                                </div>
                                <ActivityChart />
                            </GlassPanel>

                            {/* Top Performers */}
                            <GlassPanel className="p-6 flex flex-col">
                                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">
                                    Top Performers
                                </h4>
                                <div className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[340px]">
                                    {isLoading ? (
                                        <div className="flex flex-col gap-4 animate-pulse">
                                            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-white/5 rounded-lg" />)}
                                        </div>
                                    ) : performers.length > 0 ? (
                                        performers.map((student, i) => (
                                            <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="relative">
                                                    {student.image ? (
                                                        <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">{student.avatar}</div>
                                                    )}
                                                    {student.rank <= 3 && (
                                                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] font-bold px-1 rounded shadow-sm">
                                                            #{student.rank}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{student.name}</p>
                                                    <p className="text-xs text-slate-500">XP: {student.xp.toLocaleString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-primary dark:text-accent">{student.accuracy}%</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 text-center py-10">No rankings yet</p>
                                    )}
                                </div>
                            </GlassPanel>
                        </div>

                        {/* Bottom Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                            {/* Recent Activity */}
                            <GlassPanel className="p-6">
                                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">Recent Transactions</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-xs text-slate-500 border-b border-slate-200 dark:border-white/10">
                                            <tr>
                                                <th className="py-3">Student</th>
                                                <th className="py-3">Plan</th>
                                                <th className="py-3 text-right">Amount</th>
                                                <th className="py-3 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading ? (
                                                <tr><td colSpan={4} className="py-10 text-center animate-pulse">Loading tokens...</td></tr>
                                            ) : transactions.length > 0 ? (
                                                transactions.map((t) => (
                                                    <tr key={t.id} className="border-b border-slate-100 dark:border-white/5">
                                                        <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{t.student}</td>
                                                        <td className="py-3 text-slate-500">{t.plan}</td>
                                                        <td className="py-3 text-right text-slate-600 dark:text-slate-400">${t.amount.toFixed(2)}</td>
                                                        <td className="py-3 text-right">
                                                            <span className={clsx(
                                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                                t.status === 'completed' ? "bg-green-500/10 text-green-500" :
                                                                    t.status === 'pending' ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                                                            )}>
                                                                {t.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan={4} className="py-10 text-center text-slate-500">No recent transactions</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </GlassPanel>

                            {/* Donut Chart */}
                            <GlassPanel className="p-6 flex flex-col items-center justify-center">
                                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6 w-full text-left">User Status Overview</h4>
                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <UserDonut />
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(55,19,236,0.6)]"></div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">Active Students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">Pending Verification</span>
                                        </div>
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
