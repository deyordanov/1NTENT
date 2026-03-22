"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-14">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Мачмейкинг, базиран на личността
        </motion.p>

        <motion.h1
          className="font-serif text-[2.75rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-light">Намираме човека,</span>
          <br />
          <span className="font-semibold">
            който{" "}
            <span className="italic text-primary">ти подхожда.</span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Попълни кратък тест за личността и ние ще те свържем с някой,
          който наистина допълва начина ти на мислене, чувства и общуване.
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
                Попълни теста
              </Button>
            </motion.div>
          </Link>
          <span className="text-sm text-muted-foreground">
            Безплатно &middot; 5 въпроса &middot; под 2 мин
          </span>
        </motion.div>

{/* scroll indicator removed */}
      </div>
    </section>
  );
}
