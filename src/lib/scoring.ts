import { Answers, Gender, ProfileResult, ProfileType } from "@/types";

// ============================================================================
// PROFILE DEFINITIONS — 10 gender-variant archetypes from Test 2
// ============================================================================

const femaleProfiles: Record<string, ProfileResult> = {
  devoted_queen: {
    type: "devoted_queen",
    gender: "female",
    title: "Отдадената Кралица",
    subtitle: "The Devoted Queen",
    description:
      "Обичаш дълбоко и пълноценно. Носиш топлота, лоялност и емоционална щедрост във връзката. Нуждаеш се от партньор, който отговаря на дълбочината ти и не приема откритостта ти за слабост. Готова си да изградиш нещо значимо.",
    emoji: "👑",
  },
  independent_spirit: {
    type: "independent_spirit",
    gender: "female",
    title: "Независимият Дух",
    subtitle: "The Independent Spirit",
    description:
      "Изградила си богат живот и не търсиш някой да те допълни — търсиш някой, който да го допълни. Самостоятелна и целенасочена, нуждаеш се от партньор, който уважава автономията ти и може да върви в крак с теб.",
    emoji: "🦋",
  },
  nurturing_soul: {
    type: "nurturing_soul",
    gender: "female",
    title: "Грижовната Душа",
    subtitle: "The Nurturing Soul",
    description:
      "Създаваш безопасни емоционални пространства. Емпатична и интуитивна, често си емоционалната котва във връзките си. Нуждаеш се от партньор, който отвръща с грижа и не приема дарбата ти за даденост.",
    emoji: "🌺",
  },
  ambitious_achiever: {
    type: "ambitious_achiever",
    gender: "female",
    title: "Амбициозният Постигач",
    subtitle: "The Ambitious Achiever",
    description:
      "Целенасочена, фокусирана и дълбоко съзнателна. Кариерата и личностното израстване са централни за идентичността ти. Нуждаеш се от партньор, равен на амбицията ти, който подкрепя целите ти и не се чувства заплашен от успеха ти.",
    emoji: "⚡",
  },
  thoughtful_introvert: {
    type: "thoughtful_introvert",
    gender: "female",
    title: "Вдумчивият Интроверт",
    subtitle: "The Thoughtful Introvert",
    description:
      "Цениш дълбочината пред широчината във всичко: особено в любовта. Тихо страстна и дълбоко лоялна, нуждаеш се от партньор, който разбира, че сдържаната ти външност крие цял океан вътре.",
    emoji: "🌙",
  },
};

const maleProfiles: Record<string, ProfileResult> = {
  steady_protector: {
    type: "steady_protector",
    gender: "male",
    title: "Стабилният Защитник",
    subtitle: "The Steady Protector",
    description:
      "Заземен, надежден и тихо силен. Показваш любов чрез действия, а не само с думи. Готов си да изградиш истински живот с някого. Нуждаеш се от партньорка, която цени сигурността и оценява постоянството над грандиозните жестове.",
    emoji: "🏔️",
  },
  visionary_leader: {
    type: "visionary_leader",
    gender: "male",
    title: "Визионерният Лидер",
    subtitle: "The Visionary Leader",
    description:
      "Имаш ясна картина накъде вървиш и искаш партньорка на това пътуване, не последовател. Харизматичен и целенасочен, нуждаеш се от някой със собствена визия, който може да върви до теб.",
    emoji: "🚀",
  },
  thoughtful_partner: {
    type: "thoughtful_partner",
    gender: "male",
    title: "Вдумчивият Партньор",
    subtitle: "The Thoughtful Partner",
    description:
      "Емоционално интелигентен, комуникативен и искрено любопитен за партньорката си. Вярваш, че връзките изискват работа, и си готов да я свършиш. Нуждаеш се от някой също толкова рефлексивен и емоционално достъпен.",
    emoji: "💡",
  },
  passionate_romantic: {
    type: "passionate_romantic",
    gender: "male",
    title: "Страстният Романтик",
    subtitle: "The Passionate Romantic",
    description:
      "Чувстваш дълбоко и обичаш интензивно. Химията и връзката не подлежат на компромис за теб. Нуждаеш се от партньорка, която може да отговори на емоционалната ти енергия и да ти помогне да я насочиш в нещо трайно.",
    emoji: "🌊",
  },
  classic_gentleman: {
    type: "classic_gentleman",
    gender: "male",
    title: "Класическият Джентълмен",
    subtitle: "The Classic Gentleman",
    description:
      "Традиционни ценности, съвременна осъзнатост. Вярваш в ухажването, ангажираността и грижата за тези, които обичаш. Нуждаеш се от партньорка, която оценява прямотата и знае какво иска.",
    emoji: "🏛️",
  },
};

