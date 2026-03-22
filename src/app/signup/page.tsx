"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Answers, Scores } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testData, setTestData] = useState<{
    answers: Answers;
    scores: Scores;
  } | null>(null);

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
          setError("Нещо се обърка. Моля, опитай отново.");
        }
        setLoading(false);
        return;
      }

      const { error: resultError } = await supabase
        .from("test_results")
        .insert({
          user_id: user.id,
          answers: testData.answers,
          scores: testData.scores,
        });

      if (resultError) {
        setError("Нещо се обърка. Моля, опитай отново.");
        setLoading(false);
        return;
      }

      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    } catch {
      setError("Нещо се обърка. Моля, опитай отново.");
      setLoading(false);
    }
  }

  if (!testData) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
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
              Профилът ти е готов
            </h1>
            <p className="mt-3 text-muted-foreground">
              Въведи имейла си и ние лично ще се свържем с теб,
              за да обсъдим съвпаденията ти.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Имейл адрес</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Регистриране..." : "Намери съвпадение"}
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
