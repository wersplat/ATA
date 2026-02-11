import { RANKING_WEIGHTS } from '../constants/statCategories';

export function calculateOverallRank(players) {
  const scored = players.map((p) => {
    let compositeScore = 0;
    for (const [stat, weight] of Object.entries(RANKING_WEIGHTS)) {
      compositeScore += (p[stat] || 0) * weight;
    }
    return { ...p, compositeScore: Math.round(compositeScore * 100) / 100 };
  });

  scored.sort((a, b) => b.compositeScore - a.compositeScore);

  return scored.map((p, i) => ({ ...p, rank: i + 1 }));
}

export function rankByCategory(players, category) {
  // For turnovers, lower is better
  const lowerIsBetter = category === 'topg';
  const sorted = [...players].sort((a, b) =>
    lowerIsBetter ? (a[category] || 0) - (b[category] || 0) : (b[category] || 0) - (a[category] || 0)
  );

  let rank = 1;
  return sorted.map((p, i) => {
    if (i > 0 && sorted[i][category] !== sorted[i - 1][category]) {
      rank = i + 1;
    }
    return { ...p, rank, categoryValue: p[category] || 0 };
  });
}

export function computeTeamRankings(teams) {
  const sorted = [...teams].sort((a, b) => {
    if (b.winPct !== a.winPct) return b.winPct - a.winPct;
    return b.pointDiff - a.pointDiff;
  });
  return sorted.map((t, i) => ({ ...t, rank: i + 1 }));
}

export function computeTrendData(historicalData, playerIds) {
  const weeks = [...new Set(historicalData.map((d) => d.week))].sort(
    (a, b) => a - b
  );

  return weeks.map((week) => {
    const weekData = historicalData.filter((d) => d.week === week);
    const entry = { week, date: weekData[0]?.date || '' };

    for (const id of playerIds) {
      const playerWeek = weekData.find((d) => d.playerId === id);
      entry[id] = playerWeek?.rank || null;
    }

    return entry;
  });
}
