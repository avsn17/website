import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genericResponse = {
  message: "If an account exists, a password reset link has been sent.",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) return NextResponse.json(genericResponse);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json(genericResponse);

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const origin = process.env.NEXTAUTH_URL || new URL(request.url).origin;
  const resetUrl = `${origin}/reset-password?token=${encodeURIComponent(rawToken)}`;
  let emailSent = false;

  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [user.email],
        subject: "Reset your Mystical Gardens password",
        text: `Reset your password within one hour: ${resetUrl}`,
      }),
    });
    emailSent = emailResponse.ok;
  }

  if (!emailSent && process.env.NODE_ENV !== "production") {
    console.info(`Password reset URL for ${user.email}: ${resetUrl}`);
  }

  return NextResponse.json({
    ...genericResponse,
    ...(process.env.NODE_ENV !== "production" ? { resetUrl } : {}),
  });
}
