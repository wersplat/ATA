import { Link } from 'react-router-dom';
import { Trophy, Medal } from 'lucide-react';
import { formatStat } from '../../utils/formatting';

const RANK_STYLES = {
  1: 'text-gold',
  2: 'text-silver',
  3: 'text-bronze',
};

export default function RankingsTable({ rankings, category }) {
  const valueKey = category === 'overall' ? 'compositeScore' : 'categoryValue';

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800/80">
            <th className="px-4 py-3 text-left font-semibold text-gray-300 w-16">
              Rank
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-300">
              Player
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-300">
              Team
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">
              {category === 'overall' ? 'Score' : 'Value'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, i) => (
            <tr
              key={player.id}
              className={`border-t border-gray-800 hover:bg-gray-800/50 transition-colors ${
                i % 2 === 0 ? 'bg-gray-900/30' : ''
              }`}
            >
              <td className="px-4 py-3">
                <span
                  className={`font-bold text-lg ${
                    RANK_STYLES[player.rank] || 'text-gray-400'
                  }`}
                >
                  {player.rank <= 3 ? (
                    <span className="flex items-center gap-1">
                      {player.rank === 1 ? (
                        <Trophy className="w-4 h-4 text-gold" />
                      ) : (
                        <Medal
                          className={`w-4 h-4 ${
                            player.rank === 2 ? 'text-silver' : 'text-bronze'
                          }`}
                        />
                      )}
                      {player.rank}
                    </span>
                  ) : (
                    player.rank
                  )}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/players/${player.id}`}
                  className="font-medium text-white hover:text-league-400 transition-colors"
                >
                  {player.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-400">{player.team}</td>
              <td className="px-4 py-3 text-right font-semibold text-league-400">
                {category === 'overall'
                  ? player.compositeScore
                  : formatStat(
                      player[category],
                      category.includes('Pct')
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
