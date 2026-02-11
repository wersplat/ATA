import { useData } from '../context/DataContext';
import { usePlayerStats } from '../hooks/usePlayerStats';
import StatsTable from '../components/stats/StatsTable';
import StatsFilter from '../components/stats/StatsFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Players() {
  const { loading } = useData();
  const {
    players,
    sortField,
    sortDir,
    toggleSort,
    search,
    setSearch,
    teamFilter,
    setTeamFilter,
    teams,
  } = usePlayerStats();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Player Statistics</h1>

      <StatsFilter
        search={search}
        onSearchChange={setSearch}
        teamFilter={teamFilter}
        onTeamFilterChange={setTeamFilter}
        teams={teams}
      />

      <StatsTable
        players={players}
        sortField={sortField}
        sortDir={sortDir}
        onSort={toggleSort}
      />
    </div>
  );
}
