"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import Moonlight from "./Moonlight";

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="glass-panel sticky top-0 z-10 flex flex-col gap-4 border-x-0 border-t-0 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Moonlight size={44} />
        <div>
          <h1 className="font-display text-2xl font-semibold text-parchment">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className="rounded-full bg-plum/60 px-4 py-1.5 text-sm text-muted transition hover:text-parchment"
        >
          Back to Garden
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="rounded-full bg-plum/60 px-3 py-1.5 text-xs text-muted hover:text-parchment"
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}
