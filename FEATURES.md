# Features — Mystical Gardens (current build)

## The Garden (main tab)
- Live SVG garden scene: layered watercolor hills (two depth layers),
  glowing moon with radial halo, twilight sky gradient (indigo → plum →
  near-black).
- Growth is proportional to **total accumulated focus time** across all
  sessions (`totalFocusedMinutes`), not any single session:
  - Stem count scales from 1 up to 7 as the total rises
  - Each stem's height and bloom size scale with growth
  - Visually caps at 300 lifetime minutes (~5 hours); the number keeps
    counting past that even though the plot looks "full"
  - Blooms alternate pink/blue
- Session timer: presets (15/25/45/60 min) + tag (Study, Deep work,
  Reading, Chores, Creative). Live MM:SS countdown, progress bar animates
  across the garden SVG.
- **No punishment for stopping early** — core mechanic. "End session &
  keep growth" always available; elapsed time banks at full value. No
  give-up state, no dying plant, no partial penalty.
- Auto-completes and logs when the timer reaches target.
- 1 coin per focused minute, credited the instant a session ends.

## The Shop
- Card grid: name, category (plant/companion/backdrop), description, cost.
- Built-in items: Glow Mushroom Patch (40), Firefly Swarm (60), Moonvine
  Trellis (90), Lantern-lit Path (120).
- Button state reflects affordability/ownership accurately.
- Purchases render immediately into the Garden SVG.
- Admin-added items appear in the same grid, indistinguishable from
  built-ins.

## History
- Stat cards: session count, total minutes, total coins.
- Reverse-chronological session list: tag, timestamp, actual/target
  minutes, coins earned.
- Empty state when no sessions logged.

## Feedback
- Textarea + submit, glass-card styled.
- Front-end only — nothing is sent anywhere yet; needs a real endpoint.

## Admin
- Email-gated (`avasingueneser1@gmail.com`, case-insensitive).
- Add/remove custom shop items once unlocked.
- On-screen disclaimer: client-side convenience lock only, not real
  security — replace with a backend-enforced `role` check before launch.

## Moonlight the Butterfly
- Original SVG: translucent glowing wings, vein linework, dotted edges,
  blur glow filter, drifting dust particles.
- Idle drift/flutter animation, shown in the nav bar.

## Visual system
- Palette: indigo/plum/midnight-blue, deep forest greens, sparing neon
  glow (moonglow cyan, firefly gold, petal pink) as light-source accents.
- Type: Cormorant Garamond (display/serif) + Work Sans (body/sans).
- Ambient backdrop: fixed twilight gradient, two blurred mist bands, 46
  twinkling stars with staggered delays.
- Glass-panel card style used consistently across all views.
- Persistent coin counter pill in the nav.

## Data & persistence
- Everything lives in one `localStorage` key. Per-browser, no sync, no
  accounts, no server-side validation — editable by anyone with dev tools.

## Not built yet
Accounts/JWT/password reset, backend-enforced admin roles, server-side
session validation (anti-cheat), in-app Groups/Friends/Leagues, Discord
integration, streak rules, group-garden mechanics, monetization tiers,
real feedback delivery.
