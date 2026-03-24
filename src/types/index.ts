// Question types for the Awareness Quiz
export interface ChoiceOption {
  label: string;
  value: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  text: string;
  type: "choice";
  options: ChoiceOption[];
}

export interface ScaleQuestion {
  id: string;
  text: string;
  type: "scale";
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface OpenQuestion {
  id: string;
  text: string;
  type: "open";
  placeholder?: string;
}

export type Question = MultipleChoiceQuestion | ScaleQuestion | OpenQuestion;

// Answers: question id → selected value (string for choice, number for scale)
export type Answers = Record<string, string | number>;

// Profile result
export type ProfileType =
  | "ready"
  | "selective"
  | "grounded"
  | "emerging";

export interface ProfileResult {
  type: ProfileType;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
}

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
  profile: ProfileResult;
  completed_at: string;
}