const profiles: Record<ProfileType, ProfileResult> = {
  ...femaleProfiles,
  ...maleProfiles,
} as Record<ProfileType, ProfileResult>;

// ============================================================================
// RADAR DIMENSIONS — 5 axes per Test 2 spec
// ============================================================================

export type RadarDimension =
  | "attachmentSecurity"
  | "emotionalOpenness"
  | "loveExpression"
  | "lifeVisionAlignment"
  | "relationalMaturity";

export const radarLabels: Record<RadarDimension, string> = {
  attachmentSecurity: "Сигурност",
  emotionalOpenness: "Откритост",
  loveExpression: "Любов",
  lifeVisionAlignment: "Визия",
  relationalMaturity: "Зрялост",
};

export type RadarScores = Record<RadarDimension, number>;

// ============================================================================
// SCORING — Compute radar dimensions from 25 answers
// ============================================================================

function getNum(answers: Answers, key: string): number {
  const v = answers[key];
  return typeof v === "number" ? v : 0;
}

function getStr(answers: Answers, key: string): string {
  const v = answers[key];
  return typeof v === "string" ? v : "";
}

function getMulti(answers: Answers, key: string): string[] {
  const v = answers[key];
  return Array.isArray(v) ? v : [];
}

export function computeRadarScores(answers: Answers): RadarScores {
  // 1. Attachment Security (from Section C)
  // Higher = more secure attachment
  const q11 = getStr(answers, "q11"); // attachment style
  const q12 = getNum(answers, "q12"); // ease depending on others
  const q14 = getNum(answers, "q14"); // comfort with vulnerability
  const q15 = getNum(answers, "q15"); // worry about abandonment (reverse)

  let attachment = 0;
  if (q11 === "secure") attachment += 25;
  if (q11 === "anxious") attachment += 10;
  if (q11 === "preoccupied") attachment += 8;
  if (q11 === "avoidant") attachment += 12;
  attachment += (q12 / 5) * 25; // 0-25
  attachment += (q14 / 5) * 25; // 0-25
  attachment += ((6 - q15) / 5) * 25; // reversed, 0-25

  // 2. Emotional Openness (from Sections C, E)
  const q14b = getNum(answers, "q14");
  const q21 = getNum(answers, "q21"); // emotional triggers awareness
  const q23 = getNum(answers, "q23"); // taking responsibility
  const q3 = getNum(answers, "q3");   // putting others first

  let openness = 0;
  openness += (q14b / 5) * 30;
  openness += (q21 / 5) * 25;
  openness += (q23 / 5) * 25;
  openness += (q3 / 5) * 20;

  // 3. Love Expression (from Section B)
  const q6 = getMulti(answers, "q6");
  const q7 = getNum(answers, "q7"); // physical intimacy importance
  const q9 = getNum(answers, "q9"); // belief in effort
  const q10 = getNum(answers, "q10"); // shared hobbies

  let love = 0;
  love += q6.length * 15; // 30 if both selected
  love += (q7 / 5) * 25;
  love += (q9 / 5) * 25;
  love += (q10 / 5) * 20;

  // 4. Life Vision Alignment (from Section D)
  const q16 = getNum(answers, "q16");
  const q17 = getStr(answers, "q17");
  const q18 = getStr(answers, "q18");
  const q20 = getNum(answers, "q20");

  let vision = 0;
  vision += (q16 / 5) * 20;
  if (q17 === "yes" || q17 === "have") vision += 25;
  else if (q17 === "open") vision += 15;
  else vision += 20; // also clear answer
  if (q18 === "partnership" || q18 === "family") vision += 30;
  else vision += 15;
  vision += (q20 / 5) * 25;

  // 5. Relational Maturity (from Section E + others)
  const q21b = getNum(answers, "q21");
  const q22 = getStr(answers, "q22");
  const q23b = getNum(answers, "q23");
  const q19 = getStr(answers, "q19"); // conflict handling

  let maturity = 0;
  maturity += (q21b / 5) * 30;
  if (q22 === "long") maturity += 20;
  else if (q22 === "medium") maturity += 25;
  else if (q22 === "recent") maturity += 10;
  else maturity += 15;
  maturity += (q23b / 5) * 30;
  if (q19 === "listen") maturity += 20;
  else if (q19 === "compromise") maturity += 15;
  else if (q19 === "reactive") maturity += 5;
  else maturity += 8;

  return {
    attachmentSecurity: Math.min(100, Math.round(attachment)),
    emotionalOpenness: Math.min(100, Math.round(openness)),
    loveExpression: Math.min(100, Math.round(love)),
    lifeVisionAlignment: Math.min(100, Math.round(vision)),
    relationalMaturity: Math.min(100, Math.round(maturity)),
  };
}

