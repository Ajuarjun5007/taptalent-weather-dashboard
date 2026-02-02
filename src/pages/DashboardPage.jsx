import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../features/weather/weatherSlice';
import CityCard from '../components/CityCard/CityCard';
import CitySkeleton from '../components/CityCard/CitySkeleton';
import SearchBar from '../components/SearchBar/SearchBar';
import { toggleUnit } from '../features/settings/settingsSlice';
import GoogleSignIn from '../components/Auth/GoogleSignIn';
import SignOutButton from '../components/Auth/SignOutButton';
import MobileMenu from '../components/MobileMenu/MobileMenu';
function DashboardPage() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);
  const user = useSelector((state) => state.auth.user);
  const settingsRef = useRef(null);
  // City lists
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
    'Sydney',
    'Toronto',
    'Paris',
    'Tokyo',
    'Dubai',
    'Singapore',
    
  ]);

  const weatherCities = useSelector((state) => state.weather.cities);
  const favorites = useSelector((state) => state.favorites.cities);

  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);

  
  useEffect(() => {
  const allCities = [...indianCities, ...internationalCities];
  allCities.forEach(city => {
    dispatch(getCurrentWeather({ city, unit }));
  });
}, [dispatch, unit, indianCities, internationalCities]);


  // Split pinned vs normal
  const pinnedIndian = indianCities.filter((c) => favorites.includes(c));
  const normalIndian = indianCities.filter((c) => !favorites.includes(c));

  const pinnedInternational = internationalCities.filter((c) =>
    favorites.includes(c)
  );
  const normalInternational = internationalCities.filter(
    (c) => !favorites.includes(c)
  );

  const visibleIndian = showMoreIndian
    ? normalIndian.slice(0, 8)
    : normalIndian.slice(0, 4);

  const visibleInternational = showMoreInternational
    ? normalInternational.slice(0, 8)
    : normalInternational.slice(0, 4);

  // Add city from search
  const handleSearch = (city) => {
    dispatch(getCurrentWeather({ city: city.name, unit }));

    if (city.country === 'IN') {
      setIndianCities((prev) =>
        prev.includes(city.name) ? prev : [city.name, ...prev]
      );
    } else {
      setInternationalCities((prev) =>
        prev.includes(city.name) ? prev : [city.name, ...prev]
      );
    }
  };
useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="app-container">
      {/* Mobile Menu */}
      <MobileMenu />

      {/* Header */}
      <div className="dashboard-header">
  <div className='dashboard-header-content'>
    <div>
 <h1 className="app-title">TapTalent Weather Analytics Dashboard</h1>
    <p className="app-subtitle">
      Real-time weather insights across major cities
    </p>
    </div>
   
    <div className="auth-area desktop-only">
  {user ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div className="user-info">
        <img src={user.photo} alt={user.name} />
        <span>{user.name}</span>
      </div>
      <SignOutButton />
    </div>
  ) : (
    <GoogleSignIn />
  )}
</div>
  </div>
</div>

  <div className="search-settings-row">
    <SearchBar onSearch={handleSearch} />
    <div className="unit-toggle-container desktop-only">
      <label className="toggle-label">Temperature Unit</label>
      <div className="unit-toggle-switch">
        <button
          className={`toggle-btn ${unit === 'metric' ? 'active' : ''}`}
          onClick={() => dispatch(toggleUnit())}
        >
          Celsius
        </button>
        <button
          className={`toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
          onClick={() => dispatch(toggleUnit())}
        >
          Fahrenheit
        </button>
      </div>
    </div>
  </div>

{/* <div className="dashboard-actions">
  <button
    className="settings-btn"
    onClick={() => setShowSettings(true)}
  >
    <FiSettings />
    <span>Settings</span>
  </button>
</div> */}

{/* {showSettings && (
  <SettingsModal onClose={() => setShowSettings(false)} />
)} */}

      {/* 📌 PINNED */}
      {favorites.length > 0 && (
        <section className="city-section pinned">
          <h2 className="section-title">📌 Pinned Cities</h2>
          <div className="card-grid">
            {[...pinnedIndian, ...pinnedInternational].map((city) =>
              weatherCities[city] ? (
                <CityCard key={city} data={weatherCities[city]} pinned />
              ) : (
                <CitySkeleton key={city} />
              )
            )}
          </div>
        </section>
      )}

      {/* 🇮🇳 Indian Cities */}
      <section className="city-section">
        <h2 className="section-title">🇮🇳 Indian Cities</h2>
        <div className="card-grid">
          {visibleIndian.map((city) =>
            weatherCities[city] ? (
              <CityCard key={city} data={weatherCities[city]} />
            ) : (
              <CitySkeleton key={city} />
            )
          )}
        </div>

        {!showMoreIndian && normalIndian.length > 4 && (
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
          {visibleInternational.map((city) =>
            weatherCities[city] ? (
              <CityCard key={city} data={weatherCities[city]} />
            ) : (
              <CitySkeleton key={city} />
            )
          )}
        </div>

        {!showMoreInternational && normalInternational.length > 4 && (
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
