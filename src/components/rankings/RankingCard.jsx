import { Link } from 'react-router-dom';
import { Trophy, Medal } from 'lucide-react';
import { formatStat } from '../../utils/formatting';

const BG = {
  1: 'from-yellow-900/30 to-yellow-800/10 border-gold/30',
  2: 'from-gray-700/30 to-gray-600/10 border-silver/30',
  3: 'from-orange-900/30 to-orange-800/10 border-bronze/30',
};

export default function RankingCard({ player, rank, statLabel, statValue }) {
  const Icon = rank === 1 ? Trophy : Medal;
  const iconColor =
    rank === 1 ? 'text-gold' : rank === 2 ? 'text-silver' : 'text-bronze';

  return (
    <Link
      to={`/players/${player.id}`}
      className={`block bg-gradient-to-br ${
        BG[rank] || 'from-gray-800/30 to-gray-700/10 border-gray-700'
      } border rounded-xl p-5 hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <span className={`text-2xl font-bold ${iconColor}`}>#{rank}</span>
      </div>
      <div className="font-semibold text-white text-lg">{player.name}</div>
      <div className="text-sm text-gray-400 mb-3">{player.team}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{statValue}</span>
        <span className="text-sm text-gray-400">{statLabel}</span>
      </div>
    </Link>
  );
}