// ============================================================================
// PROFILE COMPUTATION
// ============================================================================

export function computeProfile(answers: Answers, gender: Gender): ProfileResult {
  const radar = computeRadarScores(answers);
  const q8 = getStr(answers, "q8");      // intimacy/passion/commitment style
  const q11 = getStr(answers, "q11");    // attachment style
  const q18 = getStr(answers, "q18");    // life vision
  const q1 = getNum(answers, "q1");      // extraversion
  const q5 = getNum(answers, "q5");      // openness to different people
  const q9 = getNum(answers, "q9");      // effort belief

  if (gender === "female") {
    const scores: Record<string, number> = {
      devoted_queen: 0,
      independent_spirit: 0,
      nurturing_soul: 0,
      ambitious_achiever: 0,
      thoughtful_introvert: 0,
    };

    // Devoted Queen: high love, high vision, secure attachment, intimacy style
    scores.devoted_queen += radar.loveExpression * 0.4;
    scores.devoted_queen += radar.lifeVisionAlignment * 0.3;
    scores.devoted_queen += radar.attachmentSecurity * 0.2;
    if (q8 === "intimacy" || q8 === "balanced") scores.devoted_queen += 15;
    if (q9 >= 4) scores.devoted_queen += 10;

    // Independent Spirit: high maturity, ambition, low dependency
    scores.independent_spirit += radar.relationalMaturity * 0.4;
    scores.independent_spirit += radar.lifeVisionAlignment * 0.2;
    if (q18 === "career" || q18 === "freedom") scores.independent_spirit += 25;
    if (q11 === "avoidant" || q11 === "secure") scores.independent_spirit += 15;
    if (q1 >= 4) scores.independent_spirit += 10;

    // Nurturing Soul: high emotional openness, others-first
    scores.nurturing_soul += radar.emotionalOpenness * 0.5;
    scores.nurturing_soul += radar.loveExpression * 0.2;
    if (q11 === "preoccupied" || q11 === "anxious") scores.nurturing_soul += 15;
    if (getNum(answers, "q3") >= 4) scores.nurturing_soul += 15;

    // Ambitious Achiever: career vision + maturity
    scores.ambitious_achiever += radar.relationalMaturity * 0.3;
    scores.ambitious_achiever += radar.lifeVisionAlignment * 0.2;
    if (q18 === "career") scores.ambitious_achiever += 35;
    if (q1 >= 4) scores.ambitious_achiever += 15;
    if (getNum(answers, "q2") >= 4) scores.ambitious_achiever += 10;

    // Thoughtful Introvert: low extraversion, deep but reserved
    if (q1 <= 2) scores.thoughtful_introvert += 30;
    scores.thoughtful_introvert += radar.emotionalOpenness * 0.3;
    scores.thoughtful_introvert += radar.attachmentSecurity * 0.2;
    if (q5 >= 4) scores.thoughtful_introvert += 10;
    if (q8 === "intimacy") scores.thoughtful_introvert += 15;

    return profiles[pickHighest(scores) as ProfileType];
  } else {
    const scores: Record<string, number> = {
      steady_protector: 0,
      visionary_leader: 0,
      thoughtful_partner: 0,
      passionate_romantic: 0,
      classic_gentleman: 0,
    };

    // Steady Protector: stability, vision, actions over words
    scores.steady_protector += radar.attachmentSecurity * 0.3;
    scores.steady_protector += radar.lifeVisionAlignment * 0.3;
    if (getMulti(answers, "q6").includes("acts")) scores.steady_protector += 20;
    if (q11 === "secure") scores.steady_protector += 15;
    if (q18 === "family" || q18 === "partnership") scores.steady_protector += 15;

    // Visionary Leader: ambition, drive, leadership
    scores.visionary_leader += radar.relationalMaturity * 0.3;
    scores.visionary_leader += radar.lifeVisionAlignment * 0.2;
    if (q18 === "career" || q18 === "freedom") scores.visionary_leader += 30;
    if (q1 >= 4) scores.visionary_leader += 20;
    if (q11 === "secure" || q11 === "avoidant") scores.visionary_leader += 10;

    // Thoughtful Partner: emotional intelligence, communication
    scores.thoughtful_partner += radar.emotionalOpenness * 0.4;
    scores.thoughtful_partner += radar.relationalMaturity * 0.3;
    if (q9 >= 4) scores.thoughtful_partner += 15;
    if (q5 >= 4) scores.thoughtful_partner += 10;
    if (getStr(answers, "q19") === "listen") scores.thoughtful_partner += 15;

    // Passionate Romantic: intensity, emotional depth, passion
    scores.passionate_romantic += radar.loveExpression * 0.4;
    scores.passionate_romantic += radar.emotionalOpenness * 0.2;
    if (q8 === "passion") scores.passionate_romantic += 35;
    if (getNum(answers, "q7") >= 4) scores.passionate_romantic += 15;

    // Classic Gentleman: traditional values, family vision
    scores.classic_gentleman += radar.lifeVisionAlignment * 0.3;
    scores.classic_gentleman += radar.attachmentSecurity * 0.2;
    if (q18 === "family") scores.classic_gentleman += 30;
    if (getNum(answers, "q16") >= 4) scores.classic_gentleman += 15;
    if (q8 === "commitment") scores.classic_gentleman += 15;

    return profiles[pickHighest(scores) as ProfileType];
  }
}

