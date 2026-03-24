"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { ProfileResult } from "@/types";
import { RadarScores, computeCompatibility } from "@/lib/scoring";
import { RadarChart } from "@/components/radar-chart";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Floating petals — rose petals drifting down the page
const petalColors = [
  "hsl(346, 77%, 50%)",
  "hsl(346, 60%, 65%)",
  "hsl(346, 80%, 75%)",
  "hsl(346, 50%, 82%)",
  "hsl(340, 70%, 60%)",
  "hsl(350, 90%, 85%)",
];

function FloatingPetal({ delay, index }: { delay: number; index: number }) {
  const left = 5 + Math.random() * 90;
  const size = 8 + Math.random() * 14;
  const color = petalColors[index % petalColors.length];
  const drift = (Math.random() - 0.5) * 120;
  const rotation = Math.random() * 360;
  const duration = 8 + Math.random() * 7;

  return (
    <motion.div
      className="pointer-events-none fixed"
      style={{
        left: `${left}%`,
        top: -20,
        zIndex: 0,
      }}
      animate={{
        opacity: [0, 0.7, 0.7, 0.5, 0],
        y: [-20, 900],
        x: [0, drift * 0.3, drift, drift * 0.5],
        rotate: [0, rotation * 0.5, rotation + 180],
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 20 28">
        <path
          d="M10 0 C14 6, 20 12, 18 20 C16 26, 12 28, 10 28 C8 28, 4 26, 2 20 C0 12, 6 6, 10 0Z"
          fill={color}
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}

// Sparkle that appears and fades
function Sparkle({ delay }: { delay: number }) {
  const left = 10 + Math.random() * 80;
  const top = 10 + Math.random() * 80;
  const size = 3 + Math.random() * 5;

  return (
    <motion.div
      className="pointer-events-none fixed"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        zIndex: 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 4,
      }}
    >
      <svg width={size * 4} height={size * 4} viewBox="0 0 24 24">
        <path
          d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
          fill="hsl(346, 77%, 50%)"
          opacity={0.3}
        />
      </svg>
    </motion.div>
  );
}

// Floating rose emoji

export default function SharedResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [radarScores, setRadarScores] = useState<RadarScores | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [petals, setPetals] = useState<number[]>([]);
  const [sparkles, setSparkles] = useState<number[]>([]);
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [rarityPercent, setRarityPercent] = useState<number | null>(null);

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

  // Fetch rarity percentage
  useEffect(() => {
    if (!profile) return;
    fetch("/api/profile-stats")
      .then((r) => r.json())
      .then((data) => {
        const pct = data.percentages?.[profile.type];
        if (pct) setRarityPercent(pct);
      })
      .catch(() => {});
  }, [profile]);

  // Check if visitor has their own test data for compatibility
  useEffect(() => {
    if (!radarScores) return;
    try {
      const stored = sessionStorage.getItem("testData");
      if (stored) {
        const { radarScores: visitorScores } = JSON.parse(stored);
        if (visitorScores) {
          const compat = computeCompatibility(radarScores, visitorScores);
          setCompatibility(compat);
        }
      }
    } catch {}
  }, [radarScores]);

  // Spawn decorative elements after data loads
  useEffect(() => {
    if (loading || notFound) return;

    setPetals(Array.from({ length: 30 }, (_, i) => i));
    setSparkles(Array.from({ length: 10 }, (_, i) => i));
  }, [loading, notFound]);

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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.02]" />

      {/* Floating petals */}
      <AnimatePresence>
        {petals.map((i) => (
          <FloatingPetal key={`p-${i}`} delay={i * 0.3} index={i} />
        ))}
      </AnimatePresence>

      {/* Sparkles */}
      {sparkles.map((i) => (
        <Sparkle key={`s-${i}`} delay={i * 0.6} />
      ))}

      <motion.div
        className="relative z-10 w-full max-w-lg"
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

        <div className="relative rounded-2xl border border-border/60 bg-card/95 p-5 shadow-lg backdrop-blur-sm sm:p-8">
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

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
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
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
              className="mt-1 text-sm italic text-primary/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {profile.subtitle}
            </motion.p>

            {/* Rarity badge */}
            {rarityPercent && (
              <motion.div
                className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <span className="text-xs">✦</span>
                <span className="text-xs font-medium text-primary">
                  Само {rarityPercent}% от хората имат този профил
                </span>
              </motion.div>
            )}
          </div>

          {/* Radar chart */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
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

          {/* Divider */}
          <motion.div
            className="mx-auto mt-8 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          />

          {/* CTA — compatibility-aware */}
          <motion.div
            className="pt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {compatibility !== null ? (
              /* Visitor already took the test — show compatibility */
              <>
                <p className="mb-2 text-sm text-muted-foreground">
                  Вашата съвместимост
                </p>
                <motion.div
                  className="mb-4 font-serif text-5xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: 1.3 }}
                >
                  {compatibility}%
                </motion.div>
                <p className="mb-5 text-sm text-muted-foreground">
                  {compatibility >= 85
                    ? "Изключително съвпадение!"
                    : compatibility >= 75
                    ? "Силна съвместимост!"
                    : "Има потенциал!"}
                </p>
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20">
                      Регистрирай се за мачмейкинг
                    </Button>
                  </motion.div>
                </Link>
              </>
            ) : (
              /* Visitor hasn't taken the test — prompt them */
              <>
                <p className="mb-4 font-serif text-lg font-semibold">
                  Виж колко сте{" "}
                  <span className="italic text-primary">съвместими</span>
                </p>
                <p className="mb-5 text-sm text-muted-foreground">
                  Попълни теста и разбери вашия процент на съвместимост
                </p>
                <Link href={`/test?compare=${id}`}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20">
                      Попълни теста и сравни
                    </Button>
                  </motion.div>
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">
                  Безплатно &middot; 7 въпроса &middot; под 3 мин
                </p>
              </>
            )}
          </motion.div>

          {/* Bottom accent */}
          <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </motion.div>
    </main>
  );
}
