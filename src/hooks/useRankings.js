import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import {
  calculateOverallRank,
  rankByCategory,
  computeTrendData,
} from '../utils/rankingAlgorithms';

export function useRankings() {
  const { players, historical } = useData();
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const rankings = useMemo(() => {
    if (!players.length) return [];
    if (selectedCategory === 'overall') return calculateOverallRank(players);
    return rankByCategory(players, selectedCategory);
  }, [players, selectedCategory]);

  const top5Ids = useMemo(
    () => rankings.slice(0, 5).map((p) => p.id),
    [rankings]
  );

  const trendData = useMemo(() => {
    if (!historical.length || !top5Ids.length) return [];
    return computeTrendData(historical, top5Ids);
  }, [historical, top5Ids]);

  const top5Players = useMemo(
    () => rankings.slice(0, 5),
    [rankings]
  );

  return {
    rankings,
    trendData,
    top5Players,
    top5Ids,
    selectedCategory,
    setSelectedCategory,
  };
}
