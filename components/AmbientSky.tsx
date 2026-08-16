"use client";

// Fixed, decorative backdrop: twinkling stars + soft drifting mist,
// echoing the twilight watercolor reference art. Purely visual, sits
// behind everything else (pointer-events disabled).
const STARS = Array.from({ length: 46 }).map((_, i) => ({
  id: i,
  top: Math.round(((i * 37) % 100) * 10) / 10,
  left: Math.round(((i * 61) % 100) * 10) / 10,
  size: 1 + ((i * 13) % 3),
  delay: (i % 10) * 0.35,
}));

export default function AmbientSky() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-twilight" />
      {/* soft drifting mist bands */}
      <div className="absolute -left-1/4 top-1/3 h-64 w-[150%] rotate-2 bg-gradient-to-r from-transparent via-indigo-glow/10 to-transparent blur-2xl" />
      <div className="absolute -left-1/4 top-2/3 h-72 w-[150%] -rotate-1 bg-gradient-to-r from-transparent via-moonglow/10 to-transparent blur-2xl" />
      {STARS.map((s) => (
        <span
          key={s.id}
          className="firefly absolute rounded-full bg-parchment"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: 0.5,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

