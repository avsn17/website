"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const response = await fetch(
      token ? "/api/auth/reset-password" : "/api/auth/request-password-reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { token, password } : { email }),
      }
    );
    const data = await response.json().catch(() => ({}));

    if (!response.ok) setError(data.error || "Something went wrong.");
    else setMessage(data.message);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#14101f] px-4">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-6">
        <h1 className="font-display text-center text-2xl text-parchment">
          Reset your password
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          {token ? "Choose a new password." : "We will send you a reset link."}
        </p>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          {!token && (
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
            />
          )}
          {token && (
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password (8+ characters)"
              className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
            />
          )}
          {error && <p className="text-xs text-petal">{error}</p>}
          {message && <p className="text-xs text-moonglow">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-moonglow px-5 py-2 text-sm font-semibold text-midnight hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Please wait…" : token ? "Set new password" : "Send reset link"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          <Link href="/signin" className="text-moonglow hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}