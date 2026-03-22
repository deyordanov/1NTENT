"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const steps = [
  {
    title: "Take the test & book a call",
    description:
      "Complete a short personality assessment and leave your email. If you\u2019re interested, book an introductory call so we can learn more about what you\u2019re looking for.",
  },
  {
    title: "We create your profile",
    description:
      "Once accepted into the program, we build a detailed dating profile around your personality, values, and what matters most to you in a partner.",
  },
  {
    title: "Review your matches",
    description:
      "We propose compatible matches based on your profile. You choose who interests you, and they\u2019ll get the chance to respond.",
  },
  {
    title: "We set up the date",
    description:
      "When there\u2019s mutual interest, we handle the logistics\u2014time, place, everything. You just show up and be yourself.",
  },
];

export function Journey() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <FadeInUp>
          <h2 className="mb-14 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="relative pl-14 sm:pl-16">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] top-[22px] bottom-[22px] w-[2px] rounded-full sm:left-[19px]"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(346, 77%, 50%), hsl(346, 60%, 75%) 40%, hsl(346, 70%, 85%) 70%, hsl(30, 15%, 90%))",
              }}
            />

            <div className="space-y-1">
              {steps.map((step, i) => {
                const isActive = active === i;
                return (
                  <motion.div
                    key={i}
                    className="group relative cursor-pointer rounded-xl px-1 py-5 transition-colors"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(isActive ? null : i)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Dot */}
                    <motion.div
                      className="absolute -left-14 top-[23px] z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full sm:-left-16 sm:h-[38px] sm:w-[38px]"
                      animate={{
                        backgroundColor: isActive
                          ? "hsl(346, 77%, 50%)"
                          : "hsl(30, 25%, 98%)",
                        boxShadow: isActive
                          ? "0 0 0 5px hsla(346, 77%, 50%, 0.12), 0 2px 8px hsla(346, 77%, 50%, 0.15)"
                          : "0 0 0 2px hsl(30, 15%, 88%)",
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.span
                        className="text-xs font-semibold sm:text-sm"
                        animate={{
                          color: isActive
                            ? "hsl(0, 0%, 100%)"
                            : "hsl(20, 10%, 55%)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {i + 1}
                      </motion.span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="font-serif text-lg font-semibold sm:text-xl"
                      animate={{
                        color: isActive
                          ? "hsl(20, 20%, 14%)"
                          : "hsl(20, 10%, 50%)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.title}
                    </motion.h3>

                    {/* Description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, delay: 0.05 },
                          }}
                        >
                          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
