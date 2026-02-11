import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { formatStat } from '../../utils/formatting';

export default function PlayerCard({ player, showLink = true }) {
  const content = (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-league-500 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-league-900 flex items-center justify-center border-2 border-league-600">
          <User className="w-7 h-7 text-league-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">{player.name}</h3>
          <p className="text-sm text-gray-400">{player.team} &middot; {player.games} GP</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'PTS', value: player.ppg },
          { label: 'REB', value: player.rpg },
          { label: 'AST', value: player.apg },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900/50 rounded-lg py-2">
            <div className="text-lg font-bold text-white">{formatStat(s.value)}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (showLink) {
    return <Link to={`/players/${player.id}`}>{content}</Link>;
  }
  return content;
}
