import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Server-side enforcement for admin-only API routes. This is the real
// security layer — the old client-side email gate has been removed.
// Even if someone bypasses the UI entirely and calls the API directly,
// this checks the JWT's role claim before the request reaches the route.
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (token.role !== "admin") {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
