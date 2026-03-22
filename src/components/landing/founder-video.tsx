"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// TODO: Replace with your actual video URL (YouTube, Vimeo, or self-hosted mp4)
const VIDEO_URL = "";

export function FounderVideo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);

  if (!VIDEO_URL) {
    // Placeholder — shows when no video is set yet
    return (
      <section ref={ref} className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            className="overflow-hidden rounded-2xl border border-border/40 bg-muted/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex aspect-video items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 text-primary"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Запознай се с екипа
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Видеото ще бъде налично скоро
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Зад 1NTENT
          </p>
          <h3 className="mb-6 font-serif text-2xl font-semibold sm:text-3xl">
            Защо правим това
          </h3>

          <div className="relative overflow-hidden rounded-2xl border border-border/40">
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative flex aspect-video w-full items-center justify-center bg-muted/30"
              >
                {/* Play button */}
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <span className="absolute bottom-4 text-sm text-muted-foreground">
                  30 секунди
                </span>
              </button>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={VIDEO_URL}
                  className="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
