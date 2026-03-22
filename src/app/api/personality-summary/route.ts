import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { scores } = await request.json();

  const prompt = `Ти си експерт по личностна психология и мачмейкинг. На базата на следните Big Five резултати (0-100 скала), напиши кратко, топло и лично описание на човека на български език. Максимум 2-3 изречения. Не споменавай числата или имената на димензиите директно. Пиши като че ли говориш лично на този човек. Фокусирай се върху какъв партньор би им подхождал.

Резултати:
- Откритост: ${scores.openness}/100
- Отговорност: ${scores.conscientiousness}/100
- Общителност: ${scores.extraversion}/100
- Съгласие: ${scores.agreeableness}/100
- Чувствителност: ${scores.neuroticism}/100

Напиши само описанието, без заглавия или форматиране.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "AI unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "No response" }, { status: 502 });
    }

    return NextResponse.json({ summary: text });
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return NextResponse.json({ error: "AI unavailable" }, { status: 502 });
  }
}
