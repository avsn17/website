"use client";

import { useState } from "react";

export default function FeedbackView() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (res.ok) {
      setSent(true);
      setMessage("");
    }
  }

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">Feedback</h2>
      <p className="mt-1 text-sm text-muted">
        A direct line to the people building Mystical Gardens.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glass-panel mt-6 flex max-w-lg flex-col gap-3 rounded-2xl p-5"
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="What's working, what isn't, what you'd love to see..."
          className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
        />
        <button
          type="submit"
          className="self-start rounded-full bg-moonglow px-5 py-2 text-sm font-semibold text-midnight hover:brightness-110"
        >
          Send feedback
        </button>
        {sent && (
          <p className="text-xs text-firefly">
            Thanks — your feedback was received.
          </p>
        )}
      </form>
    </div>
  );
}
