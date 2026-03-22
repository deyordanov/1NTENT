"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, hsl(346, 77%, 50%) 0%, transparent 70%)",
          }}
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, hsl(38, 92%, 50%) 0%, transparent 70%)",
          }}
          animate={{ y: [0, -15, 0], x: [0, 12, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(346, 60%, 60%) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Science-backed compatibility
        </motion.p>
        <motion.h1
          className="font-serif text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find someone who{" "}
          <span className="italic text-primary">truly</span>{" "}
          gets you
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Take a short personality assessment and we&apos;ll match you with
          people who complement your mind, values, and temperament.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/test">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20"
              >
                Begin Your Assessment
              </Button>
            </motion.div>
          </Link>
          <span className="text-sm text-muted-foreground">
            3 minutes &middot; 15 questions &middot; free
          </span>
        </motion.div>
      </div>
    </section>
  );
}
