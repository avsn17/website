"use client";

import type { GardenState } from "@/lib/store";

export default function HistoryView({ state }: { state: GardenState }) {
  const totalSessions = state.sessions.length;
  const totalMinutes = state.sessions.reduce((s, x) => s + x.actualMinutes, 0);

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">History</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Sessions" value={totalSessions.toString()} />
        <Stat label="Minutes grown" value={Math.round(totalMinutes).toString()} />
        <Stat label="Coins earned" value={state.coins.toString()} />
      </div>

      <div className="glass-panel mt-6 divide-y divide-indigo-deep/40 rounded-2xl">
        {state.sessions.length === 0 && (
          <p className="p-6 text-sm text-muted">
            No sessions yet — start one from The Garden to begin your history.
          </p>
        )}
        {state.sessions.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4 text-sm">
            <div>
              <p className="text-parchment">{s.tag}</p>
              <p className="text-xs text-muted">
                {new Date(s.startedAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-parchment">
                {Math.round(s.actualMinutes)} / {s.targetMinutes} min
              </p>
              <p className="text-xs text-firefly">+{s.coinsEarned} coins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel rounded-xl p-4 text-center">
      <p className="font-display text-2xl text-parchment">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
