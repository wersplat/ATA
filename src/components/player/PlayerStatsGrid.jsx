import StatCard from '../stats/StatCard';
import { formatStat } from '../../utils/formatting';
import { STAT_CATEGORIES } from '../../constants/statCategories';

export default function PlayerStatsGrid({ player }) {
  const careerHighMap = player.careerHighs || {};

  const isHigh = (key) => {
    const perGameToTotal = {
      ppg: 'points',
      rpg: 'rebounds',
      apg: 'assists',
      spg: 'steals',
      bpg: 'blocks',
    };
    const highKey = perGameToTotal[key];
    if (!highKey || !careerHighMap[highKey]) return false;
    return player[key] >= careerHighMap[highKey];
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Season Averages</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAT_CATEGORIES.map((cat) => (
          <StatCard
            key={cat.key}
            label={cat.abbr}
            value={formatStat(player[cat.key], cat.key.includes('Pct'))}
            isCareerHigh={isHigh(cat.key)}
          />
        ))}
      </div>

      <h3 className="text-lg font-semibold text-white mt-8 mb-4">Season Totals</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total Points', value: player.points },
          { label: 'Total Rebounds', value: player.rebounds },
          { label: 'Total Assists', value: player.assists },
          { label: 'Total Steals', value: player.steals },
          { label: 'Total Blocks', value: player.blocks },
          { label: 'Total Minutes', value: player.minutes },
          { label: 'Total Turnovers', value: player.turnovers },
          { label: 'Games Played', value: player.games },
        ].map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} size="sm" />
        ))}
      </div>

      {player.careerHighs && (
        <>
          <h3 className="text-lg font-semibold text-white mt-8 mb-4">
            Career Highs (Single Game)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'Points', value: careerHighMap.points },
              { label: 'Rebounds', value: careerHighMap.rebounds },
              { label: 'Assists', value: careerHighMap.assists },
              { label: 'Steals', value: careerHighMap.steals },
              { label: 'Blocks', value: careerHighMap.blocks },
            ].map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value || '-'}
                isCareerHigh
                size="sm"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
