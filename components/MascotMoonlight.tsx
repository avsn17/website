import React from 'react';

interface MascotProps {
  message?: string;
}

export const MascotMoonlight: React.FC<MascotProps> = ({
  message = "Greetings! Let's cultivate focus under the twilight sky.",
}) => {
  return (
    <div className="relative flex items-center gap-4 bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md p-4 rounded-2xl shadow-2xl max-w-md">
      {/* Soft Glowing Butterfly */}
      <div className="relative flex items-center justify-center w-12 h-12 shrink-0 animate-float-slow">
        <div className="absolute inset-0 rounded-full bg-glow-cyan/25 blur-lg animate-pulse" />
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 text-glow-cyan drop-shadow-[0_0_12px_rgba(153,255,255,0.9)] animate-bounce-subtle"
          fill="currentColor"
        >
          <path d="M12 12C9 6 3 3 2 7c-1 4 4 7 10 5Z" opacity="0.9" />
          <path d="M12 12C9 15 4 19 3 16c-1-3 4-5 9-4Z" opacity="0.7" />
          <path d="M12 12C15 6 21 3 22 7c1 4-4 7-10 5Z" opacity="0.9" />
          <path d="M12 12C15 15 20 19 21 16c1-3-4-5-9-4Z" opacity="0.7" />
        </svg>
      </div>

      {/* Message Text */}
      <div className="flex-1">
        <h4 className="text-xs font-bold uppercase tracking-widest text-glow-cyan">
          Moonlight
        </h4>
        <p className="text-xs text-emerald-100 font-medium leading-relaxed mt-0.5">
          {message}
        </p>
      </div>
    </div>
  );
};
