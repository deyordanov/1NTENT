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
  navigator.clipboard.writeText(text);
}

export default function ConfirmationPage() {
  const [confetti, setConfetti] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralCopied, setReferralCopied] = useState(false);

  useEffect(() => {
    // Get referral code from signup flow
    const storedCode = sessionStorage.getItem("1ntent_referral_code");
    if (storedCode) {
      setReferralCode(storedCode);
      sessionStorage.removeItem("1ntent_referral_code");
    }

    const pieces = Array.from({ length: CONFETTI_COUNT }, (_, i) => i);
    setConfetti(pieces);
    playChime();
    const timer = setTimeout(() => setConfetti([]), 4000);
    return () => clearTimeout(timer);
  }, []);

  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.origin : "https://1ntent.bg";
    if (navigator.share) {
      navigator.share({ title: "1NTENT", text: "Открий човека, който наистина ти подхожда.", url });
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

          {/* Referral CTA */}
          <motion.div
            className="mt-6 rounded-xl border border-border/40 bg-muted/30 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-medium text-foreground">
              Сподели с приятел и ще разгледаме профила ти по-бързо
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Твоят код за препоръка:
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-border/60 bg-white px-4 py-2.5 text-center font-mono text-lg font-bold tracking-widest text-foreground">
                {referralCode}
              </div>
              <button
                onClick={() => {
                  const url = typeof window !== "undefined" ? window.location.origin : "https://1ntent.bg";
                  copyToClipboard(`${url}?ref=${referralCode}`);
                  setReferralCopied(true);
                  trackEvent("ReferralCopied");
                  setTimeout(() => setReferralCopied(false), 2000);
                }}
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10"
              >
                {referralCopied ? "Копирано!" : "Копирай линк"}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Открий кой наистина ти подхожда 💕 ${typeof window !== "undefined" ? window.location.origin : "https://1ntent.bg"}?ref=${referralCode}`
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
                  `Открий кой наистина ти подхожда 💕 ${typeof window !== "undefined" ? window.location.origin : "https://1ntent.bg"}?ref=${referralCode}`
                )}`}
                onClick={() => trackEvent("ReferralShared", { channel: "viber" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#7360F2] px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 0C9.473.028 5.333.344 3.383 2.195 1.868 3.705 1.328 5.925 1.258 8.675c-.07 2.75-.162 7.908 4.84 9.291h.005l-.003 2.131s-.032.862.535 1.04c.687.214.898-.168 2.585-2.182.925.085 1.668.122 2.283.122.896 0 1.66-.058 2.31-.147-.155-1.061-.142-2.131.019-3.098.36-2.193 1.461-3.756 2.77-4.772-.163-.01-.322-.023-.463-.043-1.24-.17-2.24-.465-2.974-.877a5.114 5.114 0 01-.474-.32c-.225-.17-.398-.35-.398-.35l.184-.232s.34.342.925.59c.585.248 1.353.473 2.412.608a12.7 12.7 0 001.637.077c.484-.018.934-.07 1.35-.157.778-.161 1.433-.434 1.96-.81a4.1 4.1 0 001.164-1.267c.297-.523.464-1.117.464-1.77 0-1.074-.488-2.004-1.258-2.67-.77-.666-1.813-1.082-2.99-1.082-1.313 0-2.444.503-3.23 1.324-.786.82-1.221 1.96-1.221 3.23 0 .868.204 1.668.574 2.35.37.683.904 1.247 1.553 1.653a2.1 2.1 0 00-.09.542c0 .35.086.684.236.985-1.046-.565-1.884-1.385-2.393-2.42-.509-1.034-.752-2.223-.752-3.508 0-1.648.573-3.147 1.59-4.21C14.67 3.72 16.18 3.067 17.895 3.067c1.549 0 2.938.557 3.96 1.444C22.876 5.399 23.5 6.69 23.5 8.148c0 .918-.234 1.767-.67 2.51a5.6 5.6 0 01-1.59 1.756"/></svg>
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
