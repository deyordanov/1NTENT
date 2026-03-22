"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    text: "Още на първата среща усетих, че този човек наистина ми подхожда. Не като приложенията, където просто прелистваш профили.",
    name: "Мария К., 29",
  },
  {
    text: "Скептик бях, но разговорът с екипа ме убеди. След месец вече бях на среща с момиче, с което си пасваме идеално.",
    name: "Георги Д., 34",
  },
  {
    text: "Харесва ми, че някой наистина ме изслуша какво търся. Не просто алгоритъм, а хора, които разбират от хора.",
    name: "Елена П., 27",
  },
];

export function TypingTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      setIsTyping(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    const fullText = testimonials[currentIndex].text;
    let charIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);

        // Auto-advance only if user hasn't manually navigated
        if (!userInteracted) {
          autoTimerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            setIsTyping(true);
          }, 6000);
        }
      }
    }, 30);

    return () => {
      clearInterval(interval);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [currentIndex, isTyping, userInteracted]);

  const goTo = useCallback((index: number) => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setUserInteracted(true);
    setCurrentIndex(index);
    setIsTyping(true);

    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setUserInteracted(false), 10000);
  }, []);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, goTo]);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % testimonials.length);
  }, [currentIndex, goTo]);

  const current = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Quote mark */}
          <span className="block font-serif text-5xl leading-none text-primary/20">
            &ldquo;
          </span>

          {/* Typing text */}
          <div className="min-h-[4.5rem] sm:min-h-[3.5rem]">
            <p className="font-serif text-lg leading-relaxed text-foreground/80 sm:text-xl">
              {displayedText}
              {isTyping && (
                <motion.span
                  className="ml-0.5 inline-block h-5 w-0.5 bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </div>

          {/* Attribution */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTyping ? 0.3 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {current.name}
            </motion.p>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-4">
            {/* Dots — clickable */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-1">
              <button
                onClick={goPrev}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
