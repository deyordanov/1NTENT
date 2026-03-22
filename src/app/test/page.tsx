"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/questions";
import { computeScores } from "@/lib/scoring";
import { Answers } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/logo";

const scaleLabels = [
  "Напълно несъгласен/на",
  "Несъгласен/на",
  "Неутрално",
  "Съгласен/на",
  "Напълно съгласен/на",
];

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(value: number) {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);

    if (isLast) {
      const scores = computeScores(updated);
      sessionStorage.setItem(
        "testData",
        JSON.stringify({ answers: updated, scores })
      );
      setTimeout(() => router.push("/signup"), 400);
    } else {
      setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
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
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>
              Въпрос {currentIndex + 1} от {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Question card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="mb-8 font-serif text-xl font-semibold leading-relaxed sm:text-2xl">
                {question.text}
              </h2>

              <div className="space-y-2">
                {scaleLabels.map((label, i) => {
                  const value = i + 1;
                  const isSelected = currentAnswer === value;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(value)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border/40 hover:border-primary/30 hover:bg-muted/40"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-muted-foreground/30 text-muted-foreground/50"
                        }`}
                      >
                        {value}
                      </span>
                      <span>{label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Back button only */}
          {currentIndex > 0 && (
            <div className="mt-6 flex justify-start">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="rounded-full text-muted-foreground"
              >
                &larr; Назад
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
