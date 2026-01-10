"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/student" });
        } catch (error) {
            console.error("Sign in error:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/4"></div>
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                ></div>
            </div>

            <GlassPanel className="w-full max-w-[420px] flex flex-col animate-fade-in-up box-glow">
                {/* Hero Image Area */}
                <div className="relative h-48 w-full overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1833] to-transparent z-10"></div>
                    {/* Abstract Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 via-purple-600/20 to-blue-600/20"></div>
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center pt-4">
                        <div className="relative flex items-center justify-center size-20 rounded-full bg-background-dark/50 border border-primary/30 shadow-[0_0_15px_rgba(55,19,236,0.4)] backdrop-blur-sm">
                            <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontSize: "40px" }}
                            >
                                functions
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col gap-6 px-8 pb-10 pt-2 text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-white font-display">
                            Ready to Solve?
                        </h1>
                        <p className="text-slate-400 text-base font-normal leading-relaxed">
                            Sign in to track your progress, unlock achievements, and climb the leaderboard.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                        <NeonButton
                            variant="google"
                            fullWidth
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            icon={
                                isLoading ? (
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                                )
                            }
                        >
                            {isLoading ? "Signing in..." : "Sign in with Google"}
                        </NeonButton>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-widest">or</span>
                            <div className="flex-grow border-t border-slate-700"></div>
                        </div>

                        <a href="/play/setup">
                            <NeonButton variant="secondary" fullWidth icon={<span className="material-symbols-outlined text-[20px]">play_arrow</span>}>
                                Continue as Guest
                            </NeonButton>
                        </a>
                    </div>

                    <p className="text-slate-500 text-xs font-normal leading-normal px-4">
                        By signing in, you agree to our <a href="#" className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4">Terms</a> and <a href="#" className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4">Privacy Policy</a>.
                    </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            </GlassPanel>

            <footer className="mt-8 flex gap-6 text-center">
                <a href="/" className="text-slate-500 hover:text-white text-sm font-normal transition-colors">Back to Home</a>
                <span className="text-slate-700">•</span>
                <a href="/play/setup" className="text-slate-500 hover:text-white text-sm font-normal transition-colors">Guest Mode</a>
            </footer>
        </div>
    );
}
