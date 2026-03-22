"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/motion";

export function CTAFooter() {
  return (
    <section className="py-24 sm:py-32">
      <FadeInUp>
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary px-8 py-16 text-center text-primary-foreground shadow-xl sm:px-16 sm:py-20">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                Ready to Find Your Match?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
                Take the first step toward a connection that goes beyond the
                surface. It only takes 3 minutes.
              </p>
              <Link href="/test">
                <motion.div
                  className="mt-8 inline-block"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-8 py-6 text-base font-semibold shadow-lg"
                  >
                    Begin Your Assessment
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
