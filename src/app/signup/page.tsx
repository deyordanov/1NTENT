"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Answers, Scores } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { RadarChart } from "@/components/radar-chart";

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

    // TODO: Supabase integration — for now, store locally and proceed
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

      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    } catch {
      console.warn("Supabase not available, proceeding without saving");
      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    }
  }

  if (!testData) return null;

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
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold">
              Твоят профил
            </h1>
          </div>

          {/* Blurred radar chart */}
          <div className="relative mt-6 mb-2">
            <RadarChart scores={testData.scores} blurred />

            {/* Overlay CTA on top of blurred chart — clicks scroll to email */}
            <motion.button
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={() => {
                emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => emailRef.current?.focus(), 400);
              }}
            >
              <div className="rounded-xl bg-card/90 px-5 py-3 text-center shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
                <p className="text-sm font-medium text-foreground">
                  Виж пълния си профил
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Въведи имейла си по-долу
                </p>
              </div>
            </motion.button>
          </div>

          {/* CTA */}
          <div className="mt-6 border-t border-border/40 pt-5">
            <p className="text-center text-[15px] text-muted-foreground">
              Остави имейл и ще се свържем с теб за следващата стъпка.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="Имейл адрес"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Изпращане..." : "Продължи към подбора"}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Никога няма да споделим имейла ти. Без спам.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
