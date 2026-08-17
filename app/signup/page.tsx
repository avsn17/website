"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Moonlight from "@/components/Moonlight";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (signInRes?.error) {
      setError("Account created — please sign in.");
      router.push("/signin");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#14101f] px-4">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-6">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <Moonlight size={56} />
          <h1 className="font-display text-2xl text-parchment">
            Plant your first seed
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
          />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (8+ characters)"
            className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
          />
          {error && <p className="text-xs text-petal">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-moonglow px-5 py-2 text-sm font-semibold text-midnight hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Already have one?{" "}
          <Link href="/signin" className="text-moonglow hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
