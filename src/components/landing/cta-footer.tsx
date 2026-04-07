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
            Искаш ли да срещнеш някой,
            <br />
            който <span className="italic text-primary">те разбира</span>?
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
            25 въпроса.
            <br />
            Едно запознанство, което наистина има значение.
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
                Започни теста
              </Button>
            </motion.div>
          </Link>
          <p className="mt-4 text-xs text-muted-foreground/60">
            Приемаме ограничен брой участници всеки месец
          </p>
        </motion.div>
      </div>
    </section>
  );
}
