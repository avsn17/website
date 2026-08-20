import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

async function groupsFor(userId: string) {
  const groups = await prisma.group.findMany({ where: { memberships: { some: { userId } } }, include: { memberships: { include: { user: { select: { id: true, email: true } } } } }, orderBy: { createdAt: "desc" } });
  return groups.map((group) => ({ id: group.id, name: group.name, joinCode: group.joinCode, members: group.memberships.map((member) => member.user) }));
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  return NextResponse.json({ groups: await groupsFor(user.id) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  if (!name) return NextResponse.json({ error: "Group name required." }, { status: 400 });
  const group = await prisma.group.create({ data: { name, joinCode: randomBytes(4).toString("hex").toUpperCase(), memberships: { create: { userId: user.id } } } });
  return NextResponse.json({ group }, { status: 201 });
}
