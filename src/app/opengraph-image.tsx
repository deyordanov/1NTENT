import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "1NTENT - Мачмейкинг, базиран на личността";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0a10, #1f0e18, #140812)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 10%, rgba(220,50,80,0.6) 30%, rgba(220,50,80,0.6) 70%, transparent 90%)",
          }}
        />

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 10%, rgba(220,50,80,0.4) 30%, rgba(220,50,80,0.4) 70%, transparent 90%)",
          }}
        />

        {/* Decorative glows */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 200,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(220,50,80,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 150,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(220,50,80,0.03)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "rgba(220,50,80,0.9)",
              letterSpacing: "-2px",
            }}
          >
            1
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-2px",
            }}
          >
            NTENT
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 300,
            margin: 0,
            marginBottom: 16,
          }}
        >
          Мачмейкинг, базиран на личността
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(220,50,80,0.6)",
            fontWeight: 400,
            margin: 0,
            marginBottom: 40,
          }}
        >
          Намираме човека, който ти подхожда.
        </p>

        {/* Heart */}
        <span
          style={{
            fontSize: 36,
            color: "rgba(220,50,80,0.4)",
            marginBottom: 40,
          }}
        >
          ♥
        </span>

        {/* CTA */}
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
            margin: 0,
            marginBottom: 20,
          }}
        >
          7 въпроса · под 3 мин · безплатно
        </p>

        {/* Domain */}
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.2)",
            fontWeight: 500,
            margin: 0,
            position: "absolute",
            bottom: 24,
          }}
        >
          1ntent.eu
        </p>
      </div>
    ),
    { ...size }
  );
}
