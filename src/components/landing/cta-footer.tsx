"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion";

export function CTAFooter() {
  return (
    <section className="flex min-h-[70vh] items-center py-24 sm:min-h-screen sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <TextReveal>
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Ready to meet someone
            <br />
            who <span className="italic text-primary">gets it</span>?
          </h2>
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
            Three minutes. Fifteen questions.
            <br />
            One introduction that actually matters.
          </p>
          <Link href="/test">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20"
              >
                Begin your assessment
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
