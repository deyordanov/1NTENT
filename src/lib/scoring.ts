import { Answers, Dimension, Scores } from "@/types";
import { questions } from "./questions";

export const dimensionLabels: Record<Dimension, string> = {
  openness: "Откритост",
  conscientiousness: "Отговорност",
  extraversion: "Общителност",
  agreeableness: "Съгласие",
  neuroticism: "Чувствителност",
};

export function computeScores(answers: Answers): Scores {
  const dimensionTotals: Record<Dimension, { sum: number; count: number }> = {
    openness: { sum: 0, count: 0 },
    conscientiousness: { sum: 0, count: 0 },
    extraversion: { sum: 0, count: 0 },
    agreeableness: { sum: 0, count: 0 },
    neuroticism: { sum: 0, count: 0 },
  };

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // Reverse-scored: 1→5, 2→4, 3→3, 4→2, 5→1
      const value = question.reverse ? 6 - answer : answer;
      dimensionTotals[question.dimension].sum += value;
      dimensionTotals[question.dimension].count += 1;
    }
  }

  const scores: Scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  for (const dim of Object.keys(dimensionTotals) as Dimension[]) {
    const { sum, count } = dimensionTotals[dim];
    if (count > 0) {
      // Normalize: answer is 1-5, so (avg - 1) / 4 * 100 gives 0-100
      const avg = sum / count;
      scores[dim] = Math.round(((avg - 1) / 4) * 100);
    }
  }

  return scores;
}
