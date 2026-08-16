export default function Moonlight({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      className="drift"
      role="img"
      aria-label="Moonlight the Butterfly"
    >
      <defs>
        <radialGradient id="moonlightGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bdf2ff" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#8be8ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8be8ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wingFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="45%" stopColor="#a9ecff" />
          <stop offset="100%" stopColor="#63c9ef" />
        </linearGradient>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="70" cy="70" r="58" fill="url(#moonlightGlow)" />

      <g filter="url(#softGlow)">
        <g className="wing-left">
          <path
            d="M70 54 C46 22, 8 20, 10 52 C11 72, 36 78, 70 62 Z"
            fill="url(#wingFill)"
            opacity="0.92"
          />
          <path
            d="M70 68 C48 66, 16 78, 20 100 C23 116, 48 108, 70 78 Z"
            fill="url(#wingFill)"
            opacity="0.8"
          />
          <path d="M70 58 C54 44, 32 38, 16 46" stroke="#eafcff" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M70 64 C52 62, 30 68, 22 82" stroke="#eafcff" strokeWidth="0.8" fill="none" opacity="0.6" />
          <circle cx="14" cy="50" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="20" cy="60" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="30" cy="68" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="24" cy="90" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="34" cy="100" r="1.6" fill="#eafcff" opacity="0.85" />
        </g>

        <g className="wing-right">
          <path
            d="M70 54 C94 22, 132 20, 130 52 C129 72, 104 78, 70 62 Z"
            fill="url(#wingFill)"
            opacity="0.92"
          />
          <path
            d="M70 68 C92 66, 124 78, 120 100 C117 116, 92 108, 70 78 Z"
            fill="url(#wingFill)"
            opacity="0.8"
          />
          <path d="M70 58 C86 44, 108 38, 124 46" stroke="#eafcff" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M70 64 C88 62, 110 68, 118 82" stroke="#eafcff" strokeWidth="0.8" fill="none" opacity="0.6" />
          <circle cx="126" cy="50" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="120" cy="60" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="110" cy="68" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="116" cy="90" r="1.6" fill="#eafcff" opacity="0.85" />
          <circle cx="106" cy="100" r="1.6" fill="#eafcff" opacity="0.85" />
        </g>
      </g>

      <ellipse cx="70" cy="70" rx="3.2" ry="20" fill="#1c2d4a" opacity="0.9" />
      <circle cx="70" cy="50" r="4.2" fill="#1c2d4a" opacity="0.9" />
      <path
        d="M68 47 C64 41, 58 40, 56 43"
        stroke="#1c2d4a"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M72 47 C76 41, 82 40, 84 43"
        stroke="#1c2d4a"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      <circle cx="40" cy="110" r="1.4" fill="#eafcff" className="firefly" opacity="0.7" />
      <circle cx="100" cy="112" r="1.1" fill="#eafcff" className="firefly" opacity="0.6" style={{ animationDelay: "0.8s" }} />
      <circle cx="70" cy="118" r="1" fill="#eafcff" className="firefly" opacity="0.5" style={{ animationDelay: "1.4s" }} />
    </svg>
  );
}
