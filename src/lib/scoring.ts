import { Answers, Dimension, Scores } from "@/types";
import { questions } from "./questions";

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
      dimensionTotals[question.dimension].sum += answer;
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
