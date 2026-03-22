"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  opacity: number;
}

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

function Heart({ x, y, size, drift, opacity }: Omit<HeartParticle, "id">) {
  return (
    <motion.div
      className="pointer-events-none fixed"
      style={{ left: x - size / 2, top: y - size / 2, zIndex: 9999 }}
      initial={{ opacity, scale: 0.5, y: 0, x: 0, rotate: 0 }}
      animate={{
        opacity: 0,
        scale: 0.2,
        y: -60 - Math.random() * 40,
        x: drift,
        rotate: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="hsl(346, 77%, 50%)"
        style={{ opacity: 0.7 }}
      >
        <path d={HEART_PATH} />
      </svg>
    </motion.div>
  );
}

export function CursorHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const lastSpawn = useRef(0);
  const idCounter = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    // Throttle: spawn every 80ms
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const heart: HeartParticle = {
      id: idCounter.current++,
      x: e.clientX,
      y: e.clientY,
      size: 22 + Math.random() * 18,
      drift: (Math.random() - 0.5) * 40,
      opacity: 0.4 + Math.random() * 0.3,
    };

    setHearts((prev) => {
      // Keep max 15 particles at a time
      const next = [...prev, heart];
      return next.length > 15 ? next.slice(-15) : next;
    });

    // Remove after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, 1200);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <AnimatePresence>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          x={h.x}
          y={h.y}
          size={h.size}
          drift={h.drift}
          opacity={h.opacity}
        />
      ))}
    </AnimatePresence>
  );
}
