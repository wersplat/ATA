import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#a855f7'];

export default function TrendChart({ data, playerIds, playerNames }) {
  if (!data.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No historical data available for trend visualization.
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 border border-gray-800 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">
        Ranking Trend (Top 5)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="week"
            stroke="#9ca3af"
            fontSize={12}
            tickFormatter={(w) => `Wk ${w}`}
          />
          <YAxis
            reversed
            stroke="#9ca3af"
            fontSize={12}
            domain={[1, 'auto']}
            allowDecimals={false}
            label={{
              value: 'Rank',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#9ca3af', fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
              fontSize: 12,
            }}
            formatter={(value, name) => {
              const label = playerNames[name] || name;
              return [value ? `#${value}` : 'N/A', label];
            }}
            labelFormatter={(w) => `Week ${w}`}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#d1d5db', fontSize: 12 }}>
                {playerNames[value] || value}
              </span>
            )}
          />
          {playerIds.map((id, i) => (
            <Line
              key={id}
              type="monotone"
              dataKey={id}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
