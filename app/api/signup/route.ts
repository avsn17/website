import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ADMIN_EMAILS } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !email.includes("@") || password.length < 8) {
    return NextResponse.json({ error: "Use a valid email and an 8-character password." }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";
  await prisma.user.create({ data: { email, passwordHash, role } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
