"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { ProfileResult } from "@/types";
import { RadarScores } from "@/lib/scoring";
import { RadarChart } from "@/components/radar-chart";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SharedResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [radarScores, setRadarScores] = useState<RadarScores | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchResult() {
      const { data, error } = await supabase
        .from("shared_results")
        .select("profile, radar_scores")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile(data.profile as ProfileResult);
        setRadarScores(data.radar_scores as RadarScores);
      }
      setLoading(false);
    }

    if (id) fetchResult();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" style={{ animationDelay: "0.2s" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" style={{ animationDelay: "0.4s" }} />
        </div>
      </main>
    );
  }

  if (notFound || !profile || !radarScores) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <Logo />
          <h1 className="mt-6 font-serif text-2xl font-semibold">
            Резултатът не е намерен
          </h1>
          <p className="mt-2 text-muted-foreground">
            Този линк може да е изтекъл или невалиден.
          </p>
          <Link href="/test">
            <Button className="mt-6 rounded-full">
              Попълни своя тест
            </Button>
          </Link>
        </div>
      </main>
    );
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
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          {/* Shared badge */}
          <motion.p
            className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Споделен профил
          </motion.p>

          {/* Profile */}
          <div className="text-center">
            <motion.div
              className="mb-2 text-5xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
            >
              {profile.emoji}
            </motion.div>

            <motion.h1
              className="font-serif text-2xl font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {profile.title}
            </motion.h1>

            <motion.p
              className="mt-1 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {profile.subtitle}
            </motion.p>
          </div>

          {/* Radar chart */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <RadarChart scores={radarScores} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="mt-4 text-center text-[15px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {profile.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8 border-t border-border/40 pt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <p className="mb-4 font-serif text-lg font-semibold">
              Искаш ли да разбереш <span className="italic text-primary">твоя</span> профил?
            </p>
            <Link href="/test">
              <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20">
                Попълни теста
              </Button>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              Безплатно &middot; 7 въпроса &middot; под 3 мин
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
