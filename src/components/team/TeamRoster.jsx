import { Link } from 'react-router-dom';
import { formatStat } from '../../utils/formatting';

export default function TeamRoster({ players }) {
  if (!players.length) {
    return <p className="text-gray-500">No players on this team.</p>;
  }

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800/80">
            <th className="px-4 py-3 text-left font-semibold text-gray-300">Player</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">GP</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">PTS</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">REB</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">AST</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">STL</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-300">BLK</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr
              key={p.id}
              className={`border-t border-gray-800 hover:bg-gray-800/50 ${
                i % 2 === 0 ? 'bg-gray-900/30' : ''
              }`}
            >
              <td className="px-4 py-3">
                <Link
                  to={`/players/${p.id}`}
                  className="font-medium text-white hover:text-league-400 transition-colors"
                >
                  {p.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-right text-gray-300">{p.games}</td>
              <td className="px-4 py-3 text-right text-gray-300 font-medium">
                {formatStat(p.ppg)}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {formatStat(p.rpg)}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {formatStat(p.apg)}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {formatStat(p.spg)}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {formatStat(p.bpg)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
