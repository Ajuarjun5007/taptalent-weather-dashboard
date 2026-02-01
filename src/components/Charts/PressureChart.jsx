import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function groupByDay(list) {
  const map = {};

  list.forEach((item) => {
    if (!item.dt_txt) return;

    const date = item.dt_txt.split(' ')[0];

    if (!map[date]) {
      map[date] = {
        pressures: [],
        label: new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
      };
    }

    map[date].pressures.push(item.main.pressure);
  });

  return Object.values(map).slice(0, 5).map((d) => ({
    label: d.label,
    pressure: Math.round(
      d.pressures.reduce((a, b) => a + b, 0) / d.pressures.length
    ),
  }));
}

function PressureChart({ data, mode, range }) {
  if (!data || data.length === 0) return null;

  // ---------- Hourly ----------
  const hourlyPoints = range ? range / 3 : 8;

  const hourlyData = data.slice(0, hourlyPoints).map((item) => ({
    label: item.dt_txt.split(' ')[1].slice(0, 5),
    pressure: item.main.pressure,
  }));

  // ---------- Daily ----------
  const dailyData = groupByDay(data);

  const chartData = mode === 'hourly' ? hourlyData : dailyData;

  return (
    <div className="chart-card">
      <h3>
        Pressure Trend ({mode === 'hourly' ? 'Hourly' : 'Daily'})
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" />

          <XAxis
            dataKey="label"
            tick={{ fill: '#fff', fontSize: 12 }}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
            label={{
              value: mode === 'hourly' ? 'Time' : 'Day',
              position: 'insideBottom',
              offset: -5,
              fill: '#fff',
            }}
          />

          <YAxis
            tick={{ fill: '#fff', fontSize: 12 }}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
            label={{
              value: 'Pressure (hPa)',
              angle: -90,
              position: 'insideLeft',
              fill: '#fff',
            }}
          />

          <Tooltip
            contentStyle={{
              background: '#0e2a33',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
            }}
            labelStyle={{ color: '#9ff' }}
          />

          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#fbbf24"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PressureChart;
