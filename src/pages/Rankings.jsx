import { useRankings } from '../hooks/useRankings';
import { useData } from '../context/DataContext';
import CategorySelector from '../components/rankings/CategorySelector';
import RankingsTable from '../components/rankings/RankingsTable';
import TrendChart from '../components/rankings/TrendChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMemo } from 'react';

export default function Rankings() {
  const { loading } = useData();
  const {
    rankings,
    trendData,
    top5Players,
    top5Ids,
    selectedCategory,
    setSelectedCategory,
  } = useRankings();

  const playerNameMap = useMemo(() => {
    const map = {};
    top5Players.forEach((p) => {
      map[p.id] = p.name;
    });
    return map;
  }, [top5Players]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">Player Rankings</h1>

      <CategorySelector
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <RankingsTable rankings={rankings} category={selectedCategory} />

      {trendData.length > 0 && (
        <TrendChart
          data={trendData}
          playerIds={top5Ids}
          playerNames={playerNameMap}
        />
      )}
    </div>
  );
}
