import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (user.role !== "admin") return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const kind = typeof body.kind === "string" ? body.kind.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const cost = Number(body.cost);
  if (!name || !kind || !Number.isInteger(cost) || cost < 1) return NextResponse.json({ error: "Invalid shop item." }, { status: 400 });
  const item = await prisma.shopItem.create({ data: { name: name.slice(0, 80), kind: kind.slice(0, 30), description: description.slice(0, 240), cost, createdById: user.id } });
  return NextResponse.json({ item }, { status: 201 });
}
