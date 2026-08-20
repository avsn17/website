import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  return id ? { id, role: (session?.user as { role?: string }).role } : null;
}

export function unauthorized() {
  return NextResponse.json({ error: "Sign in required." }, { status: 401 });
}
