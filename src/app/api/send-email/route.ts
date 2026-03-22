import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const dimensionLabels: Record<string, string> = {
  openness: "Откритост",
  conscientiousness: "Отговорност",
  extraversion: "Общителност",
  agreeableness: "Съгласие",
  neuroticism: "Чувствителност",
};

function buildChartUrl(scores: Record<string, number>): string {
  const labels = Object.keys(scores).map((k) => dimensionLabels[k] || k);
  const values = Object.values(scores);

  const config = {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Твоят профил",
          data: values,
          backgroundColor: "rgba(200, 39, 77, 0.15)",
          borderColor: "rgba(200, 39, 77, 0.8)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(200, 39, 77, 1)",
          pointRadius: 4,
        },
      ],
    },
    options: {
      scale: {
        ticks: { beginAtZero: true, max: 100, stepSize: 25, display: false },
        pointLabels: { fontSize: 13, fontColor: "#555" },
        gridLines: { color: "rgba(0,0,0,0.06)" },
      },
      legend: { display: false },
      plugins: { datalabels: { display: false } },
    },
  };

  const encoded = encodeURIComponent(JSON.stringify(config));
  return `https://quickchart.io/chart?c=${encoded}&w=400&h=400&bkg=white`;
}

function buildScoresSummary(scores: Record<string, number>): string {
  return Object.entries(scores)
    .map(([key, value]) => {
      const label = dimensionLabels[key] || key;
      const bar = "█".repeat(Math.round(value / 10));
      const empty = "░".repeat(10 - Math.round(value / 10));
      return `${label}: ${bar}${empty} ${value}%`;
    })
    .join("<br/>");
}

export async function POST(request: Request) {
  try {
    const { email, scores } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const chartUrl = scores ? buildChartUrl(scores) : "";
    const scoresSummary = scores ? buildScoresSummary(scores) : "";

    await resend.emails.send({
      from: "1NTENT <onboarding@resend.dev>",
      to: email,
      subject: "Твоят личностен профил е готов!",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
          <h1 style="font-size: 24px; color: #1a1a1a; margin-bottom: 8px;">
            <span style="color: #c8274d;">1</span>NTENT
          </h1>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Здравей,
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Благодарим ти, че попълни теста. Ето твоя начален личностен профил:
          </p>

          ${
            chartUrl
              ? `
          <div style="text-align: center; margin: 24px 0;">
            <img src="${chartUrl}" alt="Личностен профил" width="360" style="max-width: 100%; border-radius: 12px;" />
          </div>
          `
              : ""
          }

          ${
            scoresSummary
              ? `
          <div style="background: #fafafa; border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-family: monospace; font-size: 13px; line-height: 1.8; color: #555;">
            ${scoresSummary}
          </div>
          `
              : ""
          }

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Член от нашия екип ще прегледа профила ти и ще се свърже лично с теб в рамките на няколко дни.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Искаш по-бързо? Запази кратък въвеждащ разговор:
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://calendly.com/palpamaul/30min"
               style="background-color: #c8274d; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-size: 15px; font-weight: 500; display: inline-block;">
              Запази час за разговор
            </a>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #888;">
            Междувременно, сподели 1NTENT с приятели, които може да се заинтересуват.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />

          <p style="font-size: 12px; color: #aaa; text-align: center;">
            &copy; 2026 1NTENT
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
