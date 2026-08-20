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

  if (status !== "authenticated" || !store.hydrated) return <main className="flex min-h-screen items-center justify-center text-muted">Loading your garden…</main>;

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
