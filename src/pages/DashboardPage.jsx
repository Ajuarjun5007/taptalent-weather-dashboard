import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../features/weather/weatherSlice';

import CityCard from '../components/CityCard/CityCard';
import CitySkeleton from '../components/CityCard/CitySkeleton';
import SearchBar from '../components/SearchBar/SearchBar';

function DashboardPage() {
  const dispatch = useDispatch();

  // 🌆 City lists (DYNAMIC)
  const [indianCities, setIndianCities] = useState([
    'Delhi',
    'Mumbai',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
    'Kochi',
  ]);

  const [internationalCities, setInternationalCities] = useState([
    'London',
    'New York',
    'Tokyo',
    'Paris',
    'Sydney',
    'Dubai',
    'Singapore',
    'Toronto',
  ]);

  const weatherCities = useSelector((state) => state.weather.cities);
  const unit = useSelector((state) => state.settings.unit);
const favorites = useSelector((state) => state.favorites.cities);

const sortPinned = (cities) => [
  ...cities.filter((c) => favorites.includes(c)),
  ...cities.filter((c) => !favorites.includes(c)),
];
  // See-more controls
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);

  const sortedIndianCities = sortPinned(indianCities);
const sortedInternationalCities = sortPinned(internationalCities);

const indianVisibleCities = showMoreIndian
  ? sortedIndianCities.slice(0, 8)
  : sortedIndianCities.slice(0, 4);

const internationalVisibleCities = showMoreInternational
  ? sortedInternationalCities.slice(0, 8)
  : sortedInternationalCities.slice(0, 4);



  // 🌦️ Fetch weather whenever city lists or unit change
  useEffect(() => {
    const allCities = [...indianCities, ...internationalCities];

    allCities.forEach((city) => {
      dispatch(getCurrentWeather({ city, unit }));
    });
  }, [dispatch, unit, indianCities, internationalCities]);

  // ➕ ADD CITY FROM SEARCH (THIS WAS MISSING)
  const handleSearch = (city) => {
    dispatch(getCurrentWeather({ city: city.name, unit }));

    if (city.country === 'IN') {
      setIndianCities((prev) =>
        prev.includes(city.name)
          ? prev
          : [city.name, ...prev].slice(0, 8)
      );
    } else {
      setInternationalCities((prev) =>
        prev.includes(city.name)
          ? prev
          : [city.name, ...prev].slice(0, 8)
      );
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
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
