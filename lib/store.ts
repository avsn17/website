"use client";

import { useCallback, useEffect, useState } from "react";

export type FocusSession = {
  id: string;
  startedAt: string; // ISO
  targetMinutes: number;
  actualMinutes: number; // proportional — never punished for stopping early
  tag: string;
  coinsEarned: number;
};

export type ShopItem = {
  id: string;
  name: string;
  cost: number;
  kind: "plant" | "backdrop" | "companion";
  description: string;
};

export type GardenState = {
  sessions: FocusSession[];
  coins: number;
  ownedItems: string[];
  customItems: ShopItem[]; // admin-added items (client-side only, see AdminView)
};

const STORAGE_KEY = "mystical-gardens:v1";

// Client-side-only admin allowlist. This is a convenience gate, NOT real
// security — anyone reading the bundle can see this address. Before launch,
// replace with the backend `role` check on the user model described in the
// master overview (§3): enforce on the server, on every admin route.
export const ADMIN_EMAILS = ["avasingueneser1@gmail.com"];

const DEFAULT_STATE: GardenState = {
  sessions: [],
  coins: 0,
  ownedItems: [],
  customItems: [],
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "glow-mushroom",
    name: "Glow Mushroom Patch",
    cost: 40,
    kind: "plant",
    description: "A cluster of soft-lit mushrooms that line your garden path.",
  },
  {
    id: "firefly-swarm",
    name: "Firefly Swarm",
    cost: 60,
    kind: "companion",
    description: "A handful of fireflies that drift near Moonlight at dusk.",
  },
  {
    id: "moonvine",
    name: "Moonvine Trellis",
    cost: 90,
    kind: "plant",
    description: "Pale, night-blooming vines that climb as you keep focusing.",
  },
  {
    id: "lantern-path",
    name: "Lantern-lit Path",
    cost: 120,
    kind: "backdrop",
    description: "Warm lantern light along the garden's edge.",
  },
];

// 1 coin per completed focus minute — proportional, no loss mechanic.
// This mirrors the "flexible" core-mechanic decision: stopping early still
// banks whatever was earned so far.
const COINS_PER_MINUTE = 1;

function loadState(): GardenState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: GardenState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useGardenStore() {
  const [state, setState] = useState<GardenState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const totalFocusedMinutes = state.sessions.reduce(
    (sum, s) => sum + s.actualMinutes,
    0
  );

  const allShopItems = [...SHOP_ITEMS, ...state.customItems];

  const logSession = useCallback(
    (targetMinutes: number, actualMinutes: number, tag: string) => {
      const roundedMinutes = Math.max(0, Math.round(actualMinutes * 10) / 10);
      const coinsEarned = Math.round(roundedMinutes * COINS_PER_MINUTE);
      const session: FocusSession = {
        id: crypto.randomUUID(),
        startedAt: new Date().toISOString(),
        targetMinutes,
        actualMinutes: roundedMinutes,
        tag,
        coinsEarned,
      };
      setState((prev) => ({
        ...prev,
        sessions: [session, ...prev.sessions],
        coins: prev.coins + coinsEarned,
      }));
      return session;
    },
    []
  );

  const purchaseItem = useCallback((itemId: string) => {
    setState((prev) => {
      const item = [...SHOP_ITEMS, ...prev.customItems].find(
        (i) => i.id === itemId
      );
      if (!item) return prev;
      if (prev.ownedItems.includes(itemId)) return prev;
      if (prev.coins < item.cost) return prev;
      return {
        ...prev,
        coins: prev.coins - item.cost,
        ownedItems: [...prev.ownedItems, itemId],
      };
    });
  }, []);

  const addShopItem = useCallback((item: Omit<ShopItem, "id">) => {
    setState((prev) => ({
      ...prev,
      customItems: [
        ...prev.customItems,
        { ...item, id: `custom-${crypto.randomUUID()}` },
      ],
    }));
  }, []);

  const removeShopItem = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      customItems: prev.customItems.filter((i) => i.id !== itemId),
    }));
  }, []);

  const resetGarden = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    hydrated,
    state,
    totalFocusedMinutes,
    allShopItems,
    logSession,
    purchaseItem,
    addShopItem,
    removeShopItem,
    resetGarden,
  };
}

