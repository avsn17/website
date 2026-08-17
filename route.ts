import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { joinCode } = await req.json();
  const group = await prisma.group.findUnique({
    where: { joinCode: String(joinCode || "").trim().toUpperCase() },
  });
  if (!group) {
    return NextResponse.json({ error: "No group with that code." }, { status: 404 });
  }

  await prisma.groupMembership.upsert({
    where: { groupId_userId: { groupId: group.id, userId } },
    update: {},
    create: { groupId: group.id, userId },
  });

  return NextResponse.json({ group });
}
