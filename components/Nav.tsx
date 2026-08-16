"use client";

import Moonlight from "./Moonlight";

export type Tab = "garden" | "shop" | "history" | "feedback" | "admin";

const TABS: { id: Tab; label: string }[] = [
  { id: "garden", label: "The Garden" },
  { id: "shop", label: "The Shop" },
  { id: "history", label: "History" },
  { id: "feedback", label: "Feedback" },
  { id: "admin", label: "Admin" },
];

export default function Nav({
  active,
  onChange,
  coins,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
  coins: number;
}) {
  return (
    <header className="glass-panel sticky top-0 z-10 flex flex-col gap-4 border-x-0 border-t-0 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Moonlight size={44} />
        <div>
          <h1 className="font-display text-2xl font-semibold text-parchment">
            Mystical Gardens
          </h1>
          <p className="text-xs text-muted">guided by Moonlight the Butterfly</p>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              active === tab.id
                ? "bg-indigo-glow text-parchment shadow-glow"
                : "bg-plum/60 text-muted hover:text-parchment"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-2 flex items-center gap-1 rounded-full bg-plum/60 px-3 py-1.5 text-sm text-firefly shadow-fireflyGlow">
          ✦ {coins}
        </span>
      </nav>
    </header>
  );
}

