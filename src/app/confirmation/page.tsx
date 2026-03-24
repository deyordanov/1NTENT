"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { trackEvent } from "@/lib/analytics";

const CONFETTI_COUNT = 40;
const confettiColors = [
  "hsl(346, 77%, 50%)",
  "hsl(346, 60%, 65%)",
  "hsl(346, 80%, 75%)",
  "hsl(20, 60%, 70%)",
  "hsl(346, 90%, 40%)",
  "hsl(30, 80%, 80%)",
];

function ConfettiPiece({ delay }: { delay: number }) {
  const left = Math.random() * 100;
  const size = 4 + Math.random() * 6;
  const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const drift = (Math.random() - 0.5) * 200;

  return (
    <motion.div
      className="pointer-events-none fixed rounded-full"
      style={{
        left: `${left}%`,
        top: -10,
        width: size,
        height: size,
        backgroundColor: color,
        zIndex: 100,
      }}
      initial={{ opacity: 1, y: 0, x: 0 }}
      animate={{
        opacity: 0,
        y: window.innerHeight + 50,
        x: drift,
        rotate: Math.random() * 720,
      }}
      transition={{
        duration: 1.8 + Math.random() * 1.2,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

function playChime() {
  try {
    const audio = new Audio("/success.mp3");
    audio.volume = 0.5;
    audio.play();
  } catch {
    // Audio not supported — silent fallback
  }
}

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function ConfirmationPage() {
  const [confetti, setConfetti] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralCopied, setReferralCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    // Get referral code and share ID from signup flow
    const storedCode = sessionStorage.getItem("1ntent_referral_code");
    if (storedCode) {
      setReferralCode(storedCode);
      sessionStorage.removeItem("1ntent_referral_code");
    }
    const shareId = sessionStorage.getItem("1ntent_share_id");
    if (shareId) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://1ntent.eu";
      setShareUrl(`${origin}/results/${shareId}`);
      sessionStorage.removeItem("1ntent_share_id");
    }

    const pieces = Array.from({ length: CONFETTI_COUNT }, (_, i) => i);
    setConfetti(pieces);
    playChime();
    const timer = setTimeout(() => setConfetti([]), 4000);
    return () => clearTimeout(timer);
  }, []);

  function handleShare() {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.origin : "https://1ntent.eu");
    if (navigator.share) {
      navigator.share({ title: "1NTENT", text: shareUrl ? "Виж моя личностен профил!" : "Открий човека, който наистина ти подхожда.", url });
    } else {
      copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((i) => (
          <ConfettiPiece key={i} delay={i * 0.05} />
        ))}
      </AnimatePresence>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-tight text-foreground"
          >
            <Logo />
          </Link>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>

          <h1 className="font-serif text-2xl font-semibold">
            Всичко е готово
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Благодарим ти, че попълни теста. Член от нашия екип ще прегледа
            профила ти и ще се свърже лично с теб в рамките на няколко дни.
          </p>

          {/* Calendly CTA */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/[0.03] p-5">
            <p className="text-sm font-medium text-foreground">
              Искаш по-бързо?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Запази кратък въвеждащ разговор и ще започнем веднага.
            </p>
            <a
              href="https://calendly.com/palpamaul/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("CalendlyClicked")}
            >
              <Button className="mt-4 w-full rounded-full">
                Запази час за разговор
              </Button>
            </a>
          </div>

          {/* Share results CTA */}
          <motion.div
            className="mt-6 rounded-xl border border-border/40 bg-muted/30 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-medium text-foreground">
              Сподели резултата си с приятели
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Те ще видят твоя профил и могат да попълнят своя тест.
            </p>

            {/* Copy link button — full width, prominent */}
            <button
              onClick={() => {
                const origin = typeof window !== "undefined" ? window.location.origin : "https://1ntent.eu";
                const url = shareUrl || (referralCode ? `${origin}?ref=${referralCode}` : `${origin}/test`);
                copyToClipboard(url);
                setReferralCopied(true);
                trackEvent("ReferralCopied");
                setTimeout(() => setReferralCopied(false), 2000);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              {referralCopied ? "Копирано!" : "Копирай линк"}
            </button>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  shareUrl
                    ? `Виж моя личностен профил и попълни своя тест! ${shareUrl}`
                    : `Открий кой наистина ти подхожда ${typeof window !== "undefined" ? window.location.origin : "https://1ntent.eu"}/test`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("ReferralShared", { channel: "whatsapp" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={`viber://forward?text=${encodeURIComponent(
                  shareUrl
                    ? `Виж моя личностен профил и попълни своя тест! ${shareUrl}`
                    : `Открий кой наистина ти подхожда ${typeof window !== "undefined" ? window.location.origin : "https://1ntent.eu"}/test`
                )}`}
                onClick={() => trackEvent("ReferralShared", { channel: "viber" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#7360F2] px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                  <path fill="currentColor" d="M20.837 3.357C18.063.584 12.12.02 12.12.02S6.018-.286 3.454 2.124C1.695 3.883 1.11 6.45 1.052 9.6c-.058 3.15-.133 9.058 5.536 10.63h.005l-.004 2.44s-.036.987.612 1.19c.784.245 1.245-.505 1.997-1.31.412-.441.981-1.09 1.41-1.586 3.889.327 6.879-.42 7.217-.53.783-.255 5.21-.822 5.932-6.71.745-6.068-.362-9.9-2.92-12.467zM18.6 15.7c-.447 1.065-1.308 1.69-2.11 1.81-.61.094-1.4.033-2.26-.19a16.6 16.6 0 01-2.58-1.04c-3.326-1.66-5.35-4.596-5.51-4.812-.16-.216-1.27-1.69-1.27-3.224s.795-2.286 1.09-2.6c.296-.316.64-.395.855-.395h.62c.176 0 .416-.068.65.497.236.574.816 1.988.886 2.132.072.144.12.312.024.504-.096.192-.144.312-.288.48-.144.168-.303.376-.432.504-.144.144-.294.3-.126.59.168.288.746 1.23 1.602 1.993 1.1.98 2.028 1.284 2.316 1.428.288.144.456.12.624-.072.168-.192.72-.84.912-1.128.192-.288.384-.24.648-.144.264.096 1.668.786 1.956.93.288.144.48.216.552.336.072.12.072.69-.375 1.755z"/>
                </svg>
                Viber
              </a>
            </div>
            <button
              onClick={() => {
                handleShare();
                trackEvent("ReferralShared", { channel: "other" });
              }}
              className="mt-2 text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
            >
              {copied ? "Копирано!" : "Или сподели по друг начин"}
            </button>
          </motion.div>

          <Link
            href="/"
            className="mt-5 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Към началната страница
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
