"use client";

import { motion } from "framer-motion";
import { RadarScores, RadarDimension, radarLabels } from "@/lib/scoring";

const dimensions: RadarDimension[] = [
  "attachmentSecurity",
  "emotionalOpenness",
  "loveExpression",
  "lifeVisionAlignment",
  "relationalMaturity",
];

const cx = 150;
const cy = 150;
const maxR = 120;
const levels = 4;

function polarToCart(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function getPoints(scores: RadarScores) {
  return dimensions.map((dim, i) => {
    const angle = (360 / dimensions.length) * i;
    const r = (scores[dim] / 100) * maxR;
    return polarToCart(angle, r);
  });
}

interface RadarChartProps {
  scores: RadarScores;
  blurred?: boolean;
}

export function RadarChart({ scores, blurred = false }: RadarChartProps) {
  const points = getPoints(scores);
  const pathD =
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z";

  // Label positions as percentages for HTML overlay
  const labelPositions = dimensions.map((_, i) => {
    const angle = (360 / dimensions.length) * i;
    const pos = polarToCart(angle, maxR + 2);
    // Convert to percentage of the 300x300 viewBox
    return {
      left: `${(pos.x / 300) * 100}%`,
      top: `${(pos.y / 300) * 100}%`,
      angle,
    };
  });

  return (
    <div className={`relative ${blurred ? "select-none" : ""}`}>
      {/* Chart container with padding for labels */}
      <div
        className="relative mx-auto w-full max-w-[400px] px-12 py-6 sm:px-8"
        style={blurred ? { filter: "blur(6px)" } : undefined}
      >
        {/* SVG chart */}
        <div className="relative">
          <svg viewBox="0 0 300 300" className="w-full">
            {/* Gradient definition */}
            <defs>
              <radialGradient id="chartGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(346, 77%, 50%)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="hsl(346, 77%, 50%)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="areaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(346, 77%, 55%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(346, 90%, 45%)" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Background glow */}
            <circle cx={cx} cy={cy} r={maxR + 10} fill="url(#chartGlow)" />

            {/* Grid rings with alternating fills */}
            {Array.from({ length: levels }, (_, i) => {
              const r = (maxR / levels) * (i + 1);
              const outerPoints = dimensions.map((_, j) => {
                const angle = (360 / dimensions.length) * j;
                return polarToCart(angle, r);
              });
              const d =
                outerPoints
                  .map((p, j) => `${j === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                  .join(" ") + " Z";
              return (
                <g key={i}>
                  {/* Alternating subtle fill */}
                  {i % 2 === 0 && (
                    <path
                      d={d}
                      fill="hsl(346, 20%, 96%)"
                      opacity={0.4}
                    />
                  )}
                  <path
                    d={d}
                    fill="none"
                    stroke="hsl(346, 15%, 88%)"
                    strokeWidth={0.8}
                    strokeDasharray={i < levels - 1 ? "4 3" : "0"}
                    opacity={0.7}
                  />
                </g>
              );
            })}

            {/* Axis lines — subtle */}
            {dimensions.map((_, i) => {
              const angle = (360 / dimensions.length) * i;
              const end = polarToCart(angle, maxR);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={end.x}
                  y2={end.y}
                  stroke="hsl(346, 15%, 85%)"
                  strokeWidth={0.8}
                />
              );
            })}

            {/* Center dot */}
            <circle cx={cx} cy={cy} r={2.5} fill="hsl(346, 30%, 80%)" />

            {/* Filled area with gradient */}
            <motion.path
              d={pathD}
              fill="url(#areaFill)"
              stroke="hsl(346, 77%, 50%)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Data points with pulse rings */}
            {points.map((p, i) => (
              <g key={i}>
                {/* Outer pulse */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={8}
                  fill="none"
                  stroke="hsl(346, 77%, 50%)"
                  strokeWidth={1}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 2] }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
                {/* Inner dot */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  fill="white"
                  stroke="hsl(346, 77%, 50%)"
                  strokeWidth={2.5}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* HTML labels positioned around chart */}
        {dimensions.map((dim, i) => {
          const { left, top } = labelPositions[i];
          const score = scores[dim];

          // Center all labels on their axis point
          const translateX = "-50%";
          const textAlign: "left" | "center" | "right" = "center";
          const translateY = "-50%";

          return (
            <motion.div
              key={dim}
              className="absolute pointer-events-none"
              style={{
                left,
                top,
                transform: `translate(${translateX}, ${translateY})`,
                textAlign,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: blurred ? 0.5 : 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
            >
              <p className="text-[9px] font-semibold tracking-wide text-muted-foreground/80 sm:text-[11px]">
                {radarLabels[dim]}
              </p>
              <p className="text-xs font-bold text-primary sm:text-sm">
                {blurred ? "••" : `${score}%`}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
