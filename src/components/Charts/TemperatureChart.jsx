import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function TemperatureChart({ data, mode }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-card">
      <h3>
        {mode === 'hourly'
          ? 'Today — Hourly Temperature'
          : '5-Day Temperature Forecast'}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
           <XAxis
      dataKey="label"
      tick={{ fill: '#ffffff', fontSize: 12 }}
      axisLine={{ stroke: 'rgba(255,255,255,0.4)' }}
      tickLine={{ stroke: 'rgba(255,255,255,0.4)' }}
    />

    <YAxis
      tick={{ fill: '#ffffff', fontSize: 12 }}
      axisLine={{ stroke: 'rgba(255,255,255,0.4)' }}
      tickLine={{ stroke: 'rgba(255,255,255,0.4)' }}
      label={{
        value: 'Temperature (°C)',
        angle: -90,
        position: 'insideLeft',
        fill: '#ffffff'
      }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: '#1e3a44',
        border: 'none',
        color: '#fff',
      }}
      labelStyle={{ color: '#fff' }}
    />

    <Line
      type="monotone"
      dataKey="temp"
      stroke="#4fd1c5"
      strokeWidth={2}
      dot={{ r: 4 }}
    />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
