import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLeague, nextLeague, LEAGUES } from "@/lib/leagues";
import PageHeader from "@/components/PageHeader";
import AmbientSky from "@/components/AmbientSky";

export const dynamic = "force-dynamic"; // always fresh standings, never cached

const MEDALS = ["🥇", "🥈", "🥉"];

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const visible = name.slice(0, 2);
  return `${visible}${"•".repeat(Math.max(name.length - 2, 1))}@${domain}`;
}

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  const userId = (session.user as any).id as string;

  // Sum focused minutes per user, then join emails in — groupBy keeps this
  // to one aggregation query instead of pulling every session row.
  const totals = await prisma.focusSession.groupBy({
    by: ["userId"],
    _sum: { actualMinutes: true },
  });

  const userIds = totals.map((t) => t.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true },
  });
  const emailById = new Map(users.map((u) => [u.id, u.email]));

  const ranked = totals
    .map((t) => ({
      userId: t.userId,
      email: emailById.get(t.userId) ?? "unknown",
      minutes: Math.round((t._sum.actualMinutes ?? 0) * 10) / 10,
    }))
    .sort((a, b) => b.minutes - a.minutes)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  const me = ranked.find((r) => r.userId === userId);
  const top = ranked.slice(0, 20);
  const podium = top.slice(0, 3);
  const rest = top.slice(3);
  const myLeague = getLeague(me?.minutes ?? 0);
  const upNext = nextLeague(me?.minutes ?? 0);

  return (
    <>
      <AmbientSky />
      <main className="mx-auto min-h-screen max-w-4xl pb-16">
        <PageHeader title="Leaderboard" subtitle="Ranked by lifetime focus minutes" />

        <div className="px-6 py-8">
          {/* Your standing */}
          <div className="glass-panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Your league</p>
              <p className="font-display text-2xl" style={{ color: myLeague.color }}>
                {myLeague.name}
              </p>
              <p className="mt-1 text-sm text-muted">
                {me
                  ? `${me.minutes} minutes focused · rank #${me.rank} of ${ranked.length}`
                  : "No sessions logged yet — start one to join the board."}
              </p>
            </div>
            {upNext && (
              <div className="text-sm text-muted sm:text-right">
                <p>
                  {Math.max(0, upNext.minMinutes - (me?.minutes ?? 0)).toFixed(0)} min
                  to <span style={{ color: upNext.color }}>{upNext.name}</span>
                </p>
              </div>
            )}
          </div>

          {/* League ladder key */}
          <div className="mt-4 flex flex-wrap gap-2">
            {LEAGUES.map((l) => (
              <span
                key={l.name}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  color: l.color,
                  backgroundColor: `${l.color}1a`,
                  border: `1px solid ${l.color}40`,
                }}
              >
                {l.name} · {l.minMinutes}+ min
              </span>
            ))}
          </div>

          {ranked.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted">
              No one has logged a focus session yet — be the first.
            </p>
          ) : (
            <>
              {/* Podium */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {podium.map((row, i) => {
                  const isMe = row.userId === userId;
                  const league = getLeague(row.minutes);
                  return (
                    <div
                      key={row.userId}
                      className={`glass-panel rounded-2xl p-5 text-center ${
                        isMe ? "ring-2 ring-moonglow" : ""
                      } ${i === 0 ? "sm:order-2 sm:-translate-y-2" : i === 1 ? "sm:order-1" : "sm:order-3"}`}
                    >
                      <p className="text-3xl">{MEDALS[i]}</p>
                      <p className="mt-2 font-display text-lg text-parchment">
                        {maskEmail(row.email)}
                        {isMe && <span className="text-moonglow"> (you)</span>}
                      </p>
                      <p className="text-sm" style={{ color: league.color }}>
                        {league.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">{row.minutes} min</p>
                    </div>
                  );
                })}
              </div>

              {/* Rest of top 20 */}
              {rest.length > 0 && (
                <div className="glass-panel mt-6 divide-y divide-indigo-deep/40 rounded-2xl">
                  {rest.map((row) => {
                    const isMe = row.userId === userId;
                    const league = getLeague(row.minutes);
                    return (
                      <div
                        key={row.userId}
                        className={`flex items-center justify-between p-3 text-sm ${
                          isMe ? "bg-moonglow/10" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-right text-muted">#{row.rank}</span>
                          <span className="text-parchment">
                            {maskEmail(row.email)}
                            {isMe && <span className="text-moonglow"> (you)</span>}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs" style={{ color: league.color }}>
                            {league.name}
                          </span>
                          <span className="text-xs text-muted">{row.minutes} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* If the current user isn't in the top 20, show them separately */}
              {me && me.rank > 20 && (
                <div className="glass-panel mt-4 flex items-center justify-between rounded-2xl p-4 text-sm ring-1 ring-moonglow/40">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-right text-muted">#{me.rank}</span>
                    <span className="text-parchment">
                      {maskEmail(me.email)} <span className="text-moonglow">(you)</span>
                    </span>
                  </div>
                  <span className="text-xs text-muted">{me.minutes} min</span>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
