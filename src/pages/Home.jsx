import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useRankings } from '../hooks/useRankings';
import { computeTeamRankings } from '../utils/rankingAlgorithms';
import RankingCard from '../components/rankings/RankingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatStat, formatRecord } from '../utils/formatting';
import { useMemo } from 'react';

export default function Home() {
  const { players, teams, loading, isDemo } = useData();
  const { rankings } = useRankings();

  const teamRankings = useMemo(() => computeTeamRankings(teams), [teams]);

  if (loading) return <LoadingSpinner />;

  const top3 = rankings.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          ATA Basketball League
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Live stats, player rankings, career highs, and team standings —
          all powered by your data.
        </p>
        {isDemo && (
          <p className="mt-4 text-sm text-yellow-500">
            Showing demo data. Connect your Google Sheet to see real stats.
          </p>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            to: '/players',
            icon: BarChart3,
            label: 'Player Stats',
            desc: `${players.length} players tracked`,
          },
          {
            to: '/teams',
            icon: Users,
            label: 'Teams',
            desc: `${teams.length} teams competing`,
          },
          {
            to: '/rankings',
            icon: TrendingUp,
            label: 'Rankings',
            desc: 'Overall & category rankings',
          },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-4 bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-league-500 transition-colors group"
          >
            <item.icon className="w-8 h-8 text-league-500" />
            <div className="flex-1">
              <div className="font-semibold text-white group-hover:text-league-400 transition-colors">
                {item.label}
              </div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-league-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Top 3 Players */}
      {top3.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Top Players</h2>
            <Link
              to="/rankings"
              className="text-sm text-league-400 hover:text-league-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {top3.map((p, i) => (
              <RankingCard
                key={p.id}
                player={p}
                rank={i + 1}
                statLabel="Score"
                statValue={p.compositeScore}
              />
            ))}
          </div>
        </section>
      )}

      {/* Team Standings */}
      {teamRankings.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Team Standings</h2>
            <Link
              to="/teams"
              className="text-sm text-league-400 hover:text-league-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/80">
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold w-12">#</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Team</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Record</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Win%</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Diff</th>
                </tr>
              </thead>
              <tbody>
                {teamRankings.map((t, i) => (
                  <tr
                    key={t.id}
                    className={`border-t border-gray-800 hover:bg-gray-800/50 ${
                      i % 2 === 0 ? 'bg-gray-900/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-gray-400">{t.rank}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/teams/${t.id}`}
                        className="font-medium text-white hover:text-league-400 transition-colors"
                      >
                        {t.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      {formatRecord(t.wins, t.losses)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      {(t.winPct * 100).toFixed(0)}%
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        t.pointDiff >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {t.pointDiff >= 0 ? '+' : ''}
                      {t.pointDiff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Stat Leaders */}
      {players.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Stat Leaders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Scoring', key: 'ppg', unit: 'PPG' },
              { label: 'Rebounding', key: 'rpg', unit: 'RPG' },
              { label: 'Assists', key: 'apg', unit: 'APG' },
              { label: 'Steals', key: 'spg', unit: 'SPG' },
            ].map((cat) => {
              const leader = [...players].sort(
                (a, b) => b[cat.key] - a[cat.key]
              )[0];
              return (
                <Link
                  key={cat.key}
                  to={`/players/${leader.id}`}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-league-500 transition-colors"
                >
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    {cat.label} Leader
                  </div>
                  <div className="font-semibold text-white">{leader.name}</div>
                  <div className="text-2xl font-bold text-league-400 mt-1">
                    {formatStat(leader[cat.key])}
                    <span className="text-sm text-gray-500 ml-1">{cat.unit}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
