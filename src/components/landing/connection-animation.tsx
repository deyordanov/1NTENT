"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function ProfileSilhouette({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      className={`w-16 sm:w-20 ${flip ? "scale-x-[-1]" : ""}`}
    >
      {/* Head */}
      <circle cx="40" cy="28" r="16" fill="currentColor" opacity="0.15" />
      {/* Body */}
      <path
        d="M12 100 C12 72, 22 58, 40 58 C58 58, 68 72, 68 100"
        fill="currentColor"
        opacity="0.1"
      />
      {/* Face hint */}
      <circle cx="40" cy="28" r="14" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function ConnectionAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="relative flex items-center justify-center py-12">
          {/* Left profile */}
          <motion.div
            className="text-primary/60"
            initial={{ x: -60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileSilhouette />
          </motion.div>

          {/* Connection line + heart */}
          <div className="relative mx-6 flex items-center sm:mx-10">
            {/* Dashed line that draws in */}
            <motion.div
              className="h-px w-20 sm:w-32"
              style={{
                background:
                  "repeating-linear-gradient(90deg, hsl(346, 77%, 50%) 0px, hsl(346, 77%, 50%) 4px, transparent 4px, transparent 8px)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Heart in center */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.9,
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-primary sm:h-10 sm:w-10"
                fill="currentColor"
                animate={isInView ? { scale: [1, 1.15, 1] } : {}}
                transition={{
                  duration: 1.2,
                  delay: 1.4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </motion.div>

            {/* Pulse rings around heart */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: [1, 2.5],
                      opacity: [0.3, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeOut",
              }}
            >
              <div className="h-10 w-10 rounded-full border border-primary sm:h-12 sm:w-12" />
            </motion.div>
          </div>

          {/* Right profile */}
          <motion.div
            className="text-primary/60"
            initial={{ x: 60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileSilhouette flip />
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Свързваме хора, които наистина си подхождат
        </motion.p>
      </div>
    </section>
  );
}
