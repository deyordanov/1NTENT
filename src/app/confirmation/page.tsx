"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

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

  useEffect(() => {
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
              href="https://calendly.com/YOUR_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-4 w-full rounded-full">
                Запази час за разговор
              </Button>
            </a>
          </div>

          {/* Share CTA */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="mb-3 text-sm text-muted-foreground">
              Познаваш някой, който също търси нещо истинско?
            </p>
            <button
              onClick={handleShare}
              className="w-full rounded-full border border-border/60 bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-sm"
            >
              {copied ? "Копирано!" : "Сподели 1NTENT с приятел"}
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
