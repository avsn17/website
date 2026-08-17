// League tiers, ranked by lifetime accumulated focus minutes.
// Mirrors the "Seedling → Ancient Woods" progression from the reference
// design (Floot build), reworked to use real, server-computed totals.
export const LEAGUES = [
  { name: "Seedling", minMinutes: 0, color: "#8be8ff" },
  { name: "Sprout", minMinutes: 60, color: "#3c8c5c" },
  { name: "Bloom", minMinutes: 180, color: "#e6b3d9" },
  { name: "Grove", minMinutes: 420, color: "#ffd166" },
  { name: "Ancient Woods", minMinutes: 900, color: "#a9ecff" },
] as const;

export function getLeague(totalMinutes: number) {
  let current: (typeof LEAGUES)[number] = LEAGUES[0];
  for (const league of LEAGUES) {
    if (totalMinutes >= league.minMinutes) current = league;
  }
  return current;
}

export function nextLeague(totalMinutes: number) {
  return LEAGUES.find((l) => l.minMinutes > totalMinutes) ?? null;
}
