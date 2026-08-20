import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const requestId = typeof body.requestId === "string" ? body.requestId : "";
  const accept = body.accept === true;
  const friendRequest = await prisma.friendRequest.findFirst({ where: { id: requestId, receiverId: user.id, status: "pending" } });
  if (!friendRequest) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  await prisma.$transaction([
    prisma.friendRequest.update({ where: { id: requestId }, data: { status: accept ? "accepted" : "declined" } }),
    ...(accept ? [prisma.friendship.create({ data: { userAId: friendRequest.senderId, userBId: user.id } })] : []),
  ]);
  return NextResponse.json({ ok: true });
}
