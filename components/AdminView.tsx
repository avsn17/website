"use client";

import React from 'react';

interface AdminConfig {
  mascotMessage: string;
  glowIntensity: 'low' | 'medium' | 'high';
  themePreset: 'twilight' | 'midnight' | 'emerald';
  showGnome: boolean;
  showSparkles: boolean;
}

interface AdminViewProps {
  config: AdminConfig;
  onChange: (newConfig: AdminConfig) => void;
  onClose: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ config, onChange, onClose }) => {
  return (
    <div className="w-full max-w-lg bg-emerald-950/90 border border-emerald-500/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-emerald-100 space-y-6 animate-fadeIn">
      {/* Admin Header */}
      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-glow-cyan tracking-wide">
            ⚙️ Admin Control Panel
          </h2>
          <p className="text-xs text-emerald-300/70">Customize garden appearance and mascot parameters</p>
        </div>
        <button
          onClick={onClose}
          className="text-xs bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-600/40 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Mascot Message Customizer */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Moonlight's Speech Message
        </label>
        <textarea
          value={config.mascotMessage}
          onChange={(e) => onChange({ ...config, mascotMessage: e.target.value })}
          rows={3}
          className="w-full bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-3 text-xs text-emerald-100 placeholder-emerald-500 focus:outline-none focus:border-glow-cyan transition-colors resize-none"
          placeholder="Enter custom mascot message..."
        />
      </div>

      {/* Theme Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Garden Theme Preset
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['twilight', 'emerald', 'midnight'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => onChange({ ...config, themePreset: preset })}
              className={`py-2 px-3 text-xs rounded-xl border capitalize font-medium transition-all ${
                config.themePreset === preset
                  ? 'bg-glow-cyan/20 border-glow-cyan text-glow-cyan shadow-sm'
                  : 'bg-emerald-900/40 border-emerald-800 text-emerald-300 hover:border-emerald-700'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Glow Intensity Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Butterfly Glow Intensity
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onChange({ ...config, glowIntensity: level })}
              className={`py-2 px-3 text-xs rounded-xl border capitalize font-medium transition-all ${
                config.glowIntensity === level
                  ? 'bg-glow-cyan/20 border-glow-cyan text-glow-cyan'
                  : 'bg-emerald-900/40 border-emerald-800 text-emerald-300 hover:border-emerald-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-emerald-800/80">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-emerald-200">Display Gnome Keeper</span>
          <input
            type="checkbox"
            checked={config.showGnome}
            onChange={(e) => onChange({ ...config, showGnome: e.target.checked })}
            className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-emerald-200">Ambient Firefly Particles</span>
          <input
            type="checkbox"
            checked={config.showSparkles}
            onChange={(e) => onChange({ ...config, showSparkles: e.target.checked })}
            className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
