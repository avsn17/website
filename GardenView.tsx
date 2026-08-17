"use client";

import { useEffect, useRef, useState } from "react";
import GardenPlot from "./GardenPlot";
import type { GardenState } from "@/lib/store";

const TAGS = ["Study", "Deep work", "Reading", "Chores", "Creative"];
const PRESETS = [15, 25, 45, 60];

export default function GardenView({
  state,
  totalFocusedMinutes,
  onLogSession,
}: {
  state: GardenState;
  totalFocusedMinutes: number;
  onLogSession: (target: number, actual: number, tag: string) => void | Promise<void>;
}) {
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [tag, setTag] = useState(TAGS[0]);
  const [running, setRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (elapsedSeconds >= targetMinutes * 60 && running) {
      finishSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedSeconds]);

  function start() {
    setElapsedSeconds(0);
    setRunning(true);
  }

  function finishSession() {
    const actualMinutes = elapsedSeconds / 60;
    setRunning(false);
    onLogSession(targetMinutes, actualMinutes, tag);
    setElapsedSeconds(0);
  }

  const progress = Math.min(1, elapsedSeconds / (targetMinutes * 60));
  const mm = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const ss = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col gap-8 px-6 py-8">
      <div className="flex flex-col items-center gap-4">
        <GardenPlot
          totalMinutes={totalFocusedMinutes}
          ownedItems={state.ownedItems}
          liveProgress={running ? progress : 0}
        />
        <p className="font-display text-lg text-muted">
          {Math.round(totalFocusedMinutes)} minutes of focus grown so far
        </p>
      </div>

      <div className="glass-panel mx-auto flex w-full max-w-md flex-col items-center gap-5 rounded-2xl p-6">
        {!running ? (
          <>
            <div className="flex flex-wrap justify-center gap-2">
              {PRESETS.map((m) => (
                <button
                  key={m}
                  onClick={() => setTargetMinutes(m)}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    targetMinutes === m
                      ? "bg-moonglow text-midnight"
                      : "bg-indigo-deep/60 text-muted hover:text-parchment"
                  }`}
                >
                  {m} min
                </button>
              ))}
            </div>

            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment"
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button
              onClick={start}
              className="w-full rounded-full bg-moonglow px-6 py-3 font-display text-lg font-semibold text-midnight shadow-glow transition hover:brightness-110"
            >
              Start focus session
            </button>
          </>
        ) : (
          <>
            <p className="font-display text-5xl font-semibold text-parchment">
              {mm}:{ss}
            </p>
            <p className="text-sm text-muted">
              growing · {tag} · target {targetMinutes} min
            </p>
            <p className="text-center text-xs text-muted">
              Leaving early still keeps whatever you've grown — no plant ever
              dies here.
            </p>
            <button
              onClick={finishSession}
              className="w-full rounded-full bg-plum px-6 py-3 text-sm text-parchment ring-1 ring-indigo-deep transition hover:ring-moonglow"
            >
              End session &amp; keep growth
            </button>
          </>
        )}
      </div>
    </div>
  );
}
