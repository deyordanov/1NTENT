"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Answers, Gender, ProfileResult } from "@/types";
import { RadarScores } from "@/lib/scoring";
import { humanizeAnswers } from "@/lib/humanize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { RadarChart } from "@/components/radar-chart";
import { trackEvent } from "@/lib/analytics";


// Common country codes — Bulgaria first, then frequent neighbours / EU
const COUNTRY_CODES = [
  { code: "+359", flag: "🇧🇬", name: "България" },
  { code: "+30", flag: "🇬🇷", name: "Гърция" },
  { code: "+40", flag: "🇷🇴", name: "Румъния" },
  { code: "+381", flag: "🇷🇸", name: "Сърбия" },
  { code: "+90", flag: "🇹🇷", name: "Турция" },
  { code: "+44", flag: "🇬🇧", name: "Великобритания" },
  { code: "+49", flag: "🇩🇪", name: "Германия" },
  { code: "+33", flag: "🇫🇷", name: "Франция" },
  { code: "+39", flag: "🇮🇹", name: "Италия" },
  { code: "+34", flag: "🇪🇸", name: "Испания" },
  { code: "+31", flag: "🇳🇱", name: "Нидерландия" },
  { code: "+43", flag: "🇦🇹", name: "Австрия" },
  { code: "+41", flag: "🇨🇭", name: "Швейцария" },
  { code: "+1", flag: "🇺🇸", name: "САЩ / Канада" },
];

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+359");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testData, setTestData] = useState<{
    answers: Answers;
    profile: ProfileResult;
    radarScores: RadarScores;
    gender?: Gender;
  } | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [rarityPercent, setRarityPercent] = useState<number | null>(null);

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
    const parsed = JSON.parse(stored);
    setTestData(parsed);

    // Fetch rarity percentage
    if (parsed.profile?.type) {
      fetch("/api/profile-stats")
        .then((r) => r.json())
        .then((data) => {
          const pct = data.percentages?.[parsed.profile.type];
          if (pct) setRarityPercent(pct);
        })
        .catch(() => {});
    }

    // Save share result immediately so it's ready for the confirmation page
    if (!sessionStorage.getItem("1ntent_share_id")) {
      fetch("/api/share-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: parsed.profile, radarScores: parsed.radarScores }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) sessionStorage.setItem("1ntent_share_id", data.id);
        })
        .catch(() => {});
    }
  }, [router]);

  const generateCode = useCallback(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }, []);

  async function saveShareResult(profile: ProfileResult, radarScores: RadarScores): Promise<string | null> {
    try {
      const res = await fetch("/api/share-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, radarScores }),
      });
      const data = await res.json();
      if (data.id) {
        sessionStorage.setItem("1ntent_share_id", data.id);
        return data.id;
      }
    } catch {}
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testData) return;

    setLoading(true);
    setError("");

    const referralCode = generateCode();
    const referredBy = sessionStorage.getItem("1ntent_ref") || null;

    const fullPhone = phone.trim() ? `${phoneCountry} ${phone.trim()}` : null;
    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert({
          email,
          phone: fullPhone,
          gender: testData.gender || null,
          referral_code: referralCode,
          referred_by: referredBy,
        })
        .select("id, referral_code")
        .single();

      if (userError) {
        if (userError.code === "23505") {
          setError("Този имейл вече е регистриран.");
        } else {
          console.warn("Supabase error, proceeding without saving:", userError);
          trackEvent("EmailSubmitted");
          const sid1 = await saveShareResult(testData.profile, testData.radarScores);
          fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, profile: testData.profile, shareId: sid1 }),
          }).catch(() => {});
          sessionStorage.removeItem("testData");
          sessionStorage.removeItem("1ntent_ref");
          sessionStorage.setItem("1ntent_referral_code", referralCode);
          sessionStorage.setItem("1ntent_profile", JSON.stringify(testData.profile));
          sessionStorage.setItem("1ntent_radar", JSON.stringify(testData.radarScores));
          router.push("/confirmation");
        }
        setLoading(false);
        return;
      }

      const humanAnswers = humanizeAnswers(
        testData.answers,
        testData.gender || "male"
      );

      await supabase
        .from("test_results")
        .insert({
          user_id: user.id,
          answers: humanAnswers,
          scores: testData.radarScores,
          profile_data: testData.profile,
          profile_type: testData.profile.type,
        });

      trackEvent("EmailSubmitted");
      const sid2 = await saveShareResult(testData.profile, testData.radarScores);
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, profile: testData.profile, shareId: sid2 }),
      }).catch(() => {});

      sessionStorage.removeItem("testData");
      sessionStorage.removeItem("1ntent_ref");
      sessionStorage.setItem("1ntent_referral_code", user.referral_code);
      sessionStorage.setItem("1ntent_profile", JSON.stringify(testData.profile));
      sessionStorage.setItem("1ntent_radar", JSON.stringify(testData.radarScores));
      router.push("/confirmation");
    } catch {
      console.warn("Supabase not available, proceeding without saving");
      trackEvent("EmailSubmitted");
      const sid3 = await saveShareResult(testData.profile, testData.radarScores);
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, profile: testData.profile, shareId: sid3 }),
      }).catch(() => {});
      sessionStorage.removeItem("testData");
      sessionStorage.removeItem("1ntent_ref");
      sessionStorage.setItem("1ntent_referral_code", referralCode);
      sessionStorage.setItem("1ntent_profile", JSON.stringify(testData.profile));
      sessionStorage.setItem("1ntent_radar", JSON.stringify(testData.radarScores));
      router.push("/confirmation");
    }
  }

  if (!testData) return null;

  const { profile, radarScores } = testData;

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
          {/* Profile result — blurred until email */}
          <div className="text-center">
            <motion.div
              className="mb-2 text-5xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            >
              {profile.emoji}
            </motion.div>

            <motion.h1
              className="font-serif text-2xl font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {profile.title}
            </motion.h1>

            <motion.p
              className="mt-1 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
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

          {/* Radar chart — blurred */}
          <motion.div
            className="relative mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <RadarChart scores={radarScores} blurred />
          </motion.div>

          {/* Blurred description — teaser */}
          <motion.div
            className="relative mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="select-none" style={{ filter: "blur(4px)" }}>
              <p className="text-center text-[15px] leading-relaxed text-muted-foreground">
                {profile.description}
              </p>
            </div>

            <motion.button
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              onClick={scrollToEmail}
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
          </motion.div>

          {/* Single-field form */}
          <motion.div
            className="mt-8 border-t border-border/40 pt-5"
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
              <div className="flex gap-2">
                <select
                  value={phoneCountry}
                  onChange={(e) => setPhoneCountry(e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-3 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                  aria-label="Държавен код"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Телефон (по желание)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 rounded-lg py-5 text-base"
                />
              </div>
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
