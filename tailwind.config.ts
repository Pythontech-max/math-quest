import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3713ec",
                accent: "#00f0ff",
                "accent-secondary": "#ff00aa",
                "background-light": "#f6f6f8",
                "background-dark": "#050816",
                "surface-dark": "#10162f",
                "surface-light": "#ffffff",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                body: ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
            },
            boxShadow: {
                neon: "0 0 10px rgba(55, 19, 236, 0.5), 0 0 20px rgba(55, 19, 236, 0.3)",
                "neon-sm": "0 0 5px rgba(55, 19, 236, 0.5)",
                glow: "0 0 20px -5px rgba(55, 19, 236, 0.5)",
                "glow-accent": "0 0 15px -3px rgba(0, 240, 255, 0.4)",
            },
            backgroundImage: {
                "neon-glow":
                    "radial-gradient(circle at center, rgba(55, 19, 236, 0.4) 0%, rgba(19, 16, 34, 0) 70%)",
            },
            animation: {
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                blink: "blink 1s step-end infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
