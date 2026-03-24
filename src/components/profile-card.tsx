"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ProfileResult } from "@/types";
import { RadarScores, RadarDimension, radarLabels } from "@/lib/scoring";

const dimensions: RadarDimension[] = [
  "readiness",
  "emotionalDepth",
  "intentionality",
  "stability",
  "openness",
];

interface ProfileCardProps {
  profile: ProfileResult;
  scores: RadarScores;
  onDownload?: () => void;
}

function drawRadar(
  ctx: CanvasRenderingContext2D,
  scores: RadarScores,
  cx: number,
  cy: number,
  maxR: number
) {
  const n = dimensions.length;

  function polar(angle: number, r: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Grid rings
  for (let level = 1; level <= 4; level++) {
    const r = (maxR / 4) * level;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (360 / n) * (i % n);
      const p = polar(angle, r);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 0.8;
    if (level < 4) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const angle = (360 / n) * i;
    const end = polar(angle, maxR);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Data polygon — glow
  const points = dimensions.map((dim, i) => {
    const angle = (360 / n) * i;
    const r = (scores[dim] / 100) * maxR;
    return polar(angle, r);
  });

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();

  // Fill with gradient
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  gradient.addColorStop(0, "rgba(220, 50, 80, 0.35)");
  gradient.addColorStop(1, "rgba(220, 50, 80, 0.08)");
  ctx.fillStyle = gradient;
  ctx.fill();

  // Stroke
  ctx.strokeStyle = "rgba(220, 50, 80, 0.9)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Data points
  points.forEach((p) => {
    // Outer glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220, 50, 80, 0.25)";
    ctx.fill();

    // White dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "rgba(220, 50, 80, 0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.textAlign = "center";
  dimensions.forEach((dim, i) => {
    const angle = (360 / n) * i;
    const labelPos = polar(angle, maxR + 28);
    const score = scores[dim];

    // Label text
    ctx.font = "500 11px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText(radarLabels[dim], labelPos.x, labelPos.y - 4);

    // Score
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(220, 50, 80, 0.9)";
    ctx.fillText(`${score}%`, labelPos.x, labelPos.y + 12);
  });
}

export function ProfileCard({ profile, scores, onDownload }: ProfileCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const w = 540;
    const h = 720;
    const dpr = 2;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.scale(dpr, dpr);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#1a0a10");
    bgGrad.addColorStop(0.5, "#1f0e18");
    bgGrad.addColorStop(1, "#140812");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle noise overlay (decorative circles)
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 80 + 20;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 50, 80, ${Math.random() * 0.03})`;
      ctx.fill();
    }

    // Top accent line
    const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.3, "rgba(220, 50, 80, 0.6)");
    lineGrad.addColorStop(0.7, "rgba(220, 50, 80, 0.6)");
    lineGrad.addColorStop(1, "transparent");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, 0, w, 3);

    // Logo — 1NTENT
    ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    const logoText = "1NTENT";
    const logoMetrics = ctx.measureText(logoText);
    ctx.fillStyle = "rgba(220, 50, 80, 0.5)";
    ctx.fillText("1", w / 2 - logoMetrics.width / 2, 40);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    const oneWidth = ctx.measureText("1").width;
    ctx.fillText("NTENT", w / 2 - logoMetrics.width / 2 + oneWidth, 40);

    // Profile emoji
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.fillText(profile.emoji, w / 2, 95);

    // Profile title
    ctx.font = "bold 28px Georgia, serif";
    ctx.fillStyle = "white";
    ctx.fillText(profile.title, w / 2, 135);

    // Profile subtitle
    ctx.font = "italic 14px Georgia, serif";
    ctx.fillStyle = "rgba(220, 50, 80, 0.7)";
    ctx.fillText(profile.subtitle, w / 2, 158);

    // Divider
    const divGrad = ctx.createLinearGradient(w * 0.25, 0, w * 0.75, 0);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "rgba(220, 50, 80, 0.3)");
    divGrad.addColorStop(1, "transparent");
    ctx.fillStyle = divGrad;
    ctx.fillRect(w * 0.25, 175, w * 0.5, 1);

    // Radar chart
    drawRadar(ctx, scores, w / 2, 340, 110);

    // Description text
    ctx.font = "14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.textAlign = "center";

    // Word wrap description
    const words = profile.description.split(" ");
    const maxWidth = w - 80;
    let line = "";
    let y = 505;
    const lineHeight = 20;

    words.forEach((word) => {
      const testLine = line + word + " ";
      if (ctx.measureText(testLine).width > maxWidth && line !== "") {
        ctx.fillText(line.trim(), w / 2, y);
        line = word + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    if (line.trim()) ctx.fillText(line.trim(), w / 2, y);

    // Bottom section
    // Score bars
    const barY = 590;
    const barW = 80;
    const barH = 4;
    const gap = (w - 40 - barW * 5) / 4;
    const startX = 20;

    dimensions.forEach((dim, i) => {
      const x = startX + i * (barW + gap);

      // Label
      ctx.font = "500 9px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.textAlign = "center";
      ctx.fillText(radarLabels[dim], x + barW / 2, barY);

      // Bar bg
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(x, barY + 6, barW, barH, 2);
      ctx.fill();

      // Bar fill
      const fillW = (scores[dim] / 100) * barW;
      const barGrad = ctx.createLinearGradient(x, 0, x + fillW, 0);
      barGrad.addColorStop(0, "rgba(220, 50, 80, 0.9)");
      barGrad.addColorStop(1, "rgba(220, 50, 80, 0.5)");
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(x, barY + 6, fillW, barH, 2);
      ctx.fill();

      // Score value
      ctx.font = "bold 10px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillStyle = "rgba(220, 50, 80, 0.7)";
      ctx.fillText(`${scores[dim]}%`, x + barW / 2, barY + 24);
    });

    // Bottom CTA
    ctx.font = "13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.textAlign = "center";
    ctx.fillText("Открий своя профил на", w / 2, h - 40);
    ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "rgba(220, 50, 80, 0.7)";
    ctx.fillText("1ntent.vercel.app", w / 2, h - 22);

    // Bottom accent line
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, h - 3, w, 3);

    return canvas;
  }, [profile, scores]);

  const handleDownload = useCallback(() => {
    const canvas = generateCard();
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `1ntent-${profile.type}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");

    onDownload?.();
  }, [generateCard, profile.type, onDownload]);

  const handleShare = useCallback(async () => {
    const canvas = generateCard();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      if (navigator.share && navigator.canShare?.({ files: [new File([blob], "1ntent.png", { type: "image/png" })] })) {
        try {
          await navigator.share({
            files: [new File([blob], "1ntent.png", { type: "image/png" })],
            title: "Моят 1NTENT профил",
            text: "Виж какъв е моят личностен профил!",
          });
        } catch {
          handleDownload();
        }
      } else {
        handleDownload();
      }
    }, "image/png");
  }, [generateCard, handleDownload]);

  return (
    <motion.div
      className="mt-6 rounded-xl border border-primary/20 bg-gradient-to-b from-[#1a0a10] to-[#140812] p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <canvas ref={canvasRef} className="hidden" />

      <p className="mb-3 text-center text-sm font-medium text-white/80">
        Твоята карта
      </p>

      {/* Preview mini card */}
      <div className="relative mx-auto mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-[#1a0a10] to-[#1f0e18] p-5 text-center shadow-lg shadow-primary/10">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <p className="text-3xl">{profile.emoji}</p>
        <p className="mt-2 font-serif text-lg font-bold text-white">
          {profile.title}
        </p>
        <p className="text-xs italic text-primary/60">{profile.subtitle}</p>

        {/* Mini score bars */}
        <div className="mt-4 space-y-1.5">
          {dimensions.map((dim) => (
            <div key={dim} className="flex items-center gap-2">
              <span className="w-24 text-right text-[10px] text-white/40">
                {radarLabels[dim]}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${scores[dim]}%` }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </div>
              <span className="w-8 text-[10px] font-bold text-primary/60">
                {scores[dim]}%
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Запази
        </button>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Сподели
        </button>
      </div>
    </motion.div>
  );
}
