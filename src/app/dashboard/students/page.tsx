"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Initial students removed, fetching from API
const initialStudents: Student[] = [];

type Student = {
    id: number | string; // Handle both types
    name: string;
    email: string;
    xp: number;
    accuracy: number;
    games: number; // Not in API yet, default 0
    joined: string;
    status: string;
    isPaid: boolean;
    lastPaymentDate: string | null;
};

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [selectedStudent, setSelectedStudent] = useState<number | string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", email: "" });

    // Fetch students on mount
    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/students');
            if (res.ok) {
                const data = await res.json();
                setStudents(data.map((s: any) => ({
                    ...s,
                    games: 0 // Default until we add games to API result
                })));
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newStudent, role: 'STUDENT' })
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                setNewStudent({ name: "", email: "" });
                fetchStudents(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to add student", error);
        }
    };

    const togglePayment = async (studentId: number | string) => {
        // Optimistic update
        setStudents(prev => prev.map(s => {
            if (s.id === studentId) {
                const isPaid = !s.isPaid;
                return {
                    ...s,
                    isPaid,
                    lastPaymentDate: isPaid ? new Date().toISOString().split('T')[0] : null
                };
            }
            return s;
        }));

        // Call API
        try {
            const student = students.find(s => s.id === studentId);
            if (!student) return;

            const res = await fetch(`/api/students/${studentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPaid: !student.isPaid })
            });

            if (!res.ok) {
                // Revert if failed (optional, for now simple log)
                console.error("Failed to update payment status");
            }
        } catch (error) {
            console.error("Error updating payment status", error);
        }
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || s.status === statusFilter;
        const matchesPayment = paymentFilter === "all" ||
            (paymentFilter === "paid" && s.isPaid) ||
            (paymentFilter === "unpaid" && !s.isPaid);
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const paidCount = students.filter(s => s.isPaid).length;
    const unpaidCount = students.filter(s => !s.isPaid).length;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-[#292348] px-6 py-4 bg-surface-light/80 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Student Management</h2>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {students.length} Total
                        </span>
                        <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold">
                            {paidCount} Paid
                        </span>
                        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold">
                            {unpaidCount} Unpaid
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <NeonButton
                            variant="primary"
                            icon={<span className="material-symbols-outlined text-sm">add</span>}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add Student
                        </NeonButton>
                    </div>
                </header>

                {/* Add Student Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <GlassPanel className="w-full max-w-md p-6 relative">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            <h3 className="text-xl font-bold text-white mb-4">Add New Student</h3>
                            <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newStudent.name}
                                        onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                                        className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={newStudent.email}
                                        onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                                        className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <NeonButton variant="primary" type="submit">
                                        Create Account
                                    </NeonButton>
                                </div>
                            </form>
                        </GlassPanel>
                    </div>
                )}

                {/* Filters */}
                <div className="px-6 py-4 flex flex-wrap gap-4 border-b border-slate-200 dark:border-[#292348]">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center text-xs text-slate-500 mr-2">Status:</span>
                        {["all", "active", "blocked"].map((status) => (
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
                    <div className="flex gap-2">
                        <span className="flex items-center text-xs text-slate-500 mr-2">Payment:</span>
                        {["all", "paid", "unpaid"].map((payment) => (
                            <button
                                key={payment}
                                onClick={() => setPaymentFilter(payment)}
                                className={clsx(
                                    "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors",
                                    paymentFilter === payment
                                        ? payment === "paid" ? "bg-green-500 text-white" : payment === "unpaid" ? "bg-red-500 text-white" : "bg-primary text-white"
                                        : "bg-surface-dark text-slate-400 hover:text-white border border-white/10"
                                )}
                            >
                                {payment}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto p-6">
                    <GlassPanel className="overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-surface-dark/50">
                                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                                    <th className="p-4">Student</th>
                                    <th className="p-4">XP</th>
                                    <th className="p-4">Accuracy</th>
                                    <th className="p-4">Games</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={clsx(
                                            "border-t border-white/5 hover:bg-white/5 transition-colors",
                                            selectedStudent === student.id && "bg-primary/5"
                                        )}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={clsx(
                                                    "size-10 rounded-full flex items-center justify-center text-white font-bold",
                                                    student.isPaid
                                                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                                        : "bg-gradient-to-br from-red-500 to-rose-600"
                                                )}>
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{student.name}</p>
                                                    <p className="text-xs text-slate-500">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-yellow-400">{student.xp.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "font-bold",
                                                student.accuracy >= 90 ? "text-green-400" : student.accuracy >= 80 ? "text-yellow-400" : "text-red-400"
                                            )}>
                                                {student.accuracy}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-300">{student.games}</td>
                                        <td className="p-4 text-slate-400 text-sm">{student.joined}</td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "px-2 py-1 rounded-full text-xs font-bold uppercase",
                                                student.status === "active"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                            )}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {/* Payment Toggle Switch */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        togglePayment(student.id);
                                                    }}
                                                    className={clsx(
                                                        "relative w-14 h-7 rounded-full transition-all duration-300",
                                                        student.isPaid
                                                            ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                                            : "bg-slate-600"
                                                    )}
                                                    title={student.isPaid ? "Mark as Unpaid" : "Mark as Paid"}
                                                >
                                                    <span className={clsx(
                                                        "absolute top-1 size-5 rounded-full bg-white transition-all duration-300 flex items-center justify-center",
                                                        student.isPaid ? "left-8" : "left-1"
                                                    )}>
                                                        <span className={clsx(
                                                            "material-symbols-outlined text-xs",
                                                            student.isPaid ? "text-green-500" : "text-slate-400"
                                                        )}>
                                                            {student.isPaid ? "check" : "close"}
                                                        </span>
                                                    </span>
                                                </button>
                                                <div className="flex flex-col">
                                                    <span className={clsx(
                                                        "text-xs font-bold",
                                                        student.isPaid ? "text-green-400" : "text-red-400"
                                                    )}>
                                                        {student.isPaid ? "Paid" : "Unpaid"}
                                                    </span>
                                                    {student.lastPaymentDate && (
                                                        <span className="text-[10px] text-slate-500">
                                                            {student.lastPaymentDate}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-xl">visibility</span>
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                                                    <span className="material-symbols-outlined text-xl">block</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassPanel>
                </div>
            </main>
        </div>
    );
}
