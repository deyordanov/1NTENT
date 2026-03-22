"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 py-20 sm:py-0 lg:flex-row lg:min-h-[calc(100vh-56px)] lg:items-center lg:gap-20">
        {/* Text side */}
        <div className="flex-1">
          <motion.h1
            className="font-serif text-[2.75rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-light">Stop swiping.</span>
            <br />
            <span className="font-semibold">
              Start{" "}
              <span className="italic text-primary">connecting.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            A 3-minute personality assessment. Matches based on how you
            actually think, not how you look in photos.
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
                  Take the test
                </Button>
              </motion.div>
            </Link>
            <span className="text-sm text-muted-foreground">
              Free &middot; 15 questions
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-start gap-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground/60">
                Scroll
              </span>
              <div className="h-8 w-px bg-border" />
            </motion.div>
          </motion.div>
        </div>

        {/* Orb side */}
        <motion.div
          className="relative flex flex-1 items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-72 w-72 sm:h-96 sm:w-96">
            <div
              className="orb absolute inset-0 rounded-full opacity-70"
              style={{
                background:
                  "conic-gradient(from 180deg, hsl(346, 77%, 50%), hsl(38, 92%, 50%), hsl(346, 60%, 70%), hsl(280, 40%, 60%), hsl(346, 77%, 50%))",
              }}
            />
            <div
              className="orb absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 sm:h-40 sm:w-40"
              style={{
                background:
                  "radial-gradient(circle, hsl(38, 92%, 60%), hsl(346, 50%, 70%))",
                animationDelay: "-4s",
                animationDuration: "15s, 25s",
              }}
            />
            <div
              className="orb absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, hsl(280, 50%, 65%), hsl(346, 60%, 55%))",
                animationDelay: "-8s",
                animationDuration: "10s, 18s",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
