"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function ProfileSilhouette() {
  // Standard user icon silhouette — like the ones used in contact lists / avatars
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-28 w-28 sm:h-36 sm:w-36" opacity="0.28">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export function ConnectionAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="relative flex items-center justify-center py-10">
          {/* Left profile */}
          <motion.div
            className="flex-shrink-0 text-primary"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileSilhouette />
          </motion.div>

          {/* Connection area */}
          <div className="relative mx-4 flex h-16 w-28 items-center justify-center sm:mx-6 sm:w-40">
            {/* Dashed line */}
            <motion.div
              className="absolute inset-x-0 h-px"
              style={{
                background:
                  "repeating-linear-gradient(90deg, hsl(346, 60%, 75%) 0px, hsl(346, 60%, 75%) 3px, transparent 3px, transparent 8px)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Heart — centered with background to cut the line */}
            <motion.div
              className="relative z-10 flex items-center justify-center rounded-full bg-background px-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.9 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="h-10 w-10 text-primary sm:h-14 sm:w-14"
                fill="currentColor"
                animate={isInView ? { scale: [1, 1.25, 1, 1.15, 1] } : {}}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: "easeInOut",
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </motion.div>

            {/* Pulse ring — centered to the container */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: [1, 2.2], opacity: [0.2, 0] } : {}}
              transition={{
                duration: 1,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 0.2,
                ease: "easeOut",
              }}
            >
              <div className="h-8 w-8 rounded-full border border-primary" />
            </motion.div>
          </div>

          {/* Right profile */}
          <motion.div
            className="flex-shrink-0 text-primary"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileSilhouette />
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          className="mt-2 text-center font-serif text-xl font-semibold tracking-tight sm:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="text-foreground/70">Свързваме хора, които </span>
          <span className="italic text-primary">наистина си подхождат</span>
        </motion.p>
      </div>
    </section>
  );
}
