import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "1NTENT <onboarding@resend.dev>",
      to: email,
      subject: "Получихме теста ти!",
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
            Благодарим ти, че попълни теста за личността. Член от нашия екип ще прегледа профила ти и ще се свърже лично с теб в рамките на няколко дни.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Ако искаш да ускориш процеса, можеш да запазиш кратък въвеждащ разговор:
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://calendly.com/palpamaul/30min"
               style="background-color: #c8274d; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-size: 15px; font-weight: 500; display: inline-block;">
              Запази час за разговор
            </a>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #888;">
            Междувременно, не се колебай да споделиш 1NTENT с приятели, които може да се заинтересуват.
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
