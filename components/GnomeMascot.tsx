import React from 'react';

export const GnomeMascot: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Gnome Vector Mascot */}
      <div className="relative w-28 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
          {/* Pointy Hat */}
          <path d="M 50 10 Q 20 50 30 65 L 70 65 Q 80 50 50 10 Z" fill="#c04a43" />
          {/* Hat Stars/Patterns */}
          <circle cx="45" cy="35" r="2" fill="#fef08a" opacity="0.8" />
          <circle cx="58" cy="48" r="2.5" fill="#fef08a" opacity="0.8" />
          {/* Face & Nose */}
          <ellipse cx="50" cy="70" rx="14" ry="10" fill="#fde047" opacity="0.2" />
          <circle cx="50" cy="68" r="7" fill="#f87171" />
          {/* Fluffy Beard */}
          <path d="M 32 68 Q 20 85 50 105 Q 80 85 68 68 Q 50 82 32 68 Z" fill="#f1f5f9" />
          {/* Tunic Coat */}
          <path d="M 32 88 Q 30 115 50 115 Q 70 115 68 88 Z" fill="#3d785a" />
          {/* Belt */}
          <rect x="36" y="94" width="28" height="4" fill="#1e293b" rx="1" />
          <rect x="47" y="93" width="6" height="6" fill="#fbbf24" rx="1" />
        </svg>
      </div>
      {/* Small Spade Tool Accent */}
      <div className="text-[10px] font-bold tracking-wider text-emerald-200/80 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/40 -mt-2 shadow-sm">
        GARDEN KEEPER
      </div>
    </div>
  );
};
