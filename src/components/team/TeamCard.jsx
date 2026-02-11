import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { formatRecord } from '../../utils/formatting';

export default function TeamCard({ team, showLink = true }) {
  const content = (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-league-500 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-league-900 flex items-center justify-center border border-league-700">
          <Users className="w-6 h-6 text-league-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">{team.name}</h3>
          {team.conference && (
            <p className="text-xs text-gray-400">{team.conference} Conference</p>
          )}
        </div>
        {team.rank && (
          <span className="ml-auto text-2xl font-bold text-league-400">
            #{team.rank}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-900/50 rounded-lg py-2">
          <div className="text-lg font-bold text-white">
            {formatRecord(team.wins, team.losses)}
          </div>
          <div className="text-xs text-gray-500">Record</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg py-2">
          <div className="text-lg font-bold text-white">
            {(team.winPct * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500">Win %</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg py-2">
          <div
            className={`text-lg font-bold ${
              team.pointDiff >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {team.pointDiff >= 0 ? '+' : ''}
            {team.pointDiff}
          </div>
          <div className="text-xs text-gray-500">Diff</div>
        </div>
      </div>
    </div>
  );

  if (showLink) {
    return <Link to={`/teams/${team.id}`}>{content}</Link>;
  }
  return content;
}
