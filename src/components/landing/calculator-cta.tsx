"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/motion";

export function CalculatorCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <FadeInUp>
          <Link href="/calculator">
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 text-center transition-colors hover:border-primary/30 sm:p-10"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Калкулатор
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Колко ти струва случайното запознанство?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Разбери колко време и пари отиват всяка година в безцелни
                запознанства.
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Изчисли &rarr;
              </span>
            </motion.div>
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
}
