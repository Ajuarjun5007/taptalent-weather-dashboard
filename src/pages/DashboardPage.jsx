import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../features/weather/weatherSlice';

import CityCard from '../components/CityCard/CityCard';
import CitySkeleton from '../components/CityCard/CitySkeleton';
import SearchBar from '../components/SearchBar/SearchBar';

// 🇮🇳 Indian Cities (MAX 8 → 2 rows)
const INDIAN_CITIES = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Kochi',
];

// 🌍 International Cities (MAX 8 → 2 rows)
const INTERNATIONAL_CITIES = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
  'Dubai',
  'Singapore',
  'Toronto',
];

function DashboardPage() {
  const dispatch = useDispatch();

  const weatherCities = useSelector((state) => state.weather.cities);
  const unit = useSelector((state) => state.settings.unit);

  // "See more" state (controls 1 row vs 2 rows)
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);

  // ✅ STRICTLY CONTROL HOW MANY CARDS ARE SHOWN
  const indianVisibleCities = showMoreIndian
    ? INDIAN_CITIES.slice(0, 8)
    : INDIAN_CITIES.slice(0, 4);

  const internationalVisibleCities = showMoreInternational
    ? INTERNATIONAL_CITIES.slice(0, 8)
    : INTERNATIONAL_CITIES.slice(0, 4);

  // Fetch weather data once (for all cities)
  useEffect(() => {
    const allCities = [...INDIAN_CITIES, ...INTERNATIONAL_CITIES];
    allCities.forEach((city) => {
      dispatch(getCurrentWeather({ city, unit }));
    });
  }, [dispatch, unit]);

  // Search handler (adds city without breaking layout)
  const handleSearch = (city) => {
    dispatch(getCurrentWeather({ city, unit }));
  };

  return (
    <div className="app-container">
      {/* Header + Search */}
      <div className="dashboard-header">
        <div>
          <h1 className="app-title">TapTalent Weather Analytics Dashboard</h1>
          <p className="app-subtitle">
            Real-time weather insights across major cities
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 🇮🇳 Indian Cities */}
      <section className="city-section">
        <h2 className="section-title">🇮🇳 Indian Cities</h2>

        <div className="card-grid">
          {indianVisibleCities.map((city) =>
            weatherCities[city] ? (
              <CityCard key={city} data={weatherCities[city]} />
            ) : (
              <CitySkeleton key={city} />
            )
          )}
        </div>

        {!showMoreIndian && (
          <button
            className="see-more-btn"
            onClick={() => setShowMoreIndian(true)}
          >
            See more
          </button>
        )}
      </section>

      {/* 🌍 International Cities */}
      <section className="city-section">
        <h2 className="section-title">🌍 International Cities</h2>

        <div className="card-grid">
          {internationalVisibleCities.map((city) =>
            weatherCities[city] ? (
              <CityCard key={city} data={weatherCities[city]} />
            ) : (
              <CitySkeleton key={city} />
            )
          )}
        </div>

        {!showMoreInternational && (
          <button
            className="see-more-btn"
            onClick={() => setShowMoreInternational(true)}
          >
            See more
          </button>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
