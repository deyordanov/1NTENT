"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-6">
        <div className="relative pl-10 sm:pl-14">
          {/* Vertical line — spans from first dot center to last dot center */}
          <div
            className="absolute left-[11px] top-[11px] bottom-[11px] w-[2px] rounded-full sm:left-[15px] sm:top-[15px] sm:bottom-[15px]"
            style={{
              background:
                "linear-gradient(to bottom, hsl(346, 77%, 50%) 0%, hsl(346, 60%, 75%) 50%, hsl(30, 15%, 88%) 100%)",
            }}
          />

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  {/* Dot on the timeline — sits above the line */}
                  <motion.div
                    className="absolute -left-10 top-1.5 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 sm:-left-14 sm:h-[30px] sm:w-[30px]"
                    animate={{
                      borderColor: isActive
                        ? "hsl(346, 77%, 50%)"
                        : "hsl(30, 15%, 88%)",
                      backgroundColor: isActive
                        ? "hsl(346, 77%, 50%)"
                        : "hsl(30, 25%, 98%)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.span
                      className="text-[10px] font-semibold sm:text-xs"
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
                        : "hsl(20, 10%, 44%)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description — revealed on hover */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        className="mt-3 max-w-md leading-relaxed text-muted-foreground"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
