"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { questions } from "@/lib/questions";
import { computeScores } from "@/lib/scoring";
import { Answers } from "@/types";
import { Logo } from "@/components/logo";

const scaleLabels = [
  "Изобщо не",
  "По-скоро не",
  "Неутрално",
  "По-скоро да",
  "Напълно!",
];

const dotColors = [
  "hsl(346, 77%, 50%)",
  "hsl(346, 60%, 65%)",
  "hsl(346, 80%, 75%)",
  "hsl(20, 60%, 70%)",
  "hsl(346, 90%, 40%)",
];

function ConfettiDot({ x, y }: { x: number; y: number }) {
  const randomX = (Math.random() - 0.5) * 240;
  const randomY = (Math.random() - 0.7) * 200;
  const size = 4 + Math.random() * 6;
  const color = dotColors[Math.floor(Math.random() * dotColors.length)];

  return (
    <motion.div
      className="pointer-events-none fixed rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        zIndex: 100,
      }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
      animate={{
        opacity: 0,
        x: randomX,
        y: randomY,
        scale: 0.2,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  );
}

function PulseRing({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded-xl border-2 border-primary"
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [selectedFlash, setSelectedFlash] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Restore saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem("1ntent_test_progress");
      if (saved) {
        const { answers: savedAnswers, index } = JSON.parse(saved);
        if (index > 0 && Object.keys(savedAnswers).length > 0) {
          setShowResume(true);
        }
      }
    } catch {}
  }, []);

  function handleResume() {
    try {
      const saved = localStorage.getItem("1ntent_test_progress");
      if (saved) {
        const { answers: savedAnswers, index } = JSON.parse(saved);
        setAnswers(savedAnswers);
        setCurrentIndex(index);
      }
    } catch {}
    setShowResume(false);
  }

  function handleStartFresh() {
    localStorage.removeItem("1ntent_test_progress");
    setShowResume(false);
  }

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id];
  const isLast = currentIndex === questions.length - 1;

  const progressColor = useMotionValue(progress);
  const progressBg = useTransform(
    progressColor,
    [0, 50, 100],
    ["hsl(346, 60%, 75%)", "hsl(346, 77%, 55%)", "hsl(346, 80%, 45%)"]
  );

  useEffect(() => {
    progressColor.set(progress);
  }, [progress, progressColor]);

  const spawnParticles = useCallback((e: React.MouseEvent, count: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);
  }, []);

  function handleSelect(value: number, e: React.MouseEvent) {
    if (transitioning) return;
    setTransitioning(true);

    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);
    setSelectedFlash(value);
    setStreak((s) => s + 1);

    const particleCount = Math.min(3 + streak, 8) + (value >= 4 ? 2 : 0);
    spawnParticles(e, particleCount);

    setTimeout(() => setSelectedFlash(null), 400);

    if (isLast) {
      const scores = computeScores(updated);
      sessionStorage.setItem(
        "testData",
        JSON.stringify({ answers: updated, scores })
      );
      localStorage.removeItem("1ntent_test_progress");
      setTimeout(() => router.push("/signup"), 600);
    } else {
      // Save progress
      const nextIndex = currentIndex + 1;
      localStorage.setItem(
        "1ntent_test_progress",
        JSON.stringify({ answers: updated, index: nextIndex })
      );
      setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
        setTransitioning(false);
      }, 450);
    }
  }

  function handleBack() {
    if (currentIndex > 0 && !transitioning) {
      setTransitioning(true);
      setDirection(-1);
      setStreak(0);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setTransitioning(false), 400);
    }
  }

  function getEncouragement(): string | null {
    const answered = Object.keys(answers).length;
    if (currentIndex === 0) return "Чудесно начало!";
    if (currentIndex === 9) return "Последен въпрос!";
    if (currentIndex === 8) return "Почти готово!";

    // Personality-based hints after enough data
    if (answered >= 3) {
      const avg = Object.values(answers).reduce((a, b) => a + b, 0) / answered;
      if (currentIndex === 4) return "Вече си на половината!";
      if (currentIndex === 5 && avg > 3.5) return "Изглеждаш доста решителен/а!";
      if (currentIndex === 5 && avg <= 3.5) return "Интересен профил се оформя...";
      if (currentIndex === 7) return "Още малко!";
    }

    return `Въпрос ${currentIndex + 1} от ${questions.length}`;
  }

  if (showResume) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-xl font-semibold">
            Имаш незавършен тест
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Искаш ли да продължиш откъдето спря?
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={handleResume}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Продължи
            </button>
            <button
              onClick={handleStartFresh}
              className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Започни отначало
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <ConfettiDot key={p.id} x={p.x} y={p.y} />
        ))}
      </AnimatePresence>

      {/* Background glow */}
      <motion.div
        className="pointer-events-none fixed inset-0"
        animate={{
          background: `radial-gradient(circle at 50% 40%, hsla(346, 77%, 50%, ${0.03 + progress * 0.001}) 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="mb-4 text-center">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-tight text-foreground"
          >
            <Logo />
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                className="text-muted-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {getEncouragement()}
              </motion.span>
            </AnimatePresence>
            <span className="text-muted-foreground">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>

          {/* Custom progress bar */}
          <div className="h-2 overflow-hidden rounded-full bg-muted/50">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: progressBg }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <motion.div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
          layout
        >
          <div className="p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mb-8 font-serif text-xl font-semibold leading-relaxed sm:text-2xl">
                  {question.text}
                </h2>

                <div className="space-y-2.5">
                  {scaleLabels.map((label, i) => {
                    const value = i + 1;
                    const isSelected = currentAnswer === value;
                    const isFlashing = selectedFlash === value;

                    return (
                      <motion.button
                        key={i}
                        onClick={(e) => handleSelect(value, e)}
                        className={`relative flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-base transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground shadow-md shadow-primary/10"
                            : "border-border/40 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-sm"
                        }`}
                        transition={{ duration: 0.15 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <PulseRing isActive={isFlashing} />

                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-white"
                              : "border-muted-foreground/25 text-muted-foreground/50"
                          }`}
                        >
                          {value}
                        </span>

                        <span className="flex-1 font-medium">{label}</span>

                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Back button */}
            {currentIndex > 0 && (
              <motion.div
                className="mt-6 flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleBack}
                  className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700"
                >
                  &larr; Назад
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          className="mt-4 text-center text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Просто кликни отговора си
        </motion.p>
      </div>
    </main>
  );
}
