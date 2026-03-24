"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

// Curated young adult avatar IDs from pravatar.cc
const YOUNG_ADULT_IDS = [1, 3, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 21, 25, 26, 27, 28, 32, 33, 35, 36, 38, 39, 41, 44, 45, 47, 48, 49, 50, 52, 56, 57, 58, 59, 60, 61, 64, 65, 68];

// A/B test variants for new visitors
const AB_VARIANTS = [
  {
    headline: (
      <>
        <span className="font-light">Намираме човека,</span>
        <br />
        <span className="font-semibold">
          който <span className="italic text-primary">ти подхожда.</span>
        </span>
      </>
    ),
    subtitle: "Попълни кратък тест за личността и ние ще те свържем с някой, който наистина допълва начина ти на мислене, чувства и общуване.",
    cta: "Попълни теста",
  },
  {
    headline: (
      <>
        <span className="font-light">Спри да търсиш.</span>
        <br />
        <span className="font-semibold">
          Нека <span className="italic text-primary">те намерим.</span>
        </span>
      </>
    ),
    subtitle: "6 въпроса за теб. Ние се грижим за останалото. Без приложения, без безкрайни профили.",
    cta: "Започни безплатно",
  },
  {
    headline: (
      <>
        <span className="font-light">Запознанства</span>
        <br />
        <span className="font-semibold">
          с <span className="italic text-primary">намерение.</span>
        </span>
      </>
    ),
    subtitle: "Попълни кратък тест и ние ще подберем някой, който наистина ти подхожда. Лично, не алгоритмично.",
    cta: "Виж кой ти подхожда",
  },
];

export function Hero() {
  const [isReturning, setIsReturning] = useState(false);
  const [avatarIds, setAvatarIds] = useState([1, 5, 11, 32]);
  const [abVariant, setAbVariant] = useState(0);

  useEffect(() => {
    const shuffled = [...YOUNG_ADULT_IDS].sort(() => Math.random() - 0.5);
    setAvatarIds(shuffled.slice(0, 4));
  }, []);

  useEffect(() => {
    const visited = localStorage.getItem("1ntent_visited");
    if (visited) {
      setIsReturning(true);
    }
    localStorage.setItem("1ntent_visited", "1");

    // A/B test — persist variant per user
    const stored = localStorage.getItem("1ntent_ab");
    if (stored !== null) {
      setAbVariant(parseInt(stored));
    } else {
      const variant = Math.floor(Math.random() * AB_VARIANTS.length);
      localStorage.setItem("1ntent_ab", String(variant));
      setAbVariant(variant);
    }
  }, []);

  // Track which variant was shown
  useEffect(() => {
    if (!isReturning) {
      trackEvent("HeroVariant", { variant: String.fromCharCode(65 + abVariant) });
    }
  }, [abVariant, isReturning]);

  const variant = AB_VARIANTS[abVariant];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-14">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {isReturning
            ? "Добре дошъл отново"
            : "Мачмейкинг, базиран на личността"}
        </motion.p>

        <motion.h1
          className="font-serif text-[2.75rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {isReturning ? (
            <>
              <span className="font-light">Готов ли си да</span>
              <br />
              <span className="font-semibold">
                направиш{" "}
                <span className="italic text-primary">следващата стъпка?</span>
              </span>
            </>
          ) : (
            variant.headline
          )}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {isReturning
            ? "Тестът е кратък и безплатен. Попълни го и ще те свържем с някой, който наистина ти подхожда."
            : variant.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/test">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="rounded-full px-7 py-6 text-base shadow-lg shadow-primary/20"
              >
                {isReturning ? "Започни теста" : variant.cta}
              </Button>
            </motion.div>
          </Link>
          <span className="text-sm text-muted-foreground">
            Безплатно &middot; 6 въпроса &middot; под 2 мин
          </span>
        </motion.div>

        {/* Social proof + scarcity */}
        <motion.div
          className="mt-12 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatarIds.map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/56?img=${id}`}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">127+</span> души
              вече попълниха теста
            </p>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Приемаме ограничен брой участници всеки месец
          </p>
        </motion.div>
      </div>
    </section>
  );
}
