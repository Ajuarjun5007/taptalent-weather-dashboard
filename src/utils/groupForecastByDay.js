// utils/groupForecastByDay.js (recommended)
// OR place above your component

export function groupByDay(forecastList) {
  const days = {};

  forecastList?.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    if (!days[dayKey]) {
      days[dayKey] = {
        temps: [],
        humidity: [],
        wind: [],
        rain: [],
      };
    }

    days[dayKey].temps.push(item.main.temp);
    days[dayKey].humidity.push(item.main.humidity);
    days[dayKey].wind.push(item.wind.speed);
    days[dayKey].rain.push(item.rain?.['3h'] || 0);
  });

  return Object.entries(days).map(([day, values]) => ({
    day,
    temp: Math.round(
      values.temps.reduce((a, b) => a + b, 0) / values.temps.length
    ),
    humidity: Math.round(
      values.humidity.reduce((a, b) => a + b, 0) / values.humidity.length
    ),
    wind: Number(
      (
        values.wind.reduce((a, b) => a + b, 0) / values.wind.length
      ).toFixed(1)
    ),
    rain: Number(
      values.rain.reduce((a, b) => a + b, 0).toFixed(1)
    ),
  }));
}
