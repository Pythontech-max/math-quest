"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const errorMessages: Record<string, { title: string; description: string }> = {
        Configuration: {
            title: "Server Configuration Error",
            description: "There's a problem with the authentication configuration. Please contact support."
        },
        AccessDenied: {
            title: "Access Denied",
            description: "You don't have permission to sign in. Your account may be blocked."
        },
        Verification: {
            title: "Verification Failed",
            description: "The verification link may have expired or already been used."
        },
        OAuthSignin: {
            title: "OAuth Sign-in Error",
            description: "Could not start the sign-in process. Please try again."
        },
        OAuthCallback: {
            title: "OAuth Callback Error",
            description: "Error during the OAuth callback. Please try signing in again."
        },
        OAuthCreateAccount: {
            title: "Account Creation Error",
            description: "Could not create your account. The email may already be in use."
        },
        Callback: {
            title: "Callback Error",
            description: "An error occurred during the authentication callback."
        },
        Default: {
            title: "Authentication Error",
            description: "An unexpected error occurred. Please try again."
        }
    };

    const { title, description } = errorMessages[error || ""] || errorMessages.Default;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-dark">
            <GlassPanel className="w-full max-w-md p-8 text-center">
                <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <p className="text-slate-400 mb-6">{description}</p>

                {error && (
                    <p className="text-xs text-slate-500 mb-6 font-mono bg-surface-dark p-2 rounded">
                        Error code: {error}
                    </p>
                )}

                <div className="flex flex-col gap-3">
                    <Link href="/auth/signin">
                        <NeonButton fullWidth variant="primary" icon={<span className="material-symbols-outlined">login</span>}>
                            Try Again
                        </NeonButton>
                    </Link>
                    <Link href="/">
                        <NeonButton fullWidth variant="secondary" icon={<span className="material-symbols-outlined">home</span>}>
                            Back to Home
                        </NeonButton>
                    </Link>
                </div>
            </GlassPanel>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-white">Loading...</div>}>
            <ErrorContent />
        </Suspense>
    );
}
