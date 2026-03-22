"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when cursor moves to the top of the viewport (tab bar area)
      if (e.clientY <= 5 && !dismissed) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Don't show on mobile or if already dismissed
    if (dismissed || window.innerWidth < 768) return;

    // Delay activation so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed, handleMouseLeave]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl font-semibold">
              Преди да тръгнеш...
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Тестът отнема под 3 минути и може да промени начина, по който
              търсиш партньор.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/test" onClick={dismiss}>
                <Button className="w-full rounded-full py-5 text-base">
                  Попълни теста
                </Button>
              </Link>
              <button
                onClick={dismiss}
                className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Не, благодаря
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
