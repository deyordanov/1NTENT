import { RadarScores, RadarDimension, radarLabels } from "@/lib/scoring";

const dimensions: RadarDimension[] = [
  "readiness",
  "emotionalDepth",
  "intentionality",
  "stability",
  "openness",
];

/**
 * Generates a radar chart as a base64 PNG string (client-side only).
 * Returns a data URL like "data:image/png;base64,..."
 */
export function generateRadarImage(scores: RadarScores): string | null {
  if (typeof window === "undefined") return null;

  const size = 400;
  const dpr = 2;
  const canvas = document.createElement("canvas");
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = 130;
  const n = dimensions.length;

  function polar(angle: number, r: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);

  // Subtle background glow
  const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR + 20);
  bgGlow.addColorStop(0, "rgba(200, 39, 77, 0.04)");
  bgGlow.addColorStop(1, "rgba(200, 39, 77, 0)");
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, size, size);

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
    ctx.strokeStyle = level === 4 ? "rgba(200, 39, 77, 0.15)" : "rgba(200, 39, 77, 0.08)";
    ctx.lineWidth = 0.8;
    if (level < 4) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Alternating fill
    if (level % 2 === 0) {
      ctx.fillStyle = "rgba(200, 39, 77, 0.02)";
      ctx.fill();
    }
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const angle = (360 / n) * i;
    const end = polar(angle, maxR);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = "rgba(200, 39, 77, 0.08)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(200, 39, 77, 0.2)";
  ctx.fill();

  // Data polygon
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

  // Gradient fill
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  gradient.addColorStop(0, "rgba(200, 39, 77, 0.25)");
  gradient.addColorStop(1, "rgba(200, 39, 77, 0.06)");
  ctx.fillStyle = gradient;
  ctx.fill();

  // Stroke
  ctx.strokeStyle = "rgba(200, 39, 77, 0.85)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Data points
  points.forEach((p) => {
    // Glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200, 39, 77, 0.15)";
    ctx.fill();

    // White dot with border
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "rgba(200, 39, 77, 0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.textAlign = "center";
  dimensions.forEach((dim, i) => {
    const angle = (360 / n) * i;
    const labelPos = polar(angle, maxR + 25);
    const score = scores[dim];

    // Label
    ctx.font = "600 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
    ctx.fillText(radarLabels[dim], labelPos.x, labelPos.y - 3);

    // Score
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = "rgba(200, 39, 77, 0.85)";
    ctx.fillText(`${score}%`, labelPos.x, labelPos.y + 12);
  });

  return canvas.toDataURL("image/png");
}

/**
 * Extracts the raw base64 string (without the data URL prefix)
 */
export function getBase64FromDataUrl(dataUrl: string): string {
  return dataUrl.replace(/^data:image\/png;base64,/, "");
}
