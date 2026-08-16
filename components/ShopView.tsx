"use client";

import type { GardenState, ShopItem } from "@/lib/store";

export default function ShopView({
  state,
  items,
  onPurchase,
}: {
  state: GardenState;
  items: ShopItem[];
  onPurchase: (id: string) => void;
}) {
  return (
    <div className="px-6 py-8">
      <h2 className="font-display text-2xl text-parchment">The Shop</h2>
      <p className="mt-1 text-sm text-muted">
        Spend coins earned from focus sessions on new companions for your garden.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const owned = state.ownedItems.includes(item.id);
          const affordable = state.coins >= item.cost;
          return (
            <div
              key={item.id}
              className="glass-panel flex flex-col justify-between rounded-2xl p-5 transition hover:border-moonglow/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-parchment">
                    {item.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {item.kind}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-firefly">✦ {item.cost}</span>
                <button
                  disabled={owned || !affordable}
                  onClick={() => onPurchase(item.id)}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    owned
                      ? "bg-moss-deep text-muted"
                      : affordable
                      ? "bg-moonglow text-midnight hover:brightness-110"
                      : "bg-indigo-deep/40 text-muted"
                  }`}
                >
                  {owned ? "In your garden" : affordable ? "Plant it" : "Not enough yet"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

