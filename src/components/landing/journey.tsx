"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const steps = [
  {
    title: "You answer honestly",
    description:
      "Fifteen questions. No right answers. We\u2019re mapping how you think, what energizes you, and how you navigate relationships.",
  },
  {
    title: "We build your profile",
    description:
      "Your responses create a nuanced picture across five psychological dimensions\u2014the same framework used by researchers worldwide since 1961.",
  },
  {
    title: "We make the introduction",
    description:
      "No algorithms deciding your future. A real person reviews your profile, finds someone whose mind complements yours, and introduces you properly.",
  },
];

export function Journey() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        {/* Section title */}
        <FadeInUp>
          <h2 className="mb-16 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="relative pl-12 sm:pl-16">
            {/* Vertical line */}
            <div
              className="absolute left-[15px] top-[15px] bottom-[15px] w-[2px] rounded-full sm:left-[19px]"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(346, 77%, 50%), hsl(346, 60%, 75%) 60%, hsl(30, 15%, 90%))",
              }}
            />

            <div className="space-y-0">
              {steps.map((step, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={i}
                    className="group relative cursor-pointer py-5 transition-colors"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(isActive ? null : i)}
                  >
                    {/* Dot — solid bg to sit above the line */}
                    <motion.div
                      className="absolute -left-12 top-[23px] z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full sm:-left-16 sm:h-[38px] sm:w-[38px]"
                      animate={{
                        backgroundColor: isActive
                          ? "hsl(346, 77%, 50%)"
                          : "hsl(30, 25%, 98%)",
                        boxShadow: isActive
                          ? "0 0 0 4px hsla(346, 77%, 50%, 0.15)"
                          : "0 0 0 2px hsl(30, 15%, 88%)",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.span
                        className="text-xs font-semibold sm:text-sm"
                        animate={{
                          color: isActive
                            ? "hsl(0, 0%, 100%)"
                            : "hsl(20, 10%, 55%)",
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        {i + 1}
                      </motion.span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="font-serif text-xl font-semibold sm:text-2xl"
                      animate={{
                        color: isActive
                          ? "hsl(20, 20%, 14%)"
                          : "hsl(20, 10%, 50%)",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {step.title}
                    </motion.h3>

                    {/* Description — revealed on hover/click */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
