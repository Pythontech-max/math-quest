"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/ui/StatCard";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface Payment {
    id: number;
    student: string;
    email: string;
    plan: string;
    amount: number;
    date: string;
    status: string;
}

interface PaymentStats {
    totalRevenue: number;
    pendingAmount: number;
    totalTransactions: number;
    failedCount: number;
}

export default function PaymentsPage() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [payments, setPayments] = useState<Payment[]>([]);
    const [stats, setStats] = useState<PaymentStats>({
        totalRevenue: 0,
        pendingAmount: 0,
        totalTransactions: 0,
        failedCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/payments?status=${statusFilter}`);
                if (res.ok) {
                    const data = await res.json();
                    setPayments(data.payments || []);
                    setStats(data.stats || {
                        totalRevenue: 0,
                        pendingAmount: 0,
                        totalTransactions: 0,
                        failedCount: 0
                    });
                }
            } catch (error) {
                console.error("Failed to fetch payments:", error);
            }
            setLoading(false);
        };

        fetchPayments();
    }, [statusFilter]);

    const filteredPayments = payments.filter(p =>
        statusFilter === "all" || p.status === statusFilter
    );

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#292348] px-6 py-4 bg-background-dark/90 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-white">Payment Tracking</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-dark border border-white/10 text-slate-300 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">download</span>
                            Export CSV
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Revenue"
                                value={`$${stats.totalRevenue.toFixed(2)}`}
                                trend="+15%"
                                icon="attach_money"
                                colorClass="text-green-400"
                            />
                            <StatCard
                                title="Pending"
                                value={`$${stats.pendingAmount.toFixed(2)}`}
                                trend="1"
                                icon="schedule"
                                colorClass="text-yellow-400"
                            />
                            <StatCard
                                title="Transactions"
                                value={stats.totalTransactions.toString()}
                                trend="+8"
                                icon="receipt_long"
                                colorClass="text-primary"
                            />
                            <StatCard
                                title="Failed"
                                value={stats.failedCount.toString()}
                                trend="-2"
                                trendUp={false}
                                icon="error"
                                colorClass="text-red-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2">
                            {["all", "completed", "pending", "failed"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={clsx(
                                        "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors",
                                        statusFilter === status
                                            ? "bg-primary text-white"
                                            : "bg-surface-dark text-slate-400 hover:text-white border border-white/10"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <GlassPanel className="overflow-hidden">
                            {loading ? (
                                <div className="p-8 text-center text-slate-400">Loading payments...</div>
                            ) : filteredPayments.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">No payments found</div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-surface-dark/50">
                                        <tr className="text-xs text-slate-400 uppercase tracking-wider">
                                            <th className="p-4">Transaction</th>
                                            <th className="p-4">Student</th>
                                            <th className="p-4">Plan</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPayments.map((payment) => (
                                            <tr key={payment.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <span className="font-mono text-sm text-slate-400">TXN-{String(payment.id).padStart(5, '0')}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-bold text-white">{payment.student}</p>
                                                        <p className="text-xs text-slate-500">{payment.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={clsx(
                                                        "px-2 py-1 rounded text-xs font-bold",
                                                        payment.plan === "Annual" ? "bg-purple-500/10 text-purple-400" :
                                                            payment.plan === "Pro" ? "bg-primary/10 text-primary" :
                                                                "bg-slate-500/10 text-slate-400"
                                                    )}>
                                                        {payment.plan}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-white">${payment.amount}</td>
                                                <td className="p-4 text-slate-400 text-sm">{payment.date}</td>
                                                <td className="p-4">
                                                    <span className={clsx(
                                                        "px-2 py-1 rounded-full text-xs font-bold uppercase",
                                                        payment.status === "completed" ? "bg-green-500/10 text-green-400" :
                                                            payment.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                                                                "bg-red-500/10 text-red-400"
                                                    )}>
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                                        <span className="material-symbols-outlined text-xl">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </GlassPanel>
                    </div>
                </div>
            </main>
        </div>
    );
}
