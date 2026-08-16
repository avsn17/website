import React from 'react';
import { MascotMoonlight } from '@/components/MascotMoonlight';
import { GnomeMascot } from '@/components/GnomeMascot';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#1b3227] via-[#244534] to-[#15271f] flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* Floating Ambient Firefly Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-glow-cyan blur-[2px] animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-glow-halo blur-[3px] animate-ping" />
        <div className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-yellow-200 blur-[1px] animate-pulse" />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-emerald-300 blur-[2px] animate-pulse" />
      </div>

      {/* Header Title */}
      <header className="z-10 text-center mt-2">
        <h1 className="text-3xl font-serif font-bold text-emerald-100 tracking-wider drop-shadow-md">
          Mystical Gardens
        </h1>
        <p className="text-xs text-emerald-300/80 font-medium mt-1">
          Cultivate focus under the twilight sky
        </p>
      </header>

      {/* Main Illustration Scene */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center justify-center my-6 gap-6">
        {/* Gnome & Magic Flower Base */}
        <div className="flex items-end justify-center gap-8 w-full">
          <GnomeMascot />

          {/* Glowing Magic Flower */}
          <div className="flex flex-col items-center pb-2">
            <div className="relative w-4 h-4 rounded-full bg-glow-cyan shadow-butterfly-glow animate-pulse mb-1">
              <div className="absolute inset-0 rounded-full bg-purple-400 blur-sm opacity-60" />
            </div>
            <div className="w-1.5 h-10 bg-gradient-to-b from-emerald-600 to-emerald-900 rounded-full" />
            <div className="w-8 h-2 bg-garden-dirt/80 rounded-full -mt-1 blur-[1px]" />
          </div>
        </div>

        {/* Mascot Speech Bubble */}
        <MascotMoonlight message="Greetings! Let's cultivate focus under the twilight sky." />
      </div>

      {/* Bottom Floating Navigation Pill */}
      <nav className="z-10 w-full max-w-sm bg-emerald-950/70 backdrop-blur-md border border-emerald-700/50 rounded-full py-3 px-6 flex justify-around text-xs font-semibold text-emerald-200 shadow-xl">
        <button className="hover:text-glow-cyan transition-colors">GARDEN</button>
        <button className="hover:text-glow-cyan transition-colors">SHOP</button>
        <button className="hover:text-glow-cyan transition-colors">HISTORY</button>
      </nav>
    </main>
  );
}
