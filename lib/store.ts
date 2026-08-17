"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type FocusSession = {
  id: string;
  startedAt: string;
  targetMinutes: number;
  actualMinutes: number;
  tag: string;
  coinsEarned: number;
};

export type ShopItem = {
  id: string;
  name: string;
  cost: number;
  kind: "plant" | "backdrop" | "companion" | string;
  description: string;
  custom: boolean;
};

export type GardenState = {
  sessions: FocusSession[];
  coins: number;
  ownedItems: string[];
};

const EMPTY_STATE: GardenState = { sessions: [], coins: 0, ownedItems: [] };

// Remote, per-account version of the garden store — replaces the earlier
// localStorage-only implementation now that real accounts exist. All
// reads/writes go through API routes backed by Postgres via Prisma;
// coin balances and purchases are validated server-side.
export function useGardenStore() {
  const { data: authSession, status } = useSession();
  const [state, setState] = useState<GardenState>(EMPTY_STATE);
  const [allShopItems, setAllShopItems] = useState<ShopItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") return;
    const [sessionsRes, itemsRes] = await Promise.all([
      fetch("/api/sessions"),
      fetch("/api/shop-items"),
    ]);
    if (sessionsRes.ok) {
      const data = await sessionsRes.json();
      setState({
        sessions: data.sessions,
        coins: data.coins,
        ownedItems: data.ownedItemIds,
      });
    }
    if (itemsRes.ok) {
      const data = await itemsRes.json();
      setAllShopItems(data.items);
    }
    setHydrated(true);
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      refresh();
    } else if (status === "unauthenticated") {
      setState(EMPTY_STATE);
      setHydrated(true);
    }
  }, [status, refresh]);

  const totalFocusedMinutes = state.sessions.reduce(
    (sum, s) => sum + s.actualMinutes,
    0
  );

  const logSession = useCallback(
    async (targetMinutes: number, actualMinutes: number, tag: string) => {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetMinutes, actualMinutes, tag }),
      });
      if (res.ok) await refresh();
    },
    [refresh]
  );

  const purchaseItem = useCallback(
    async (itemId: string) => {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (res.ok) await refresh();
      return res.ok;
    },
    [refresh]
  );

  const addShopItem = useCallback(
    async (item: { name: string; cost: number; kind: string; description: string }) => {
      const res = await fetch("/api/admin/shop-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (res.ok) await refresh();
      return res.ok;
    },
    [refresh]
  );

  const removeShopItem = useCallback(
    async (itemId: string) => {
      const res = await fetch(`/api/admin/shop-items/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) await refresh();
      return res.ok;
    },
    [refresh]
  );

  return {
    hydrated,
    isAuthenticated: status === "authenticated",
    userEmail: authSession?.user?.email ?? null,
    isAdmin: (authSession?.user as any)?.role === "admin",
    state,
    totalFocusedMinutes,
    allShopItems,
    logSession,
    purchaseItem,
    addShopItem,
    removeShopItem,
    refresh,
  };
}
