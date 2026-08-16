const MAX_MINUTES_FOR_FULL_BLOOM = 300; // ~5 hours of accumulated focus fills the plot

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function GardenPlot({
  totalMinutes,
  ownedItems,
  liveProgress = 0, // 0..1, current in-progress session
}: {
  totalMinutes: number;
  ownedItems: string[];
  liveProgress?: number;
}) {
  const growth = clamp(totalMinutes / MAX_MINUTES_FOR_FULL_BLOOM, 0.03, 1);
  const stemCount = Math.max(1, Math.round(growth * 7));
  const hasMushrooms = ownedItems.includes("glow-mushroom");
  const hasFireflies = ownedItems.includes("firefly-swarm");
  const hasVine = ownedItems.includes("moonvine");
  const hasLanterns = ownedItems.includes("lantern-path");

  return (
    <svg
      viewBox="0 0 400 260"
      className="w-full max-w-xl overflow-hidden rounded-2xl shadow-glow"
      role="img"
      aria-label="Your garden"
    >
      <defs>
        <linearGradient id="plotSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3873" />
          <stop offset="45%" stopColor="#2c1f4a" />
          <stop offset="100%" stopColor="#171233" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="82%" cy="12%" r="20%">
          <stop offset="0%" stopColor="#eafcff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#8be8ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8be8ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f5b45" />
          <stop offset="100%" stopColor="#1d4030" />
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#245939" />
          <stop offset="100%" stopColor="#122c1e" />
        </linearGradient>
        <radialGradient id="stemGlowPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6d3ef" />
          <stop offset="100%" stopColor="#e6b3d9" />
        </radialGradient>
        <radialGradient id="stemGlowBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6f6ff" />
          <stop offset="100%" stopColor="#8be8ff" />
        </radialGradient>
      </defs>

      <rect width="400" height="260" fill="url(#plotSky)" rx="18" />
      <circle cx="330" cy="34" r="46" fill="url(#moonGlow)" />
      <circle cx="330" cy="34" r="13" fill="#f4f1ff" opacity="0.95" />

      {/* soft watercolor hills, layered for depth */}
      <path
        d="M0 210 C 70 190, 140 224, 220 200 C 290 180, 340 212, 400 196 L400 260 L0 260 Z"
        fill="url(#hillFar)"
        opacity="0.8"
      />
      <path
        d="M0 226 C 90 208, 180 240, 260 216 C 320 200, 360 226, 400 214 L400 260 L0 260 Z"
        fill="url(#hillNear)"
      />

      {/* lantern path */}
      {hasLanterns &&
        [40, 130, 220, 310].map((x) => (
          <g key={x}>
            <rect x={x} y="200" width="3" height="18" fill="#5b46a8" opacity="0.8" />
            <circle cx={x + 1.5} cy="198" r="5" fill="#ffd166" className="firefly" />
          </g>
        ))}

      {/* stems, count + height scale with total focused minutes */}
      {Array.from({ length: stemCount }).map((_, i) => {
        const x = 46 + i * (310 / Math.max(stemCount - 1, 1));
        const h = 26 + growth * 78 + (i % 3) * 6;
        const baseY = 224;
        return (
          <g key={i}>
            <path
              d={`M${x} ${baseY} C ${x - 7} ${baseY - h * 0.5}, ${x + 7} ${
                baseY - h * 0.75
              }, ${x} ${baseY - h}`}
              stroke="#3c8c5c"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d={`M${x} ${baseY - h * 0.4} C ${x - 14} ${baseY - h * 0.35}, ${x - 16} ${
                baseY - h * 0.55
              }, ${x - 6} ${baseY - h * 0.5}`}
              stroke="#3c8c5c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle
              cx={x}
              cy={baseY - h}
              r={6 + growth * 5}
              fill={i % 2 === 0 ? "url(#stemGlowPink)" : "url(#stemGlowBlue)"}
              opacity="0.95"
            />
          </g>
        );
      })}

      {/* moonvine trellis */}
      {hasVine && (
        <path
          d="M372 260 C 350 210, 382 150, 360 100 C 344 62, 372 32, 356 8"
          stroke="#8be8ff"
          strokeWidth="3"
          fill="none"
          opacity="0.65"
        />
      )}

      {/* glow mushrooms */}
      {hasMushrooms &&
        [70, 150, 260].map((x) => (
          <g key={x}>
            <rect x={x - 2} y="208" width="4" height="12" fill="#efe7f7" opacity="0.5" />
            <ellipse cx={x} cy="204" rx="10" ry="6" fill="#ffd166" className="firefly" />
          </g>
        ))}

      {/* fireflies */}
      {hasFireflies &&
        [
          [60, 60],
          [180, 40],
          [300, 80],
          [340, 150],
        ].map(([x, y], idx) => (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="2.5"
            fill="#ffd166"
            className="firefly"
            style={{ animationDelay: `${idx * 0.6}s` }}
          />
        ))}

      {/* live session progress */}
      {liveProgress > 0 && (
        <g>
          <rect x="20" y="18" width="360" height="4" rx="2" fill="#382a63" opacity="0.6" />
          <rect
            x="20"
            y="18"
            width={clamp(liveProgress, 0, 1) * 360}
            height="4"
            rx="2"
            fill="#ffd166"
          />
        </g>
      )}
    </svg>
  );
}

