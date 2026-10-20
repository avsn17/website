"use client";

import { useEffect, useRef, useState } from "react";
import GardenPlot from "./GardenPlot";
import Gnome from "./Gnome";
import Moonlight from "./Moonlight";
import type { GardenState } from "@/lib/store";

const TAGS = ["Study", "Deep work", "Reading", "Chores", "Creative"];
const PRESETS = [15, 25, 45, 60];
const VIDEO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firefly_Veo_Firefly%20video%202025-12-05%2010-39%20275787%20nNU-HvjQuJ5PQzKFgwpfWkAs135iEdeQsg.mp4";

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
  const [videoUnavailable, setVideoUnavailable] = useState(false);
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
    <div className="garden-rise flex flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 text-center">
        <div className="mx-auto flex items-center gap-2 rounded-full border border-firefly/20 bg-firefly/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-firefly">
          <span className="h-1.5 w-1.5 rounded-full bg-firefly shadow-fireflyGlow" /> Chapter one · The first light
        </div>
        <h2 className="font-display text-4xl font-semibold leading-tight text-parchment sm:text-5xl">A little light can change the whole night.</h2>
        <p className="mx-auto max-w-xl text-sm leading-6 text-muted">Your focus is the spark. Every calm minute helps the Firefly find its way home.</p>
        <div className="mx-auto mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-glow">
          <span className="rounded-full border border-indigo-glow/20 bg-indigo-glow/10 px-3 py-1">Forest level {Math.max(1, Math.floor(totalFocusedMinutes / 60) + 1)}</span>
          <span className="rounded-full border border-moonglow/20 bg-moonglow/10 px-3 py-1 text-moonglow">{Math.round(totalFocusedMinutes)} moon minutes</span>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div className="order-first flex items-center justify-center gap-3 rounded-3xl border border-firefly/15 bg-plum/40 px-4 py-2 lg:col-span-2 lg:justify-start">
          <Gnome size={68} />
          <div className="text-left"><p className="font-display text-lg text-parchment">Welcome, keeper.</p><p className="text-xs text-muted">I&apos;ve unlocked the path. Moonlight will guide your first bloom.</p></div>
          <div className="ml-auto hidden sm:block"><Moonlight size={58} /></div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl">
          {videoUnavailable ? (
            <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-indigo-deep/40 px-6 text-center">
              <p className="font-display text-xl text-parchment">The spark is resting.</p>
              <p className="max-w-xs text-xs leading-5 text-muted">The story video could not load in this browser. Your focus garden still works without sharing any data.</p>
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-firefly/40 px-4 py-2 text-xs font-semibold text-firefly transition hover:bg-firefly/10"
              >
                Open story video
              </a>
            </div>
          ) : (
            <video
              className="aspect-video w-full object-cover"
              controls
              preload="none"
              playsInline
              aria-label="The Firefly story begins"
              onError={() => setVideoUnavailable(true)}
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          )}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-muted">
            <span>{videoUnavailable ? "Story link available" : "Watch the spark arrive"}</span>
            <span className="text-firefly">A private moment</span>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-5 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-moonglow">Tonight&apos;s quest</p>
          <div className="space-y-4">
            {["Choose one small intention", "Stay with it while the firefly glows", "Return with a little more light"].map((step, index) => (
              <div key={step} className="quest-card flex items-start gap-3 rounded-2xl border border-transparent p-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-firefly/30 bg-firefly/10 text-xs font-semibold text-firefly">0{index + 1}</span>
                <p className="pt-1 text-sm text-parchment">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-indigo-glow/15 bg-indigo-glow/5 p-3 text-xs text-muted">
            <div className="mb-2 flex items-center justify-between"><span>Tonight&apos;s bloom</span><span className="text-moonglow">{Math.min(100, Math.round((totalFocusedMinutes % 60) / 60 * 100))}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-midnight"><div className="h-full rounded-full bg-gradient-to-r from-indigo-glow to-moonglow transition-all" style={{ width: `${Math.min(100, Math.round((totalFocusedMinutes % 60) / 60 * 100))}%` }} /></div>
          </div>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-muted">No profiles, public scores, or tracking are needed to grow here. Your garden stays yours.</p>
        </div>
      </div>
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
