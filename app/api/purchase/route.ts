import { NextResponse } from "next/server";
import { BASE_SHOP_ITEMS } from "@/lib/base-shop-items";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const itemId = typeof body.itemId === "string" ? body.itemId : "";
  const base = BASE_SHOP_ITEMS.find((item) => item.id === itemId);
  const custom = base ? null : await prisma.shopItem.findUnique({ where: { id: itemId } });
  const item = base ?? (custom ? { id: custom.id, cost: custom.cost } : null);
  if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });

  try {
    await prisma.$transaction(async (tx) => {
      const userRecord = await tx.user.findUnique({ where: { id: user.id }, select: { coins: true, ownedItemIds: true } });
      if (!userRecord || userRecord.ownedItemIds.includes(item.id)) throw new Error("owned");
      if (userRecord.coins < item.cost) throw new Error("coins");
      await tx.user.update({ where: { id: user.id }, data: { coins: { decrement: item.cost }, ownedItemIds: { push: item.id } } });
    });
  } catch {
    return NextResponse.json({ error: "Purchase unavailable." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
