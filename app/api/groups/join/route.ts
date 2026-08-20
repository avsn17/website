import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const joinCode = typeof body.joinCode === "string" ? body.joinCode.trim().toUpperCase() : "";
  const group = await prisma.group.findUnique({ where: { joinCode } });
  if (!group) return NextResponse.json({ error: "Group not found." }, { status: 404 });
  try {
    await prisma.groupMembership.create({ data: { groupId: group.id, userId: user.id } });
  } catch {
    return NextResponse.json({ error: "You are already in this group." }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
