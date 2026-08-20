import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const record = await prisma.user.findUnique({ where: { id: user.id }, select: { coins: true, ownedItemIds: true } });
  const sessions = await prisma.focusSession.findMany({ where: { userId: user.id }, orderBy: { startedAt: "desc" } });
  return NextResponse.json({ sessions, coins: record?.coins ?? 0, ownedItemIds: record?.ownedItemIds ?? [] });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const targetMinutes = Number(body.targetMinutes);
  const actualMinutes = Number(body.actualMinutes);
  const tag = typeof body.tag === "string" ? body.tag.trim().slice(0, 80) : "Focus";
  if (!Number.isFinite(targetMinutes) || !Number.isFinite(actualMinutes) || targetMinutes <= 0 || actualMinutes <= 0 || actualMinutes > 24 * 60) {
    return NextResponse.json({ error: "Invalid session." }, { status: 400 });
  }
  const coinsEarned = Math.max(1, Math.round(actualMinutes));
  const session = await prisma.$transaction(async (tx) => {
    const created = await tx.focusSession.create({ data: { userId: user.id, targetMinutes, actualMinutes, tag, coinsEarned } });
    await tx.user.update({ where: { id: user.id }, data: { coins: { increment: coinsEarned } } });
    return created;
  });
  return NextResponse.json({ session }, { status: 201 });
}
