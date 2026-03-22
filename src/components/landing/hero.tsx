"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-14">
      <div className="mx-auto max-w-4xl px-6 py-20">
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
          className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
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

        {/* Scroll indicator — just a line, no text */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-10 w-px bg-foreground/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
