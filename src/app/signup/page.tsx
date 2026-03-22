"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Answers, Scores } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { RadarChart } from "@/components/radar-chart";
import { trackEvent } from "@/lib/analytics";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testData, setTestData] = useState<{
    answers: Answers;
    scores: Scores;
  } | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown - results expire in ~15 minutes from page load
  const expireTime = useMemo(() => Date.now() + 15 * 60 * 1000, []);

  useEffect(() => {
    function tick() {
      const diff = expireTime - Date.now();
      if (diff <= 0) {
        setTimeLeft("0:00");
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expireTime]);

  useEffect(() => {
    const stored = sessionStorage.getItem("testData");
    if (!stored) {
      router.push("/test");
      return;
    }
    setTestData(JSON.parse(stored));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testData) return;

    setLoading(true);
    setError("");

    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert({ email })
        .select("id")
        .single();

      if (userError) {
        if (userError.code === "23505") {
          setError("Този имейл вече е регистриран.");
        } else {
          console.warn("Supabase error, proceeding without saving:", userError);
          sessionStorage.removeItem("testData");
          router.push("/confirmation");
        }
        setLoading(false);
        return;
      }

      await supabase
        .from("test_results")
        .insert({
          user_id: user.id,
          answers: testData.answers,
          scores: testData.scores,
        });

      trackEvent("EmailSubmitted");
      // Send confirmation email with scores (fire-and-forget)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, scores: testData.scores }),
      }).catch(() => {});
      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    } catch {
      console.warn("Supabase not available, proceeding without saving");
      trackEvent("EmailSubmitted");
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, scores: testData.scores }),
      }).catch(() => {});
      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    }
  }

  if (!testData) return null;

  function scrollToEmail() {
    emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => emailRef.current?.focus(), 400);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
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

        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          {/* Title */}
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold">
              Твоят начален анализ
            </h1>
          </div>

          {/* Blurred radar chart with overlay */}
          <div className="relative mt-6 mb-2">
            <RadarChart scores={testData.scores} blurred />

            <motion.button
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={scrollToEmail}
            >
              <div className="rounded-xl bg-card/90 px-5 py-3 text-center shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
                <p className="text-sm font-medium text-foreground">
                  Виж пълния си анализ
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Въведи имейла си по-долу
                </p>
              </div>
            </motion.button>
          </div>

          {/* Single-field form — minimal friction */}
          <motion.div
            className="mt-6 border-t border-border/40 pt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="mb-4 text-center text-[15px] text-muted-foreground">
              Остави имейл и ще се свържем с теб за следващата стъпка.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Имейл адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg py-5 text-base"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full rounded-full py-5 text-base"
                disabled={loading}
              >
                {loading ? "Изпращане..." : "Продължи"}
              </Button>
            </form>

            {/* Urgency */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" />
              <span>Резултатите ти са запазени за <span className="font-medium text-foreground">{timeLeft}</span></span>
            </div>

            {/* Trust signals */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
              <span>Без спам</span>
              <span className="h-3 w-px bg-border" />
              <span>Лични данни в безопасност</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
