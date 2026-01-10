"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";
import clsx from "clsx";

type SettingsTab = "general" | "appearance" | "notifications" | "security" | "billing";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);

    const tabs: { id: SettingsTab; label: string; icon: string }[] = [
        { id: "general", label: "General", icon: "tune" },
        { id: "appearance", label: "Appearance", icon: "palette" },
        { id: "notifications", label: "Notifications", icon: "notifications" },
        { id: "security", label: "Security", icon: "shield" },
        { id: "billing", label: "Billing", icon: "credit_card" },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#292348] px-6 py-4 bg-background-dark/90 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold font-display text-white">Settings</h2>
                    </div>
                    <NeonButton variant="primary" icon={<span className="material-symbols-outlined text-sm">save</span>}>
                        Save Changes
                    </NeonButton>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "bg-surface-dark text-slate-400 hover:text-white border border-white/10"
                                    )}
                                >
                                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* General Settings */}
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                <GlassPanel className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">Platform Settings</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Platform Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="MathMaster"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Support Email
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue="support@mathmaster.edu"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Default Questions Per Session
                                            </label>
                                            <select className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors">
                                                <option value="5">5 Questions</option>
                                                <option value="10" selected>10 Questions</option>
                                                <option value="15">15 Questions</option>
                                                <option value="20">20 Questions</option>
                                            </select>
                                        </div>
                                    </div>
                                </GlassPanel>

                                <GlassPanel className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">XP & Rewards</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                XP Per Correct Answer
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue="10"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Streak Bonus Multiplier
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                defaultValue="1.5"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </GlassPanel>
                            </div>
                        )}

                        {/* Appearance Settings */}
                        {activeTab === "appearance" && (
                            <GlassPanel className="p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Theme & Display</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-white/5">
                                        <div>
                                            <p className="text-white font-medium">Dark Mode</p>
                                            <p className="text-sm text-slate-400">Use dark theme across the platform</p>
                                        </div>
                                        <button
                                            onClick={() => setDarkMode(!darkMode)}
                                            className={clsx(
                                                "relative w-14 h-8 rounded-full transition-colors",
                                                darkMode ? "bg-primary" : "bg-slate-600"
                                            )}
                                        >
                                            <span className={clsx(
                                                "absolute top-1 size-6 rounded-full bg-white transition-all",
                                                darkMode ? "left-7" : "left-1"
                                            )} />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-3">
                                            Primary Color
                                        </label>
                                        <div className="flex gap-3">
                                            {["#6C5CE7", "#00D9FF", "#FF6B6B", "#54E346", "#FFA726"].map((color) => (
                                                <button
                                                    key={color}
                                                    className={clsx(
                                                        "size-10 rounded-full ring-2 ring-offset-2 ring-offset-background-dark transition-all",
                                                        color === "#6C5CE7" ? "ring-white" : "ring-transparent hover:ring-white/50"
                                                    )}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Font Size
                                        </label>
                                        <div className="flex gap-2">
                                            {["Small", "Medium", "Large"].map((size) => (
                                                <button
                                                    key={size}
                                                    className={clsx(
                                                        "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                                                        size === "Medium"
                                                            ? "bg-primary text-white"
                                                            : "bg-surface-dark text-slate-400 hover:text-white border border-white/10"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </GlassPanel>
                        )}

                        {/* Notifications Settings */}
                        {activeTab === "notifications" && (
                            <GlassPanel className="p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
                                <div className="space-y-4">
                                    {[
                                        { id: "email", label: "Email Notifications", desc: "Receive updates via email", value: emailNotifications, setter: setEmailNotifications },
                                        { id: "push", label: "Push Notifications", desc: "Browser push notifications", value: pushNotifications, setter: setPushNotifications },
                                        { id: "weekly", label: "Weekly Reports", desc: "Receive weekly analytics summary", value: true, setter: () => { } },
                                        { id: "student", label: "New Student Alerts", desc: "Get notified when a new student joins", value: true, setter: () => { } },
                                        { id: "payment", label: "Payment Alerts", desc: "Notifications for payment events", value: true, setter: () => { } },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-white/5">
                                            <div>
                                                <p className="text-white font-medium">{item.label}</p>
                                                <p className="text-sm text-slate-400">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => item.setter(!item.value)}
                                                className={clsx(
                                                    "relative w-14 h-8 rounded-full transition-colors",
                                                    item.value ? "bg-primary" : "bg-slate-600"
                                                )}
                                            >
                                                <span className={clsx(
                                                    "absolute top-1 size-6 rounded-full bg-white transition-all",
                                                    item.value ? "left-7" : "left-1"
                                                )} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </GlassPanel>
                        )}

                        {/* Security Settings */}
                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <GlassPanel className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">Password</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <NeonButton variant="secondary">Update Password</NeonButton>
                                    </div>
                                </GlassPanel>

                                <GlassPanel className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">Two-Factor Authentication</h3>
                                    <div className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-white/5">
                                        <div>
                                            <p className="text-white font-medium">Enable 2FA</p>
                                            <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                                        </div>
                                        <NeonButton variant="secondary">Setup 2FA</NeonButton>
                                    </div>
                                </GlassPanel>
                            </div>
                        )}

                        {/* Billing Settings */}
                        {activeTab === "billing" && (
                            <div className="space-y-6">
                                <GlassPanel className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-white">Current Plan</h3>
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">Pro</span>
                                    </div>
                                    <div className="p-4 bg-surface-dark rounded-xl border border-white/5 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-medium">Pro Plan</span>
                                            <span className="text-2xl font-bold text-white">$49<span className="text-sm text-slate-400">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-400">Unlimited students, advanced analytics, priority support</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <NeonButton variant="primary">Upgrade Plan</NeonButton>
                                        <NeonButton variant="secondary">Cancel Subscription</NeonButton>
                                    </div>
                                </GlassPanel>

                                <GlassPanel className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
                                    <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-xl border border-white/5">
                                        <div className="size-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white">credit_card</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium">•••• •••• •••• 4242</p>
                                            <p className="text-sm text-slate-400">Expires 12/25</p>
                                        </div>
                                        <button className="text-primary hover:text-primary/80 text-sm font-medium">Edit</button>
                                    </div>
                                </GlassPanel>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
