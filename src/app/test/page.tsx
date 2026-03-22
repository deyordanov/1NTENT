"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { computeScores } from "@/lib/scoring";
import { Answers } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const scaleLabels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const currentAnswer = answers[question.id];

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: parseInt(value) }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
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
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={handleSelect}
              className="space-y-3"
            >
              {scaleLabels.map((label, i) => (
                <div key={i} className="flex items-center space-x-3">
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

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentIndex === 0}
              >
                Back
              </Button>
              <Button onClick={handleNext} disabled={currentAnswer === undefined}>
                {currentIndex < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
