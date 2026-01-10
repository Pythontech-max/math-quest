import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "MathQuest - Gamified Math Learning",
    description: "Practice math with fun missions, earn XP, and climb the leaderboard!",
    keywords: ["math", "learning", "education", "gamification", "practice"],
    openGraph: {
        title: "MathQuest - Gamified Math Learning",
        description: "Practice math with fun missions, earn XP, and climb the leaderboard!",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-body bg-background-light dark:bg-background-dark min-h-screen">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
