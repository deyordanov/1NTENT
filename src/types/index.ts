// Question types for the Romantic Profile Test (Test 2)
export interface ChoiceOption {
  label: string;
  labelFemale?: string; // optional override when user is female
  value: string;
}

export interface SingleChoiceQuestion {
  id: string;
  text: string;
  textFemale?: string;
  type: "choice";
  section?: string;
  options: ChoiceOption[];
}

export interface MultiChoiceQuestion {
  id: string;
  text: string;
  textFemale?: string;
  type: "multi";
  section?: string;
  options: ChoiceOption[];
  selectCount: number; // exactly N selections required
}

export interface ScaleQuestion {
  id: string;
  text: string;
  textFemale?: string;
  type: "scale";
  section?: string;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface OpenQuestion {
  id: string;
  text: string;
  textFemale?: string;
  type: "open";
  section?: string;
  placeholder?: string;
}

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | ScaleQuestion
  | OpenQuestion;

// Answers: question id → value
// scale: number, choice: string, multi: string[], open: string
export type AnswerValue = string | number | string[];
export type Answers = Record<string, AnswerValue>;

// Gender for profile selection
export type Gender = "male" | "female";

// Profile types — 10 gender-variant archetypes from Test 2
export type FemaleProfileType =
  | "devoted_queen"
  | "independent_spirit"
  | "nurturing_soul"
  | "ambitious_achiever"
  | "thoughtful_introvert";

export type MaleProfileType =
  | "steady_protector"
  | "visionary_leader"
  | "thoughtful_partner"
  | "passionate_romantic"
  | "classic_gentleman";

export type ProfileType = FemaleProfileType | MaleProfileType;

export interface ProfileResult {
  type: ProfileType;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  gender: Gender;
}

export interface User {
  id: string;
  email: string;
  phone?: string | null;
  gender?: Gender | null;
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
