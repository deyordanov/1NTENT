import { questions } from "@/lib/questions";
import { Answers, Gender } from "@/types";

/**
 * Convert raw answers (keywords + numbers) into human-readable form for admin/DB display.
 * Returns a flat record:
 *   { q1: "Тихо кафе и разговор вкъщи", q3: 5, q6: ["Думи на признателност", "Физически допир"] }
 *
 * Multi-select arrays preserve label order (the user's selection order).
 * Open-ended answers and scale numbers pass through unchanged.
 */
export function humanizeAnswers(
  answers: Answers,
  gender: Gender
): Record<string, string | number | string[]> {
  const result: Record<string, string | number | string[]> = {};

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;

    if (q.type === "scale") {
      result[q.id] = typeof raw === "number" ? raw : Number(raw);
      continue;
    }

    if (q.type === "open") {
      result[q.id] = String(raw);
      continue;
    }

    if (q.type === "choice") {
      const opt = q.options.find((o) => o.value === raw);
      if (opt) {
        result[q.id] =
          gender === "female" && opt.labelFemale ? opt.labelFemale : opt.label;
      } else {
        result[q.id] = String(raw);
      }
      continue;
    }

    if (q.type === "multi") {
      const arr = Array.isArray(raw) ? raw : [];
      result[q.id] = arr.map((v) => {
        const opt = q.options.find((o) => o.value === v);
        if (!opt) return String(v);
        return gender === "female" && opt.labelFemale ? opt.labelFemale : opt.label;
      });
      continue;
    }
  }

  return result;
}

/**
 * Build a richer structured form including question text — useful for the email
 * or admin "full transcript" view. Returns an array preserving question order.
 */
export function humanizeAnswersFull(
  answers: Answers,
  gender: Gender
): Array<{ id: string; section?: string; question: string; answer: string | number | string[] }> {
  const human = humanizeAnswers(answers, gender);
  return questions
    .filter((q) => human[q.id] !== undefined)
    .map((q) => ({
      id: q.id,
      section: q.section,
      question:
        gender === "female" && q.textFemale ? q.textFemale : q.text,
      answer: human[q.id],
    }));
}
