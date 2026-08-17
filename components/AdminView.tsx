"use client";

import { useState } from "react";
import type { ShopItem } from "@/lib/store";

export default function AdminView({
  isAdmin,
  customItems,
  onAdd,
  onRemove,
}: {
  isAdmin: boolean;
  customItems: ShopItem[];
  onAdd: (item: { name: string; cost: number; kind: string; description: string }) => Promise<boolean>;
  onRemove: (id: string) => Promise<boolean>;
}) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(50);
  const [kind, setKind] = useState<"plant" | "companion" | "backdrop">("plant");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Reachable client-side by anyone, but every request this view makes is
  // re-checked server-side (middleware.ts on /api/admin/*), so a non-admin
  // poking around here still can't actually add or remove items.
  if (!isAdmin) {
    return (
      <div className="px-6 py-8">
        <h2 className="font-display text-2xl text-parchment">Admin</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          This account doesn&apos;t have admin access. If you believe it
          should, sign in with the admin account.
        </p>
      </div>
    );
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !description.trim() || cost <= 0) return;
    const ok = await onAdd({ name: name.trim(), cost, kind, description: description.trim() });
    if (!ok) {
      setError("Couldn't add that item.");
      return;
    }
    setName("");
    setCost(50);
    setDescription("");
  }

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">Admin</h2>
      <p className="mt-1 text-sm text-muted">
        Add or remove shop items. This is enforced server-side — the role
        check lives on the account, not in this page.
      </p>

      <form
        onSubmit={handleAdd}
        className="glass-panel mt-6 grid max-w-lg gap-3 rounded-2xl p-5"
      >
        <h3 className="font-display text-lg text-parchment">Add a shop item</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
        />
        <div className="flex gap-3">
          <input
            type="number"
            min={1}
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-28 rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment"
          />
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
            className="flex-1 rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment"
          >
            <option value="plant">plant</option>
            <option value="companion">companion</option>
            <option value="backdrop">backdrop</option>
          </select>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Short description shown in the shop"
          className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
        />
        {error && <p className="text-xs text-petal">{error}</p>}
        <button
          type="submit"
          className="self-start rounded-full bg-moonglow px-5 py-2 text-sm font-semibold text-midnight hover:brightness-110"
        >
          Add to shop
        </button>
      </form>

      <div className="mt-6 max-w-lg">
        <h3 className="font-display text-lg text-parchment">
          Admin-added items
        </h3>
        {customItems.length === 0 ? (
          <p className="mt-2 text-sm text-muted">None yet.</p>
        ) : (
          <div className="mt-2 divide-y divide-indigo-deep/40 rounded-2xl border border-indigo-deep/60">
            {customItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 text-sm">
                <div>
                  <p className="text-parchment">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.kind} · ✦ {item.cost}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="rounded-full bg-plum px-3 py-1 text-xs text-petal ring-1 ring-indigo-deep hover:ring-petal"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
