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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const progress = (currentIndex / questions.length) * 100;
  const currentAnswer = answers[question.id];

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: parseInt(value) }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      const scores = computeScores(answers);
      sessionStorage.setItem(
        "testData",
        JSON.stringify({ answers, scores })
      );
      router.push("/signup");
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

        {/* Question card with animation */}
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

              <RadioGroup
                value={currentAnswer?.toString()}
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {scaleLabels.map((label, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-muted/60"
                    onClick={() => handleSelect((i + 1).toString())}
                  >
                    <RadioGroupItem
                      value={(i + 1).toString()}
                      id={`option-${i + 1}`}
                    />
                    <Label
                      htmlFor={`option-${i + 1}`}
                      className="cursor-pointer text-base"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              Назад
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className="rounded-full px-6"
            >
              {currentIndex < questions.length - 1 ? "Напред" : "Готово"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
