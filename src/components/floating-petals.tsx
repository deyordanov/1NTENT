"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const petalColors = [
  "hsl(346, 77%, 50%)",
  "hsl(346, 60%, 65%)",
  "hsl(346, 80%, 75%)",
  "hsl(346, 50%, 82%)",
  "hsl(340, 70%, 60%)",
  "hsl(350, 90%, 85%)",
];

function FloatingPetal({ delay, index }: { delay: number; index: number }) {
  const left = 5 + Math.random() * 90;
  const size = 8 + Math.random() * 14;
  const color = petalColors[index % petalColors.length];
  const drift = (Math.random() - 0.5) * 120;
  const rotation = Math.random() * 360;
  const duration = 8 + Math.random() * 7;

  return (
    <motion.div
      className="pointer-events-none fixed"
      style={{
        left: `${left}%`,
        top: -20,
        zIndex: 0,
      }}
      animate={{
        opacity: [0, 0.7, 0.7, 0.5, 0],
        y: [-20, 900],
        x: [0, drift * 0.3, drift, drift * 0.5],
        rotate: [0, rotation * 0.5, rotation + 180],
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 20 28">
        <path
          d="M10 0 C14 6, 20 12, 18 20 C16 26, 12 28, 10 28 C8 28, 4 26, 2 20 C0 12, 6 6, 10 0Z"
          fill={color}
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}

function Sparkle({ delay }: { delay: number }) {
  const left = 10 + Math.random() * 80;
  const top = 10 + Math.random() * 80;
  const size = 3 + Math.random() * 5;

  return (
    <motion.div
      className="pointer-events-none fixed"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        zIndex: 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 4,
      }}
    >
      <svg width={size * 4} height={size * 4} viewBox="0 0 24 24">
        <path
          d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
          fill="hsl(346, 77%, 50%)"
          opacity={0.3}
        />
      </svg>
    </motion.div>
  );
}

interface FloatingPetalsProps {
  petalCount?: number;
  sparkleCount?: number;
}

export function FloatingPetals({ petalCount = 20, sparkleCount = 8 }: FloatingPetalsProps) {
  const [mounted, setMounted] = useState(false);
  const [petals, setPetals] = useState<number[]>([]);
  const [sparkles, setSparkles] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setPetals(Array.from({ length: petalCount }, (_, i) => i));
    setSparkles(Array.from({ length: sparkleCount }, (_, i) => i));
  }, [petalCount, sparkleCount]);

  if (!mounted) return null;

  return (
    <>
      {petals.map((i) => (
        <FloatingPetal key={`p-${i}`} delay={i * 0.4} index={i} />
      ))}
      {sparkles.map((i) => (
        <Sparkle key={`s-${i}`} delay={i * 0.6} />
      ))}
    </>
  );
}
