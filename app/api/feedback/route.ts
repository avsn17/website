import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/api-auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return NextResponse.json({ error: "Message required." }, { status: 400 });
  console.info("Feedback", { userId: user.id, message: message.slice(0, 2000) });
  return NextResponse.json({ ok: true }, { status: 201 });
}