function pickHighest(scores: Record<string, number>): string {
  let max = -Infinity;
  let key = Object.keys(scores)[0];
  for (const [k, v] of Object.entries(scores)) {
    if (v > max) {
      max = v;
      key = k;
    }
  }
  return key;
}

// ============================================================================
// RARITY (per profile, with believable defaults)
// ============================================================================

export const profileRarity: Record<ProfileType, number> = {
  // Female
  devoted_queen: 18,
  independent_spirit: 22,
  nurturing_soul: 24,
  ambitious_achiever: 16,
  thoughtful_introvert: 20,
  // Male
  steady_protector: 23,
  visionary_leader: 19,
  thoughtful_partner: 21,
  passionate_romantic: 17,
  classic_gentleman: 20,
};

// ============================================================================
// COMPATIBILITY ALGORITHM
// ============================================================================

/**
 * Compatibility Algorithm — Test 2 Edition
 *
 * 5 dimensions:
 * - Attachment Security  → ALIGNMENT (both partners need similar attachment quality)
 * - Emotional Openness   → COMPLEMENTARY (slight difference balances)
 * - Love Expression      → ALIGNMENT (love languages need to overlap)
 * - Life Vision          → ALIGNMENT (most important — values define long-term fit)
 * - Relational Maturity  → ALIGNMENT (maturity gap = friction)
 */
export function computeCompatibility(a: RadarScores, b: RadarScores): number {
  function alignmentScore(valA: number, valB: number): number {
    const diff = Math.abs(valA - valB);
    return Math.max(0, 100 - diff * 1.3);
  }

  function complementaryScore(valA: number, valB: number): number {
    const diff = Math.abs(valA - valB);
    const idealDiff = 18;
    const deviation = Math.abs(diff - idealDiff);
    return Math.max(0, 100 - deviation * 2);
  }

  // 1. Attachment — alignment with quality factor
  const attachAlign = alignmentScore(a.attachmentSecurity, b.attachmentSecurity);
  const avgAttach = (a.attachmentSecurity + b.attachmentSecurity) / 2;
  const minAttach = Math.min(a.attachmentSecurity, b.attachmentSecurity);
  const attachQuality = Math.min(1, Math.max(0.4, (avgAttach - 20) / 60));
  const attachPenalty = minAttach < 30 ? 0.7 : 1;
  const attachment = attachAlign * attachQuality * attachPenalty;

  // 2. Emotional Openness — complementary
  const openness = complementaryScore(a.emotionalOpenness, b.emotionalOpenness);

  // 3. Love Expression — alignment
  const love = alignmentScore(a.loveExpression, b.loveExpression);

  // 4. Life Vision — alignment (most important)
  const vision = alignmentScore(a.lifeVisionAlignment, b.lifeVisionAlignment);

  // 5. Relational Maturity — alignment
  const maturity = alignmentScore(a.relationalMaturity, b.relationalMaturity);

  // Weighted: vision is the heaviest, then attachment & love
  const weighted =
    vision * 0.30 +
    attachment * 0.25 +
    love * 0.20 +
    maturity * 0.15 +
    openness * 0.10;

  // Scale to 58-96 range
  return Math.round(58 + (weighted / 100) * 38);
}

// Export profile data for use in other components
export { profiles, femaleProfiles, maleProfiles };
