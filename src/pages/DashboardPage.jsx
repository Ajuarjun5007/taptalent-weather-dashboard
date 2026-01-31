import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../features/weather/weatherSlice';

const cities = ['London', 'New York', 'Delhi'];

function DashboardPage() {
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.settings.unit);

  useEffect(() => {
    // Fetch weather for first city for now
    dispatch(getCurrentWeather({ city: cities[0], unit }));
  }, [dispatch, unit]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Weather Dashboard</h2>

      {current && (
        <div style={{ border: '1px solid #ccc', padding: '16px', width: '250px' }}>
          <h3>{current.name}</h3>
          <p>Temperature: {current.main.temp}°</p>
          <p>Condition: {current.weather[0].main}</p>
          <p>Humidity: {current.main.humidity}%</p>
          <p>Wind: {current.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
