# Mystical Gardens

A gamified focus timer. Start a session, watch your garden grow, guided by
Moonlight the Butterfly. Built with Next.js 14 (App Router) + Tailwind.

## What's implemented in this MVP

- **The Garden** — start a focus session (15/25/45/60 min presets), live
  timer, garden grows proportionally to accumulated focused minutes.
  Ending a session early still banks whatever was earned — the **flexible,
  no-punishment core mechanic** from the spec.
- **The Shop** — spend coins (1 coin/focused minute) on garden items
  (glow mushrooms, firefly swarm, moonvine, lantern path).
- **History** — session log with stats.
- **Feedback** — a form (front-end only, see below).
- **Moonlight the Butterfly** — original SVG mascot, animated.
- **Visual style** — twilight/night watercolor-inspired palette (indigo/plum/
  midnight blue, deep greens, sparing neon glow accents), serif display type
  (Cormorant Garamond) + sans body type (Work Sans), per the art direction
  in the master overview. Moonlight's wings now match the glowing,
  vein-detailed, dotted-edge look from the reference footage; the garden
  plot has layered watercolor hills and a moon glow; an ambient starfield
  + drifting mist sits behind the whole app; cards use a glass-panel
  treatment.
- **Admin** — a fourth tab, gated by email (see below).

Garden layout was implemented as **one continuous garden** (open question
§5.1) — easy to change to weekly/seasonal plots later, but a decision was
needed to ship an MVP.

## What's intentionally stubbed / not built

This is a front-end-only MVP — no backend yet. Before this is a real,
multi-user product you'll still need (straight from the master overview,
§4–5):

- **Accounts** — email/password + JWT, password reset, email verification,
  account deletion (GDPR/App Store), Apple Sign-In if iOS ever ships
- **Admin role** — a client-side-only admin gate now exists (the **Admin**
  tab, unlocked by entering `avasingueneser1@gmail.com`) so shop items can
  be managed without a backend yet. This is a convenience lock, not
  security — the allowed address is visible in the shipped JS bundle to
  anyone who looks. Before launch, replace it with the real `role` field
  on the user model, enforced server-side on every admin route
- **Server-side session validation** (heartbeat pings) — required before
  leaderboards ship, since the flexible mechanic makes gaming sessions
  easier without it
- **Groups/Friends/Leagues** — in-app join codes + friend requests (Discord
  stays optional, per the resolved decision)
- **Group garden stakes, streak rules, leaderboard visibility default,
  monetization tiers** — all still open per §5
- Real backend for Feedback submissions and persistence (currently
  `localStorage` only, per-browser)

A natural next step is wiring up a database + auth provider — Supabase
(Postgres + auth) fits the JWT/role model already sketched out in the spec.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

This repo is ready to deploy as-is:

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com/new and import that repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required for this MVP.
4. Deploy — Vercel will run `npm install` and `npm run build` automatically.

Or, with the Vercel CLI, from inside this folder:

```bash
npm install -g vercel
vercel
```

