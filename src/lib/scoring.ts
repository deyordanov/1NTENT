import { Answers, ProfileResult, ProfileType } from "@/types";

const profiles: Record<ProfileType, ProfileResult> = {
  ready: {
    type: "ready",
    title: "Готовият",
    subtitle: "The Ready One",
    description:
      "Знаеш какво искаш и не искаш да губиш повече време. Търсиш някой с еднакво ясни намерения. 1NTENT е създаден за хора като теб.",
    emoji: "🔥",
  },
  selective: {
    type: "selective",
    title: "Избирателната душа",
    subtitle: "The Selective Soul",
    description:
      "Имаш високи стандарти и не правиш компромиси. Не си труден/а за угаждане, а труден/а за заблуда. Нуждаеш се от подбрано, а не случайно съвпадение.",
    emoji: "💎",
  },
  grounded: {
    type: "grounded",
    title: "Заземеният търсач",
    subtitle: "The Grounded Seeker",
    description:
      "Ценеш стабилността и дълбочината пред вълнението. Строиш живот, не само история. Качеството пред количеството е твоето мото.",
    emoji: "🧭",
  },
  emerging: {
    type: "emerging",
    title: "Израстващият",
    subtitle: "The Emerging One",
    description:
      "В преход си — растеш, преоткриваш се или просто искаш нещата да са различни този път. Готов/а си да опиташ по нов начин. 1NTENT може да ти помогне.",
    emoji: "🌱",
  },
};

export function computeProfile(answers: Answers): ProfileResult {
  // Score each profile based on answer signals
  const scores: Record<ProfileType, number> = {
    ready: 0,
    selective: 0,
    grounded: 0,
    emerging: 0,
  };

  // Q1: Ideal Sunday
  const q1 = answers.q1 as string;
  if (q1 === "calm") { scores.grounded += 2; scores.selective += 1; }
  if (q1 === "active") { scores.ready += 1; scores.grounded += 1; }
  if (q1 === "social") { scores.ready += 1; scores.emerging += 1; }
  if (q1 === "driven") { scores.ready += 2; scores.selective += 1; }

  // Q2: Dating frustration
  const q2 = answers.q2 as string;
  if (q2 === "commitment") { scores.ready += 2; scores.grounded += 1; }
  if (q2 === "safety") { scores.grounded += 2; scores.emerging += 1; }
  if (q2 === "depth") { scores.selective += 2; scores.grounded += 1; }
  if (q2 === "time") { scores.ready += 2; scores.selective += 1; }

  // Q3: Readiness scale (1-5)
  const q3 = answers.q3 as number;
  if (q3 >= 4) { scores.ready += 3; scores.selective += 1; }
  else if (q3 === 3) { scores.grounded += 2; scores.selective += 1; }
  else { scores.emerging += 3; scores.grounded += 1; }

  // Q4: Relationship style
  const q4 = answers.q4 as string;
  if (q4 === "actions") { scores.grounded += 2; scores.ready += 1; }
  if (q4 === "emotional") { scores.selective += 2; scores.emerging += 1; }
  if (q4 === "physical") { scores.ready += 1; scores.emerging += 1; }
  if (q4 === "space") { scores.selective += 1; scores.emerging += 2; }

  // Q5: Worry after 3 dates
  const q5 = answers.q5 as string;
  if (q5 === "ghosting") { scores.emerging += 2; scores.grounded += 1; }
  if (q5 === "exclusivity") { scores.ready += 2; scores.selective += 1; }
  if (q5 === "alignment") { scores.selective += 2; scores.grounded += 1; }
  if (q5 === "authenticity") { scores.grounded += 2; scores.selective += 1; }

  // Q6: Most important trait
  const q6 = answers.q6 as string;
  if (q6 === "empathy") { scores.selective += 2; scores.grounded += 1; }
  if (q6 === "ambition") { scores.ready += 2; scores.selective += 1; }
  if (q6 === "stability") { scores.grounded += 3; }
  if (q6 === "passion") { scores.ready += 1; scores.emerging += 2; }

  // Find highest scoring profile
  let maxScore = -1;
  let result: ProfileType = "ready";
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      result = type as ProfileType;
    }
  }

  return profiles[result];
}

