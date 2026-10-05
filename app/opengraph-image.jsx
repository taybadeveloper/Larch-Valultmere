import { ImageResponse } from "next/og";

export const alt = "Larch Valultmere — AI-powered crypto trading platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1015",
          padding: "72px",
        }}
      >
        {/* Brand lockup — tile matches app/icon.svg */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#10161e",
              border: "1px solid rgba(16,185,129,0.35)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="55%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path
                d="M19 14 V50 H34 M31 14 L40 50 L49 14"
                stroke="url(#lg)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "28px" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#e6edf2" }}>Larch Valultmere</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#34d399" }}>
              AI-Powered Crypto Trading
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.15, fontWeight: 800, color: "#e6edf2" }}>
            Trade smarter.
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.15, fontWeight: 800, color: "#e6edf2" }}>
            Invest with confidence.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
