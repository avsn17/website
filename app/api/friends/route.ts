import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const [a, b, incoming, outgoing] = await Promise.all([
    prisma.friendship.findMany({ where: { userAId: user.id }, include: { userB: { select: { id: true, email: true } } } }),
    prisma.friendship.findMany({ where: { userBId: user.id }, include: { userA: { select: { id: true, email: true } } } }),
    prisma.friendRequest.findMany({ where: { receiverId: user.id, status: "pending" }, include: { sender: { select: { id: true, email: true } } } }),
    prisma.friendRequest.findMany({ where: { senderId: user.id, status: "pending" }, include: { receiver: { select: { id: true, email: true } } } }),
  ]);
  return NextResponse.json({ friends: [...a.map((x) => x.userB), ...b.map((x) => x.userA)], incoming, outgoing });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const target = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!target || target.id === user.id) return NextResponse.json({ error: "User not found." }, { status: 404 });
  try {
    await prisma.friendRequest.create({ data: { senderId: user.id, receiverId: target.id } });
  } catch {
    return NextResponse.json({ error: "A request already exists." }, { status: 409 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
