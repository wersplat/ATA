import { useData } from '../context/DataContext';
import { computeTeamRankings } from '../utils/rankingAlgorithms';
import TeamCard from '../components/team/TeamCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMemo } from 'react';

export default function Teams() {
  const { teams, loading } = useData();
  const teamRankings = useMemo(() => computeTeamRankings(teams), [teams]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamRankings.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
      {teamRankings.length === 0 && (
        <p className="text-center py-12 text-gray-500">
          No team data available.
        </p>
      )}
    </div>
  );
}
