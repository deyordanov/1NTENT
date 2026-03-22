"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("1ntent_visited");
    if (visited) {
      setIsReturning(true);
    }
    localStorage.setItem("1ntent_visited", "1");
  }, []);

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
            <>
              <span className="font-light">Намираме човека,</span>
              <br />
              <span className="font-semibold">
                който{" "}
                <span className="italic text-primary">ти подхожда.</span>
              </span>
            </>
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
            : "Попълни кратък тест за личността и ние ще те свържем с някой, който наистина допълва начина ти на мислене, чувства и общуване."}
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
                {isReturning ? "Започни теста" : "Попълни теста"}
              </Button>
            </motion.div>
          </Link>
          <span className="text-sm text-muted-foreground">
            Безплатно &middot; 10 въпроса &middot; под 3 мин
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
              {[
                "bg-primary/70",
                "bg-primary/50",
                "bg-primary/30",
                "bg-primary/20",
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full border-2 border-background ${bg}`}
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
