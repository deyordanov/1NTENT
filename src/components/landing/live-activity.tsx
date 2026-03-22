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

    // Fluctuate the number occasionally
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 4) + 2);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-20 left-4 z-50 sm:bottom-6"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-border/40 bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm">
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
