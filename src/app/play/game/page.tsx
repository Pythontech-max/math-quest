"use client";

import { Keypad } from "@/components/game/Keypad";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import clsx from "clsx";

function GameLogic() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Params
    const operation = searchParams.get("op") || "addition";
    const difficulty = searchParams.get("diff") || "easy";
    const totalQuestions = parseInt(searchParams.get("count") || "10");

    // State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [question, setQuestion] = useState({ text: "", answer: 0 });
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0); // Count up for now, or total time
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Load Question
    const generateQuestion = useCallback(() => {
        let a = 0, b = 0, ans = 0, text = "";
        const limit = difficulty === "easy" ? 10 : difficulty === "medium" ? 50 : 100;

        a = Math.floor(Math.random() * limit) + 1;
        b = Math.floor(Math.random() * limit) + 1;

        switch (operation) {
            case "subtraction":
                if (a < b) [a, b] = [b, a]; // Positive results
                ans = a - b;
                text = `${a} - ${b} = ?`;
                break;
            case "multiplication":
                a = Math.floor(Math.random() * (difficulty === "easy" ? 10 : 20)); // Smaller range for mul
                b = Math.floor(Math.random() * 10);
                ans = a * b;
                text = `${a} × ${b} = ?`;
                break;
            case "division":
                b = Math.floor(Math.random() * 10) + 1;
                a = b * (Math.floor(Math.random() * 10) + 1); // Clean division
                ans = a / b;
                text = `${a} ÷ ${b} = ?`;
                break;
            case "place_values":
                // Generate place value questions
                const placeTypes = [
                    { name: "ones", divisor: 1, mod: 10 },
                    { name: "tens", divisor: 10, mod: 10 },
                    { name: "hundreds", divisor: 100, mod: 10 },
                ];
                const maxNumber = difficulty === "easy" ? 99 : difficulty === "medium" ? 999 : 9999;
                const minNumber = difficulty === "easy" ? 10 : difficulty === "medium" ? 100 : 1000;
                const num = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

                // Filter places based on difficulty
                const availablePlaces = difficulty === "easy"
                    ? placeTypes.slice(0, 2) // ones, tens
                    : difficulty === "medium"
                        ? placeTypes // ones, tens, hundreds
                        : [...placeTypes, { name: "thousands", divisor: 1000, mod: 10 }];

                const place = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
                ans = Math.floor(num / place.divisor) % place.mod;
                text = `What is the ${place.name} digit in ${num}?`;
                break;
            case "addition":
            default:
                ans = a + b;
                text = `${a} + ${b} = ?`;
                break;
        }
        setQuestion({ text, answer: ans });
        setUserInput("");
        setIsCorrect(null);
    }, [difficulty, operation]);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((t) => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Timer (moved)
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((t) => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleInput = (val: string) => {
        if (userInput.length < 5) setUserInput((prev) => prev + val);
    };

    const handleDelete = () => {
        setUserInput((prev) => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        const num = parseInt(userInput);
        if (isNaN(num)) return;

        const isRight = num === question.answer;

        if (isRight) {
            setScore((s) => s + 10);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setTimeout(() => {
            if (currentQIndex + 1 >= totalQuestions) {
                // End Game - Calculate final stats (current score + 10 if this one was right)
                const finalScore = score + (isRight ? 10 : 0);
                const correctCount = Math.floor(finalScore / 10);

                const params = new URLSearchParams({
                    score: finalScore.toString(),
                    correct: correctCount.toString(),
                    total: totalQuestions.toString(),
                    op: operation,
                    diff: difficulty,
                    time: timeLeft.toString()
                });
                router.push(`/play/results?${params.toString()}`);
            } else {
                setCurrentQIndex((i) => i + 1);
                generateQuestion();
            }
        }, 500);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= "0" && e.key <= "9") {
                handleInput(e.key);
            } else if (e.key === "Backspace") {
                handleDelete();
            } else if (e.key === "Enter") {
                handleSubmit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [userInput, question, currentQIndex]); // Depend on state to ensure latest closures if not using refs, or just dependencies needed.
    // Actually, handleInput uses function state update, but handleSubmit reads userInput directly.
    // So we need clear dependencies.


    return (
        <div className="flex flex-col min-h-[100dvh] bg-background-light dark:bg-background-dark relative pb-6">
            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#292348] bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-[#292348] text-gray-800 dark:text-white">
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>pause</span>
                    </button>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 dark:text-[#9b92c9] uppercase tracking-wider">Level 1</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">{operation}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#292348]">
                        <span className="material-symbols-outlined text-yellow-500" style={{ fontSize: "18px" }}>bolt</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{score}</span>
                    </div>
                </div>
            </header>

            {/* Progress */}
            <div className="relative z-10 px-6 pt-6 pb-2 w-full max-w-md mx-auto">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-[#9b92c9]">Question {currentQIndex + 1} of {totalQuestions}</span>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary dark:text-[#9b92c9]" style={{ fontSize: "18px" }}>timer</span>
                        <span className="text-xl font-bold text-primary dark:text-white tabular-nums">
                            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-[#292348] rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-neon-sm rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
            </div>

            {/* Main Game Area */}
            <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 gap-8 w-full max-w-md mx-auto">
                <div className="flex flex-col items-center gap-2 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-lg text-center font-display">
                        {question.text.split('=')[0]} = ?
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-[#9b92c9] font-medium">Solve the equation</p>
                </div>

                <div className="w-full max-w-[280px]">
                    <div className={clsx(
                        "relative flex items-center justify-center w-full h-20 bg-gray-50 dark:bg-surface-dark border-2 rounded-2xl shadow-neon transition-all duration-300",
                        isCorrect === true ? "border-green-500 bg-green-500/10" :
                            isCorrect === false ? "border-red-500 bg-red-500/10" :
                                "border-primary/50 dark:border-primary"
                    )}>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-widest">
                            {userInput}
                            <span className="w-0.5 h-8 bg-primary inline-block ml-1 align-middle animate-blink"></span>
                        </span>
                    </div>
                </div>
            </main>

            <Keypad onInput={handleInput} onDelete={handleDelete} onSubmit={handleSubmit} />
        </div>
    );
}

export default function GamePage() {
    return (
        <Suspense fallback={<div className="text-white text-center p-10">Loading Mission Data...</div>}>
            <GameLogic />
        </Suspense>
    )
}
