import { Answers, ProfileResult, ProfileType } from "@/types";

const profiles: Record<ProfileType, ProfileResult> = {
  ready: {
    type: "ready",
    title: "Готовия",
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
      "Имаш високи стандарти и не правиш компромиси. Не си за всеки, а за правилния човек. Нуждаеш се от подбрано, а не случайно съвпадение.",
    emoji: "💎",
  },
  grounded: {
    type: "grounded",
    title: "Заземеният търсач",
    subtitle: "The Grounded Seeker",
    description:
      "Цениш стабилността и дълбочината пред вълнението. Строиш живот, не само история. Качеството пред количеството е твоето мото.",
    emoji: "🧭",
  },
  emerging: {
    type: "emerging",
    title: "Израстващия",
    subtitle: "The Emerging One",
    description:
      "В преход си: растеш, преоткриваш се или просто искаш нещата да са различни този път. Готово е за нов начин. 1NTENT може да помогне.",
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
  emotionalDepth: "Емоционалност",
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

// Rarity percentages per profile (designed to feel special)
export const profileRarity: Record<ProfileType, number> = {
  ready: 18,
  selective: 12,
  grounded: 22,
  emerging: 14,
};

/**
 * Compatibility Algorithm
 *
 * Based on relationship psychology research:
 * - Couples need ALIGNMENT on values, goals, and readiness (similar = better)
 * - Couples benefit from COMPLEMENTARITY on personality traits (moderate difference = ideal)
 * - Both partners must be ready — mismatched readiness is a dealbreaker
 *
 * 5 dimensions, each scored 0-100:
 *
 * 1. Readiness     — ALIGNMENT + BONUS: both high = strong match, one low = penalty
 * 2. Intentionality — ALIGNMENT: shared sense of purpose matters most
 * 3. Stability      — ALIGNMENT: mismatched need for security causes friction
 * 4. Emotional Depth — COMPLEMENTARY: one slightly more emotional balances well
 * 5. Openness       — COMPLEMENTARY: too similar = boring, too different = clash
 *
 * Weights: Readiness (25%), Intentionality (25%), Stability (20%),
 *          Emotional Depth (15%), Openness (15%)
 *
 * Final score is scaled to 58-96 range (nobody wants <55%, nobody believes 100%)
 */
export function computeCompatibility(a: RadarScores, b: RadarScores): number {
  // Helper: alignment score — closer = better
  function alignmentScore(valA: number, valB: number): number {
    const diff = Math.abs(valA - valB);
    return Math.max(0, 100 - diff * 1.3);
  }

  // Helper: complementary score — moderate difference (~15-25) is ideal
  function complementaryScore(valA: number, valB: number): number {
    const diff = Math.abs(valA - valB);
    const idealDiff = 20;
    const deviation = Math.abs(diff - idealDiff);
    return Math.max(0, 100 - deviation * 2);
  }

  // 1. Readiness — not just alignment, both must actually be ready
  // Multiply alignment by a "readiness quality" factor
  const readinessAlign = alignmentScore(a.readiness, b.readiness);
  const avgReadiness = (a.readiness + b.readiness) / 2;
  const minReadiness = Math.min(a.readiness, b.readiness);
  // Quality factor: 1.0 when avg >= 70, drops to 0.3 when avg <= 20
  const qualityFactor = Math.min(1, Math.max(0.3, (avgReadiness - 20) / 50));
  // Extra penalty if one person is very low (dealbreaker)
  const mismatchPenalty = minReadiness < 30 ? 0.6 : 1;
  const readiness = readinessAlign * qualityFactor * mismatchPenalty;

  // 2. Intentionality — pure alignment
  const intentionality = alignmentScore(a.intentionality, b.intentionality);

  // 3. Stability — alignment with slight tolerance
  const stability = alignmentScore(a.stability, b.stability);

  // 4. Emotional Depth — complementary
  const emotionalDepth = complementaryScore(a.emotionalDepth, b.emotionalDepth);

  // 5. Openness — complementary
  const openness = complementaryScore(a.openness, b.openness);

  // Weighted average
  // Readiness is heaviest — it's the #1 predictor of success
  const weighted =
    readiness * 0.30 +
    intentionality * 0.25 +
    stability * 0.20 +
    emotionalDepth * 0.13 +
    openness * 0.12;

  // Scale to 58-96 range
  return Math.round(58 + (weighted / 100) * 38);
}

// Export profile data for use in other components
export { profiles };
