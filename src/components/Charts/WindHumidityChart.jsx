import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function WindHumidityChart({ data, mode }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-card">
      <h3>
        {mode === 'hourly'
          ? 'Wind & Humidity (Hourly)'
          : 'Wind & Humidity (5-Day Avg)'}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
         <XAxis
  dataKey="label"
  tick={{ fill: '#ffffff' }}
  axisLine={{ stroke: 'rgba(255,255,255,0.4)' }}
/>

<YAxis
  tick={{ fill: '#ffffff' }}
  axisLine={{ stroke: 'rgba(255,255,255,0.4)' }}
/>

          <Tooltip />
          <Bar dataKey="wind" fill="#60A5FA" name="Wind (m/s)" />
          <Bar dataKey="humidity" fill="#FDBA74" name="Humidity (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WindHumidityChart;
