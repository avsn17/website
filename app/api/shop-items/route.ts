import { NextResponse } from "next/server";
import { BASE_SHOP_ITEMS } from "@/lib/base-shop-items";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const custom = await prisma.shopItem.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ items: [...BASE_SHOP_ITEMS, ...custom.map((item) => ({ ...item, custom: true }))] });
}
