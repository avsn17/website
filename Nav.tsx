"use client";

import { signOut } from "next-auth/react";
import Moonlight from "./Moonlight";

export type Tab = "garden" | "shop" | "history" | "friends" | "groups" | "feedback" | "admin";

export default function Nav({
  active,
  onChange,
  coins,
  userEmail,
  isAdmin,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
  coins: number;
  userEmail: string | null;
  isAdmin: boolean;
}) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "garden", label: "The Garden" },
    { id: "shop", label: "The Shop" },
    { id: "history", label: "History" },
    { id: "friends", label: "Friends" },
    { id: "groups", label: "Groups" },
    { id: "feedback", label: "Feedback" },
    ...(isAdmin ? [{ id: "admin" as Tab, label: "Admin" }] : []),
  ];

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
        {tabs.map((tab) => (
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
        {userEmail && (
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="rounded-full bg-plum/60 px-3 py-1.5 text-xs text-muted hover:text-parchment"
            title={userEmail}
          >
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
}
