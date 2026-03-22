"use client";

import { motion } from "framer-motion";
import { Scores, Dimension } from "@/types";

const dimensions: { key: Dimension; label: string; pillLabel: string }[] = [
  { key: "openness", label: "Откритост", pillLabel: "Откритост" },
  { key: "extraversion", label: "Общителност", pillLabel: "Общителност" },
  { key: "agreeableness", label: "Отзивчивост", pillLabel: "Отзивчивост" },
  { key: "conscientiousness", label: "Целеустременост", pillLabel: "Целеустременост" },
  { key: "neuroticism", label: "Емоции", pillLabel: "Емоционалност" },
];

const PADDING = 90;
const RADIUS = 85;
const SIZE = RADIUS * 2 + PADDING * 2;
const CENTER = SIZE / 2;
const LEVELS = 4;
const ANGLE_OFFSET = -Math.PI / 2; // start from top

function polarToCartesian(angle: number, radius: number) {
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function getPolygonPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const angle = ANGLE_OFFSET + (2 * Math.PI * i) / values.length;
      const r = (v / 100) * RADIUS;
      const { x, y } = polarToCartesian(angle, r);
      return `${x},${y}`;
    })
    .join(" ");
}

function getGridPolygon(level: number): string {
  const r = (RADIUS * (level + 1)) / LEVELS;
  return dimensions
    .map((_, i) => {
      const angle = ANGLE_OFFSET + (2 * Math.PI * i) / dimensions.length;
      const { x, y } = polarToCartesian(angle, r);
      return `${x},${y}`;
    })
    .join(" ");
}

interface RadarChartProps {
  scores: Scores;
  blurred?: boolean;
}

export function RadarChart({ scores, blurred = false }: RadarChartProps) {
  const values = dimensions.map((d) => scores[d.key]);
  const dataPoints = getPolygonPoints(values);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${blurred ? "select-none" : ""}`}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={`w-full max-w-[380px] transition-all duration-700 ${
            blurred ? "blur-[3px]" : ""
          }`}
        >
          {/* Grid levels */}
          {Array.from({ length: LEVELS }).map((_, level) => (
            <polygon
              key={level}
              points={getGridPolygon(level)}
              fill="none"
              stroke="hsl(30, 15%, 88%)"
              strokeWidth={level === LEVELS - 1 ? 1.2 : 0.6}
              opacity={0.6}
            />
          ))}

          {/* Axis lines */}
          {dimensions.map((_, i) => {
            const angle = ANGLE_OFFSET + (2 * Math.PI * i) / dimensions.length;
            const { x, y } = polarToCartesian(angle, RADIUS);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="hsl(30, 15%, 88%)"
                strokeWidth={0.6}
                opacity={0.5}
              />
            );
          })}

          {/* Data area — animated */}
          <motion.polygon
            points={getPolygonPoints(dimensions.map(() => 0))}
            animate={{ points: dataPoints }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            fill="hsla(346, 77%, 50%, 0.12)"
            stroke="hsl(346, 77%, 50%)"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* Data dots */}
          {values.map((v, i) => {
            const angle = ANGLE_OFFSET + (2 * Math.PI * i) / dimensions.length;
            const r = (v / 100) * RADIUS;
            const { x, y } = polarToCartesian(angle, r);
            return (
              <motion.circle
                key={i}
                r={4}
                fill="hsl(346, 77%, 50%)"
                stroke="white"
                strokeWidth={2}
                initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                animate={{ cx: x, cy: y, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
              />
            );
          })}

          {/* Labels — always visible even when blurred */}
          {dimensions.map((d, i) => {
            const angle = ANGLE_OFFSET + (2 * Math.PI * i) / dimensions.length;
            const labelR = RADIUS + 20;
            const { x, y } = polarToCartesian(angle, labelR);

            let anchor: "start" | "middle" | "end" = "middle";
            if (x < CENTER - 8) anchor = "end";
            else if (x > CENTER + 8) anchor = "start";

            return (
              <motion.text
                key={d.key}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="central"
                className="fill-muted-foreground text-[10px] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              >
                {d.label}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Score pills — blurred or visible */}
      <div className={`mt-4 flex flex-wrap justify-center gap-2 transition-all duration-700 ${
        blurred ? "blur-[3px] select-none" : ""
      }`}>
        {dimensions.map((d, i) => (
          <motion.div
            key={d.key}
            className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.08, duration: 0.4 }}
          >
            <span className="font-medium text-foreground">{d.pillLabel}</span>
            <span className="font-bold text-primary">{scores[d.key]}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
