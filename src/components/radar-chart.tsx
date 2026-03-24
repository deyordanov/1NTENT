"use client";

import { motion } from "framer-motion";
import { RadarScores, RadarDimension, radarLabels } from "@/lib/scoring";

const dimensions: RadarDimension[] = [
  "readiness",
  "emotionalDepth",
  "intentionality",
  "stability",
  "openness",
];

const cx = 150;
const cy = 150;
const maxR = 110;
const levels = 4;

function polarToCart(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function getPoints(scores: RadarScores, scale = 1) {
  return dimensions.map((dim, i) => {
    const angle = (360 / dimensions.length) * i;
    const r = (scores[dim] / 100) * maxR * scale;
    return polarToCart(angle, r);
  });
}

interface RadarChartProps {
  scores: RadarScores;
  blurred?: boolean;
}

export function RadarChart({ scores, blurred = false }: RadarChartProps) {
  const points = getPoints(scores);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className={`relative ${blurred ? "select-none" : ""}`}>
      <svg
        viewBox="0 0 300 300"
        className="mx-auto w-full max-w-[280px]"
        style={blurred ? { filter: "blur(6px)" } : undefined}
      >
        {/* Grid rings */}
        {Array.from({ length: levels }, (_, i) => {
          const r = (maxR / levels) * (i + 1);
          const ringPoints = dimensions.map((_, j) => {
            const angle = (360 / dimensions.length) * j;
            return polarToCart(angle, r);
          });
          const d = ringPoints.map((p, j) => `${j === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="hsl(346, 30%, 90%)"
              strokeWidth={1}
              opacity={0.6}
            />
          );
        })}

        {/* Axis lines */}
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
              stroke="hsl(346, 20%, 88%)"
              strokeWidth={1}
            />
          );
        })}

        {/* Filled area */}
        <motion.path
          d={pathD}
          fill="hsla(346, 77%, 50%, 0.12)"
          stroke="hsl(346, 77%, 50%)"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="hsl(346, 77%, 50%)"
            stroke="white"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {dimensions.map((dim, i) => {
          const angle = (360 / dimensions.length) * i;
          const labelR = maxR + 24;
          const pos = polarToCart(angle, labelR);
          const score = scores[dim];

          return (
            <motion.g
              key={dim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
            >
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px] font-medium"
              >
                {radarLabels[dim]}
              </text>
              <text
                x={pos.x}
                y={pos.y + 8}
                textAnchor="middle"
                className="fill-primary text-[11px] font-bold"
              >
                {blurred ? "••" : `${score}%`}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
