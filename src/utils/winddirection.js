export function getWindDirection(deg) {
  if (deg === undefined || deg === null) return '--';

  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];

  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}
