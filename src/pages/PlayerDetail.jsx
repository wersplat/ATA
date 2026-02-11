import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import PlayerStatsGrid from '../components/player/PlayerStatsGrid';
import PlayerHistory from '../components/player/PlayerHistory';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMemo } from 'react';
import { calculateOverallRank } from '../utils/rankingAlgorithms';

export default function PlayerDetail() {
  const { id } = useParams();
  const { players, loading } = useData();

  const player = useMemo(
    () => players.find((p) => p.id === id),
    [players, id]
  );

  const playerRank = useMemo(() => {
    if (!player) return null;
    const ranked = calculateOverallRank(players);
    return ranked.find((p) => p.id === id)?.rank;
  }, [players, player, id]);

  if (loading) return <LoadingSpinner />;

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Player Not Found</h1>
        <Link to="/players" className="text-league-400 hover:text-league-300">
          Back to Players
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/players"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Players
      </Link>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-league-900 flex items-center justify-center border-2 border-league-600 shrink-0">
          <User className="w-10 h-10 text-league-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{player.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-gray-400">
            <Link
              to={`/teams/${player.team.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-league-400 transition-colors"
            >
              {player.team}
            </Link>
            <span>&middot;</span>
            <span>{player.games} Games Played</span>
            {playerRank && (
              <>
                <span>&middot;</span>
                <span className="text-league-400 font-medium">
                  Ranked #{playerRank}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <PlayerStatsGrid player={player} />
      <PlayerHistory playerId={player.id} />
    </div>
  );
}
