"use client";

import { useState } from "react";
import { ADMIN_EMAILS, type ShopItem } from "@/lib/store";

export default function AdminView({
  customItems,
  onAdd,
  onRemove,
}: {
  customItems: ShopItem[];
  onAdd: (item: Omit<ShopItem, "id">) => void;
  onRemove: (id: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [cost, setCost] = useState(50);
  const [kind, setKind] = useState<ShopItem["kind"]>("plant");
  const [description, setDescription] = useState("");

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      setUnlocked(true);
      setError("");
    } else {
      setError("That email doesn't have admin access.");
    }
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || cost <= 0) return;
    onAdd({ name: name.trim(), cost, kind, description: description.trim() });
    setName("");
    setCost(50);
    setDescription("");
  }

  if (!unlocked) {
    return (
      <div className="px-6 py-8">
        <h2 className="font-display text-2xl text-parchment">Admin</h2>
        <p className="mt-1 max-w-md text-sm text-muted">
          Feature and shop-item management is restricted. Enter the admin
          account email to continue.
        </p>
        <form
          onSubmit={handleUnlock}
          className="glass-panel mt-6 flex max-w-sm flex-col gap-3 rounded-2xl p-5"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-indigo-deep bg-midnight px-3 py-2 text-sm text-parchment placeholder:text-muted"
          />
          {error && <p className="text-xs text-petal">{error}</p>}
          <button
            type="submit"
            className="self-start rounded-full bg-moonglow px-5 py-2 text-sm font-semibold text-midnight hover:brightness-110"
          >
            Unlock admin
          </button>
        </form>
        <p className="mt-4 max-w-md text-xs text-muted">
          Note: this is a client-side convenience lock for the current
          front-end-only build — anyone can read the allowed address in the
          shipped code. Before launch, replace this with the backend{" "}
          <code>role</code> check described in the master overview (§3),
          enforced on the server for every admin route.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">Admin</h2>
      <p className="mt-1 text-sm text-muted">
        Signed in as an admin account. Add or remove shop items below.
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
            onChange={(e) => setKind(e.target.value as ShopItem["kind"])}
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
              <div
                key={item.id}
                className="flex items-center justify-between p-3 text-sm"
              >
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

