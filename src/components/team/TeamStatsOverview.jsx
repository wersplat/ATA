import StatCard from '../stats/StatCard';

export default function TeamStatsOverview({ team, players }) {
  const totalGames = team.wins + team.losses;
  const avgPts =
    players.length > 0
      ? (players.reduce((sum, p) => sum + p.ppg, 0) / players.length).toFixed(1)
      : '0';
  const avgReb =
    players.length > 0
      ? (players.reduce((sum, p) => sum + p.rpg, 0) / players.length).toFixed(1)
      : '0';
  const avgAst =
    players.length > 0
      ? (players.reduce((sum, p) => sum + p.apg, 0) / players.length).toFixed(1)
      : '0';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Games Played" value={totalGames} />
      <StatCard label="Points For" value={team.pointsFor} />
      <StatCard label="Points Against" value={team.pointsAgainst} />
      <StatCard
        label="Point Diff"
        value={`${team.pointDiff >= 0 ? '+' : ''}${team.pointDiff}`}
      />
      <StatCard label="Avg PTS/Player" value={avgPts} />
      <StatCard label="Avg REB/Player" value={avgReb} />
      <StatCard label="Avg AST/Player" value={avgAst} />
      <StatCard label="Roster Size" value={players.length} />
    </div>
  );
}
