"use client";

import { useEffect, useState } from "react";

type Person = { id: string; email: string };
type Req = { id: string; sender?: Person; receiver?: Person };

export default function FriendsView() {
  const [friends, setFriends] = useState<Person[]>([]);
  const [incoming, setIncoming] = useState<Req[]>([]);
  const [outgoing, setOutgoing] = useState<Req[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/friends");
    if (res.ok) {
      const data = await res.json();
      setFriends(data.friends);
      setIncoming(data.incoming);
      setOutgoing(data.outgoing);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function sendRequest(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Couldn't send that request.");
      return;
    }
    setEmail("");
    setMessage("Request sent.");
    load();
  }

  async function respond(requestId: string, accept: boolean) {
    await fetch("/api/friends/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, accept }),
    });
    load();
  }

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">Friends</h2>
      <p className="mt-1 text-sm text-muted">
        Add friends in-app by email — no Discord required.
      </p>

      <form onSubmit={sendRequest} className="glass-panel mt-6 flex max-w-md gap-2 rounded-2xl p-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="friend@example.com"
          className="flex-1 rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
        />
        <button className="rounded-full bg-moonglow px-4 py-2 text-sm font-semibold text-midnight hover:brightness-110">
          Add
        </button>
      </form>
      {message && <p className="mt-2 text-xs text-muted">{message}</p>}

      {incoming.length > 0 && (
        <div className="mt-6 max-w-md">
          <h3 className="font-display text-lg text-parchment">Requests</h3>
          <div className="mt-2 divide-y divide-indigo-deep/40 rounded-2xl border border-indigo-deep/60">
            {incoming.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 text-sm">
                <span className="text-parchment">{r.sender?.email}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => respond(r.id, true)}
                    className="rounded-full bg-moonglow px-3 py-1 text-xs font-semibold text-midnight"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respond(r.id, false)}
                    className="rounded-full bg-plum px-3 py-1 text-xs text-petal ring-1 ring-indigo-deep"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 max-w-md">
        <h3 className="font-display text-lg text-parchment">Your friends</h3>
        {friends.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No friends yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-parchment">
            {friends.map((f) => (
              <li key={f.id} className="glass-panel rounded-lg px-3 py-2">
                {f.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      {outgoing.length > 0 && (
        <div className="mt-6 max-w-md">
          <h3 className="font-display text-lg text-parchment">Pending (sent)</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {outgoing.map((r) => (
              <li key={r.id}>{r.receiver?.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
