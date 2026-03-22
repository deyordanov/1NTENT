export interface Question {
  id: string;
  text: string;
  dimension: Dimension;
  reverse?: boolean;
}

export type Dimension =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export type Answers = Record<string, number>;

export type Scores = Record<Dimension, number>;

export interface User {
  id: string;
  email: string;
  status: "pending" | "contacted" | "approved" | "rejected";
  created_at: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  answers: Answers;
  scores: Scores;
  completed_at: string;
}
