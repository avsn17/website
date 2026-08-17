"use client";

import { useEffect, useState } from "react";

type Member = { id: string; email: string };
type Group = { id: string; name: string; joinCode: string; members: Member[] };

export default function GroupsView() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/groups");
    if (res.ok) setGroups((await res.json()).groups);
  }

  useEffect(() => {
    load();
  }, []);

  async function createGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });
    if (res.ok) {
      setName("");
      load();
    }
  }

  async function joinGroup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/groups/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joinCode: code }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Couldn't join that group.");
      return;
    }
    setCode("");
    load();
  }

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">Groups</h2>
      <p className="mt-1 max-w-md text-sm text-muted">
        In-app groups with a shareable join code — Discord is optional, not
        required. (Shared/collective gardens for groups aren&apos;t built
        yet — this is membership only for now.)
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <form onSubmit={createGroup} className="glass-panel flex flex-1 gap-2 rounded-2xl p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New group name"
            className="flex-1 rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
          />
          <button className="rounded-full bg-moonglow px-4 py-2 text-sm font-semibold text-midnight hover:brightness-110">
            Create
          </button>
        </form>

        <form onSubmit={joinGroup} className="glass-panel flex flex-1 gap-2 rounded-2xl p-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Join code"
            className="flex-1 rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm uppercase text-parchment placeholder:text-muted placeholder:normal-case"
          />
          <button className="rounded-full bg-plum px-4 py-2 text-sm text-parchment ring-1 ring-indigo-deep hover:ring-moonglow">
            Join
          </button>
        </form>
      </div>
      {message && <p className="mt-2 text-xs text-petal">{message}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.id} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-parchment">{g.name}</h3>
              <span className="rounded-full bg-plum/60 px-2 py-0.5 text-xs text-firefly">
                {g.joinCode}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              {g.members.length} member{g.members.length === 1 ? "" : "s"}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-parchment">
              {g.members.map((m) => (
                <li key={m.id}>{m.email}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
