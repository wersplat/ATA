import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { computeTeamRankings } from '../utils/rankingAlgorithms';
import TeamStatsOverview from '../components/team/TeamStatsOverview';
import TeamRoster from '../components/team/TeamRoster';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMemo } from 'react';
import { formatRecord } from '../utils/formatting';

export default function TeamDetail() {
  const { id } = useParams();
  const { teams, players, loading } = useData();

  const teamRankings = useMemo(() => computeTeamRankings(teams), [teams]);

  const team = useMemo(
    () => teamRankings.find((t) => t.id === id),
    [teamRankings, id]
  );

  const roster = useMemo(
    () =>
      team
        ? players
            .filter(
              (p) => p.team.toLowerCase().replace(/\s+/g, '-') === id
            )
            .sort((a, b) => b.ppg - a.ppg)
        : [],
    [players, team, id]
  );

  if (loading) return <LoadingSpinner />;

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Team Not Found</h1>
        <Link to="/teams" className="text-league-400 hover:text-league-300">
          Back to Teams
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/teams"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Teams
      </Link>

      {/* Hero */}
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-xl bg-league-900 flex items-center justify-center border border-league-700 shrink-0">
          <Users className="w-10 h-10 text-league-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{team.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-gray-400">
            <span>{formatRecord(team.wins, team.losses)}</span>
            <span>&middot;</span>
            <span>Ranked #{team.rank}</span>
            {team.conference && (
              <>
                <span>&middot;</span>
                <span>{team.conference} Conference</span>
              </>
            )}
          </div>
        </div>
      </div>

      <TeamStatsOverview team={team} players={roster} />

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Roster</h2>
        <TeamRoster players={roster} />
      </div>
    </div>
  );
}
