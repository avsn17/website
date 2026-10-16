"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Nav, { type Tab } from "@/components/Nav";
import AmbientSky from "@/components/AmbientSky";
import GardenView from "@/components/GardenView";
import ShopView from "@/components/ShopView";
import HistoryView from "@/components/HistoryView";
import FriendsView from "@/components/FriendsView";
import GroupsView from "@/components/GroupsView";
import FeedbackView from "@/components/FeedbackView";
import AdminView from "@/components/AdminView";
import { useGardenStore } from "@/lib/store";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("garden");
  const store = useGardenStore();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [router, status]);

  if (status !== "authenticated" || !store.hydrated) return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-twilight px-6 text-center">
      <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-firefly/10 blur-3xl" />
      <div className="relative flex max-w-xs flex-col items-center gap-4">
        <span className="firefly h-3 w-3 rounded-full bg-firefly shadow-fireflyGlow" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-firefly">Finding your garden</p>
        <p className="font-display text-2xl text-parchment">A little light is on its way.</p>
        <p className="text-sm leading-6 text-muted">Your space is private by default and ready when you are.</p>
      </div>
    </main>
  );

  const customItems = store.allShopItems.filter((item) => item.custom);
  return (
    <>
      <AmbientSky />
      <main className="mx-auto min-h-screen max-w-6xl pb-16">
        <Nav active={tab} onChange={setTab} coins={store.state.coins} userEmail={store.userEmail} isAdmin={store.isAdmin} />
        {tab === "garden" && <GardenView state={store.state} totalFocusedMinutes={store.totalFocusedMinutes} onLogSession={store.logSession} />}
        {tab === "shop" && <ShopView state={store.state} items={store.allShopItems} onPurchase={store.purchaseItem} />}
        {tab === "history" && <HistoryView state={store.state} />}
        {tab === "friends" && <FriendsView />}
        {tab === "groups" && <GroupsView />}
        {tab === "feedback" && <FeedbackView />}
        {tab === "admin" && <AdminView isAdmin={store.isAdmin} customItems={customItems} onAdd={(item) => store.addShopItem({ name: item.name, cost: item.cost, kind: item.kind, description: item.description })} onRemove={store.removeShopItem} />}
      </main>
    </>
  );
}
