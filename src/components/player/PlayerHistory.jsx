import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

export default function PlayerHistory({ playerId }) {
  const { historical } = useData();

  const chartData = useMemo(() => {
    const playerData = historical
      .filter((d) => d.playerId === playerId)
      .sort((a, b) => a.week - b.week);

    if (!playerData.length) return [];

    return playerData.map((d) => ({
      week: `Wk ${d.week}`,
      Points: d.points,
      Rebounds: d.rebounds,
      Assists: d.assists,
    }));
  }, [historical, playerId]);

  if (!chartData.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No historical data available for this player.
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 border border-gray-800 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Cumulative Stats by Week
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="Points"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Rebounds"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Assists"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
