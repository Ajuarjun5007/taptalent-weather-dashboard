import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CityDetailsPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const cityData = useSelector(
    (state) => state.weather.cities[cityName]
  );

  if (!cityData) {
    return (
      <div className="app-container">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>Loading city data...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to Dashboard
      </button>

      <h1 className="app-title">{cityData.name}</h1>
      <p className="app-subtitle">{cityData.weather[0].description}</p>

      <div className="city-detail-card">
        <p>🌡 Temperature: {Math.round(cityData.main.temp)}°</p>
        <p>💧 Humidity: {cityData.main.humidity}%</p>
        <p>💨 Wind: {cityData.wind.speed} m/s</p>
        <p>🧭 Pressure: {cityData.main.pressure} hPa</p>
      </div>

      <p style={{ marginTop: '24px', opacity: 0.7 }}>
        Forecast charts coming next…
      </p>
    </div>
  );
}

export default CityDetailsPage;
