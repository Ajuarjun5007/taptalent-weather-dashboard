import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function PrecipitationChart({ data, mode }) {
  if (!data || data.length === 0) return null;

  // ---------- Helpers ----------
  const formatHour = (dtTxt) =>
    new Date(dtTxt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDay = (dtTxt) =>
    new Date(dtTxt).toLocaleDateString([], { weekday: 'short' });

  // ---------- Hourly ----------
  const hourlyData = data.slice(0, 24).map((item) => ({
    label: formatHour(item.dt_txt),
    value: item.rain?.['3h'] || 0,
  }));

  // ---------- Daily ----------
  const dailyMap = {};
  data.forEach((item) => {
    const day = formatDay(item.dt_txt);
    const rain = item.rain?.['3h'] || 0;
    dailyMap[day] = (dailyMap[day] || 0) + rain;
  });

  const dailyData = Object.keys(dailyMap).map((day) => ({
    label: day,
    value: Number(dailyMap[day].toFixed(2)),
  }));

  const chartData = mode === 'hourly' ? hourlyData : dailyData;

  // ---------- Tooltip ----------
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="chart-tooltip">
        <p>{label}</p>
        <strong>{payload[0].value} mm</strong>
      </div>
    );
  };

  return (
    <div className="chart-card">
      <h3>
        Precipitation ({mode === 'hourly' ? 'Hourly' : 'Daily'})
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" />
          
          <XAxis
            dataKey="label"
            stroke="#fff"
            tick={{ fill: '#fff', fontSize: 12 }}
            label={{
              value: mode === 'hourly' ? 'Time' : 'Day',
              position: 'insideBottom',
              offset: -5,
              fill: '#fff',
            }}
          />

          <YAxis
            stroke="#fff"
            tick={{ fill: '#fff', fontSize: 12 }}
            label={{
              value: 'Precipitation (mm)',
              angle: -90,
              position: 'insideLeft',
              fill: '#fff',
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="value"
            fill="#55c8ff"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PrecipitationChart;
