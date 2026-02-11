import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';
import { formatStat } from '../../utils/formatting';

const COLUMNS = [
  { key: 'name', label: 'Player', sortable: false },
  { key: 'team', label: 'Team', sortable: false },
  { key: 'games', label: 'GP', sortable: true },
  { key: 'ppg', label: 'PTS', sortable: true, highlight: true },
  { key: 'rpg', label: 'REB', sortable: true },
  { key: 'apg', label: 'AST', sortable: true },
  { key: 'spg', label: 'STL', sortable: true },
  { key: 'bpg', label: 'BLK', sortable: true },
  { key: 'fgPct', label: 'FG%', sortable: true, pct: true },
  { key: 'threePct', label: '3P%', sortable: true, pct: true },
  { key: 'ftPct', label: 'FT%', sortable: true, pct: true },
];

export default function StatsTable({
  players,
  sortField,
  sortDir,
  onSort,
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800/80">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && onSort(col.key)}
                  className={`px-4 py-3 text-left font-semibold text-gray-300 whitespace-nowrap ${
                    col.sortable
                      ? 'cursor-pointer hover:text-white select-none'
                      : ''
                  } ${col.key === 'name' ? 'sticky left-0 bg-gray-800/80 z-10' : ''}`}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortField === col.key && (
                      sortDir === 'desc' ? (
                        <ChevronDown className="w-3 h-3 text-league-400" />
                      ) : (
                        <ChevronUp className="w-3 h-3 text-league-400" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr
                key={player.id}
                className={`border-t border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i % 2 === 0 ? 'bg-gray-900/30' : ''
                }`}
              >
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 whitespace-nowrap ${
                      col.key === 'name'
                        ? 'sticky left-0 bg-gray-900/95 z-10 font-medium'
                        : ''
                    } ${
                      col.highlight && sortField === col.key
                        ? 'text-league-400 font-semibold'
                        : 'text-gray-300'
                    }`}
                  >
                    {col.key === 'name' ? (
                      <Link
                        to={`/players/${player.id}`}
                        className="text-white hover:text-league-400 transition-colors"
                      >
                        {player.name}
                      </Link>
                    ) : col.key === 'team' ? (
                      <Link
                        to={`/teams/${player.team.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-league-400 transition-colors"
                      >
                        {player.team}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-1">
                        {formatStat(player[col.key], col.pct)}
                        {col.key !== 'games' && isCareerHigh(player, col.key) && (
                          <Star className="w-3 h-3 text-gold fill-gold" />
                        )}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {players.map((player, i) => (
          <Link
            key={player.id}
            to={`/players/${player.id}`}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-league-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold text-white">{player.name}</div>
                <div className="text-xs text-gray-400">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-league-400">
                  {formatStat(player.ppg)}
                </div>
                <div className="text-xs text-gray-500">PPG</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'REB', value: player.rpg },
                { label: 'AST', value: player.apg },
                { label: 'STL', value: player.spg },
                { label: 'BLK', value: player.bpg },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-sm font-medium text-gray-200">
                    {formatStat(s.value)}
                  </div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No players found matching your criteria.
        </div>
      )}
    </>
  );
}

function isCareerHigh(player, statKey) {
  if (!player.careerHighs) return false;
  const map = {
    ppg: 'points',
    rpg: 'rebounds',
    apg: 'assists',
    spg: 'steals',
    bpg: 'blocks',
  };
  const highKey = map[statKey];
  if (!highKey) return false;
  const perGame = player[statKey];
  const high = player.careerHighs[highKey];
  return high && perGame >= high;
}
