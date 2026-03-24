"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    color: "hsl(346, 80%, 55%)",
    size: 600,
    opacity: 0.15,
    position: { top: "-5%", left: "-10%" },
    animate: { x: [0, 80, -40, 0], y: [0, -60, 70, 0], scale: [1, 1.2, 0.9, 1] },
    duration: 24,
  },
  {
    color: "hsl(346, 60%, 65%)",
    size: 500,
    opacity: 0.1,
    position: { top: "20%", right: "-8%" },
    animate: { x: [0, -70, 50, 0], y: [0, 80, -40, 0], scale: [1, 0.85, 1.15, 1] },
    duration: 28,
  },
  {
    color: "hsl(20, 60%, 70%)",
    size: 450,
    opacity: 0.1,
    position: { top: "50%", left: "10%" },
    animate: { x: [0, 60, -70, 0], y: [0, -50, 60, 0], scale: [1, 1.15, 0.9, 1] },
    duration: 22,
  },
  {
    color: "hsl(346, 70%, 60%)",
    size: 400,
    opacity: 0.08,
    position: { top: "75%", right: "5%" },
    animate: { x: [0, -40, 60, 0], y: [0, 50, -60, 0], scale: [1, 1.1, 0.85, 1] },
    duration: 26,
  },
  {
    color: "hsl(346, 50%, 75%)",
    size: 350,
    opacity: 0.07,
    position: { bottom: "5%", left: "30%" },
    animate: { x: [0, 50, -30, 0], y: [0, -40, 50, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 30,
  },
];

export function FloatingBlobs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            opacity: blob.opacity,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            ...blob.position,
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