// Radar chart dimensions derived from quiz answers
export type RadarDimension = "readiness" | "emotionalDepth" | "intentionality" | "stability" | "openness";

export const radarLabels: Record<RadarDimension, string> = {
  readiness: "Готовност",
  emotionalDepth: "Емоционална дълбочина",
  intentionality: "Целенасоченост",
  stability: "Стабилност",
  openness: "Откритост",
};

export type RadarScores = Record<RadarDimension, number>;

export function computeRadarScores(answers: Answers): RadarScores {
  const scores: Record<RadarDimension, number> = {
    readiness: 0,
    emotionalDepth: 0,
    intentionality: 0,
    stability: 0,
    openness: 0,
  };

  // Max possible per dimension ~15, we'll normalize to 0-100

  // Q1: Ideal Sunday
  const q1 = answers.q1 as string;
  if (q1 === "calm") { scores.stability += 3; scores.emotionalDepth += 2; }
  if (q1 === "active") { scores.openness += 3; scores.readiness += 1; }
  if (q1 === "social") { scores.openness += 3; scores.emotionalDepth += 1; }
  if (q1 === "driven") { scores.intentionality += 3; scores.readiness += 2; }

  // Q2: Dating frustration
  const q2 = answers.q2 as string;
  if (q2 === "commitment") { scores.readiness += 3; scores.intentionality += 2; }
  if (q2 === "safety") { scores.stability += 3; scores.emotionalDepth += 1; }
  if (q2 === "depth") { scores.emotionalDepth += 3; scores.intentionality += 1; }
  if (q2 === "time") { scores.intentionality += 3; scores.readiness += 2; }

  // Q3: Readiness scale (1-5)
  const q3 = answers.q3 as number;
  scores.readiness += q3 * 2; // 2-10
  if (q3 >= 4) scores.intentionality += 2;
  if (q3 <= 2) scores.emotionalDepth += 2;

  // Q4: Relationship style
  const q4 = answers.q4 as string;
  if (q4 === "actions") { scores.stability += 3; scores.intentionality += 1; }
  if (q4 === "emotional") { scores.emotionalDepth += 3; scores.openness += 1; }
  if (q4 === "physical") { scores.openness += 2; scores.readiness += 1; }
  if (q4 === "space") { scores.stability += 1; scores.emotionalDepth += 2; }

  // Q5: Worry after 3 dates
  const q5 = answers.q5 as string;
  if (q5 === "ghosting") { scores.emotionalDepth += 2; scores.stability += 2; }
  if (q5 === "exclusivity") { scores.intentionality += 3; scores.readiness += 1; }
  if (q5 === "alignment") { scores.intentionality += 2; scores.stability += 2; }
  if (q5 === "authenticity") { scores.stability += 3; scores.emotionalDepth += 1; }

  // Q6: Most important trait
  const q6 = answers.q6 as string;
  if (q6 === "empathy") { scores.emotionalDepth += 3; scores.openness += 1; }
  if (q6 === "ambition") { scores.intentionality += 3; scores.readiness += 1; }
  if (q6 === "stability") { scores.stability += 3; scores.readiness += 1; }
  if (q6 === "passion") { scores.openness += 3; scores.readiness += 2; }

  // Normalize all to 0-100 (max raw ~15 per dimension)
  const maxRaw = 15;
  for (const key of Object.keys(scores) as RadarDimension[]) {
    scores[key] = Math.min(100, Math.round((scores[key] / maxRaw) * 100));
  }

  return scores;
}

// Export profile data for use in other components
export { profiles };
