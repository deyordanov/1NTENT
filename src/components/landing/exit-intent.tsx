"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const dismissedRef = useRef(false);
  const activeRef = useRef(false);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (window.innerWidth < 768 || "ontouchstart" in window) return;

    // Delay activation so it doesn't fire on initial page load
    const timer = setTimeout(() => {
      activeRef.current = true;
    }, 2500);

    function handleOut(e: MouseEvent) {
      if (!activeRef.current || dismissedRef.current) return;

      // e.relatedTarget is null when the cursor leaves the document entirely
      // combined with upward movement (toward tabs/address bar)
      if (e.relatedTarget === null && e.clientY < 50) {
        activeRef.current = false;
        setShow(true);
      }
    }

    document.documentElement.addEventListener("mouseout", handleOut);

    return () => {
      clearTimeout(timer);
      document.documentElement.removeEventListener("mouseout", handleOut);
    };
  }, []);

  function dismiss() {
    setShow(false);
    dismissedRef.current = true;
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
              Всеки ден е ден, в който можеше да срещнеш правилния човек.
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              10 въпроса, под 3 минути, без регистрация.
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
