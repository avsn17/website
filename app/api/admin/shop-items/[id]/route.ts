import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (user.role !== "admin") return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const { id } = await params;
  await prisma.shopItem.deleteMany({ where: { id } });
  return NextResponse.json({ ok: true });
}
