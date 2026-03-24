"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveActivity() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 4 seconds
    const showTimer = setTimeout(() => {
      setCount(Math.floor(Math.random() * 4) + 2); // 2-5
      setVisible(true);
    }, 4000);

    // Auto-hide after 8 seconds of being visible
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-20 right-4 z-40 sm:right-6"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div
            className="flex items-center gap-2.5 rounded-full border border-border/40 bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{count}</span> души
              попълват теста в момента
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
