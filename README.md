# Mystical Gardens

A gamified focus timer. Start a session, watch your garden grow, guided by
Moonlight the Butterfly. Next.js 14 (App Router) + Tailwind + Prisma/Postgres
+ NextAuth.

## What changed in this version

Real accounts, a server-enforced admin role, and in-app Friends/Groups
replaced the earlier localStorage-only MVP:

- **Accounts** — email/password sign-up and sign-in (NextAuth, credentials
  provider, bcrypt-hashed passwords, JWT sessions). Unauthenticated visitors
  are redirected to `/signin`.
- **Real admin role** — the client-side email gate is gone. `role` now
  lives on the `User` row in Postgres and is embedded in the JWT. Every
  `/api/admin/*` route is checked server-side by `middleware.ts` — someone
  editing the page's JavaScript or calling the API directly still can't get
  through without an admin account. `avasingueneser1@gmail.com` is
  auto-promoted to admin at signup (see `ADMIN_EMAILS` in `lib/auth.ts`);
  add more emails there if needed.
- **Friends** — in-app, by email. Send a request, accept/decline, see your
  friends list. No Discord involved.
- **Groups** — create a group (gets a 6-character join code) or join one
  with a code. Membership only for now — a *shared/collective garden* for
  groups is a separate, still-undecided product question (§4/§5 of the
  master overview: does one member quitting affect everyone's progress?).
  Building that mechanic before that's answered would mean guessing at
  the answer, so it's deliberately left as membership-only.
- **Server-validated coins/purchases** — session logging and shop
  purchases now go through API routes that check and update the database,
  not the browser. A user can no longer grant themselves coins by editing
  `localStorage`.

Everything else (Garden, Shop, History, Feedback, visuals, Moonlight) works
as before, just backed by Postgres instead of the browser.

## Required setup — a real database

This version needs a Postgres database and won't run without one. Two ways
to get one, both free-tier:

**Vercel Postgres** (simplest if deploying to Vercel):
1. In your Vercel project dashboard → Storage → Create Database → Postgres
2. Vercel adds `DATABASE_URL` (and related vars) to your project automatically

**Supabase / Neon** (works anywhere):
1. Create a free project at supabase.com or neon.tech
2. Copy the connection string into `DATABASE_URL`

Either way, also set:
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — your deployed URL (or `http://localhost:3000` locally)

See `.env.example`. In Vercel, add these under Project Settings →
Environment Variables.

Once `DATABASE_URL` is set, push the schema to create the tables:

```bash
npx prisma db push
```

Run this once against a fresh database (locally with `.env.local` set, or
via `vercel env pull` then running it locally against the production DB).

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real values
npx prisma db push
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/signup` on first
visit.

## Deploying to Vercel

1. Push this repo to GitHub, import it at vercel.com/new (Next.js
   auto-detected).
2. Add a Postgres database (see above) and the `NEXTAUTH_*` env vars.
3. Deploy. The build script runs `prisma generate && next build`
   automatically.
4. After the first deploy, run `npx prisma db push` once (locally, pointed
   at the production `DATABASE_URL`) to create the tables — Vercel's build
   step doesn't do this for you.

## Still open / not built

Straight from the master overview, still unresolved:

- **Group garden mechanics** — whether groups share a collective garden,
  and what happens if someone quits (§4.3/§5.3)
- **Streak rules, leaderboard visibility, anti-cheat session validation**
  (heartbeat pings for backgrounded tabs), **monetization tiers** — all
  still open per §5
- **Feedback delivery** — the form still doesn't send anywhere; needs a
  real endpoint (email or a support-ticket table)
- **Discord integration** as an optional bonus channel (the in-app path
  now works standalone, which was the actual requirement — Discord itself
  was never required)
