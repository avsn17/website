"use client";

import { useState } from "react";
import Nav, { type Tab } from "@/components/Nav";
import GardenView from "@/components/GardenView";
import ShopView from "@/components/ShopView";
import HistoryView from "@/components/HistoryView";
import FeedbackView from "@/components/FeedbackView";
import AdminView from "@/components/AdminView";
import AmbientSky from "@/components/AmbientSky";
import { useGardenStore } from "@/lib/store";

export default function Home() {
  const [tab, setTab] = useState<Tab>("garden");
  const {
    hydrated,
    state,
    totalFocusedMinutes,
    allShopItems,
    logSession,
    purchaseItem,
    addShopItem,
    removeShopItem,
  } = useGardenStore();

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Waking Moonlight up…
      </div>
    );
  }

  return (
    <>
      <AmbientSky />
      <main className="mx-auto min-h-screen max-w-4xl">
        <Nav active={tab} onChange={setTab} coins={state.coins} />

        {tab === "garden" && (
          <GardenView
            state={state}
            totalFocusedMinutes={totalFocusedMinutes}
            onLogSession={logSession}
          />
        )}
        {tab === "shop" && (
          <ShopView state={state} items={allShopItems} onPurchase={purchaseItem} />
        )}
        {tab === "history" && <HistoryView state={state} />}
        {tab === "feedback" && <FeedbackView />}
        {tab === "admin" && (
          <AdminView
            customItems={state.customItems}
            onAdd={addShopItem}
            onRemove={removeShopItem}
          />
        )}
      </main>
    </>
  );
}

