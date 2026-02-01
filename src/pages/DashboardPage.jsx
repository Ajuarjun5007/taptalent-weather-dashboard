import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../features/weather/weatherSlice';
import CityCard from '../components/CityCard/CityCard';
import SearchBar from '../components/SearchBar/SearchBar';

// Default cities shown on first load
const defaultCities = ['London', 'New York', 'Delhi', 'Tokyo'];

function DashboardPage() {
  const dispatch = useDispatch();

  // Local state for dynamic city list
  const [cities, setCities] = useState(defaultCities);

  // Redux state
  const weatherCities = useSelector((state) => state.weather.cities);
  const loading = useSelector((state) => state.weather.loading);
  const unit = useSelector((state) => state.settings.unit);

  // Fetch weather whenever cities or unit change
  useEffect(() => {
    cities.forEach((city) => {
      dispatch(getCurrentWeather({ city, unit }));
    });
  }, [dispatch, cities, unit]);

  // Handle search add
  const handleSearch = (city) => {
    if (cities.includes(city)) return; // prevent duplicates
    setCities((prev) => [...prev, city]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TapTalent Weather Analytics Dashboard</h1>
      <p className="app-subtitle">
        Real-time weather insights across major cities
      </p>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading indicator */}
      {loading && <p>Loading weather data...</p>}

      {/* City Cards */}
      <div className="card-grid">
        {cities.map((city) => (
          <CityCard key={city} data={weatherCities[city]} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
