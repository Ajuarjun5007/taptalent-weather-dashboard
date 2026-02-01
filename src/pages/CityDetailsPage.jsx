import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather, getForecast } from '../features/weather/weatherSlice';
import { FiArrowLeft } from 'react-icons/fi';
import TemperatureChart from '../components/Charts/TemperatureChart';
import WindHumidityChart from '../components/Charts/WindHumidityChart';

/* ---------- Helper: Group forecast by day ---------- */
function groupForecastByDay(list) {
  const days = {};

  list.forEach(item => {
    if (!item.dt_txt) return;

    const date = item.dt_txt.split(' ')[0];

    if (!days[date]) {
      days[date] = {
        temps: [],
        humidity: [],
        wind: [],
        label: new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
      };
    }

    days[date].temps.push(item.main.temp);
    days[date].humidity.push(item.main.humidity);
    days[date].wind.push(item.wind.speed);
  });

  return Object.values(days)
    .slice(0, 5)
    .map(day => ({
      label: day.label,
      temp: Math.round(
        day.temps.reduce((a, b) => a + b, 0) / day.temps.length
      ),
      humidity: Math.round(
        day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
      ),
      wind: Number(
        (
          day.wind.reduce((a, b) => a + b, 0) / day.wind.length
        ).toFixed(1)
      ),
    }));
}

function CityDetailsPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ---------- UI State ---------- */
  const [viewMode, setViewMode] = useState('hourly'); // hourly | daily
  const [range, setRange] = useState(24); // 24 | 48 | 120 (hours)

  /* ---------- Redux State ---------- */
  const cityWeather = useSelector(
    state => state.weather.cities[cityName]
  );

  const forecast = useSelector(
    state => state.weather.forecasts[cityName]
  );
const unit = useSelector(state => state.settings.unit);

  /* ---------- Fetch current weather (on refresh / direct load) ---------- */
  useEffect(() => {
    if (!cityWeather) {
      dispatch(getCurrentWeather({ city: cityName, unit }));
    }
  }, [cityWeather, cityName, unit, dispatch]);

  /* ---------- Fetch forecast once we have lat/lon ---------- */
  useEffect(() => {
    if (cityWeather && !forecast) {
      dispatch(
        getForecast({
          lat: cityWeather.coord.lat,
          lon: cityWeather.coord.lon,
          unit,
        })
      );
    }
  }, [cityWeather, forecast, unit, dispatch]);

  if (!cityWeather || !forecast) {
    return <div className="details-loading">Loading forecast…</div>;
  }

  /* ---------- DATA TRANSFORMATION ---------- */

  // Hourly data (range-aware)
  const hourlyPoints = range / 3; // 3-hour intervals
  const hourlyData = forecast.list
    .slice(0, hourlyPoints)
    .map(item => ({
      label: item.dt_txt.split(' ')[1].slice(0, 5),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      wind: item.wind.speed,
    }));

  // Daily data (always 5 days)
  const dailyData = groupForecastByDay(forecast.list);

  const chartData =
    viewMode === 'hourly' ? hourlyData : dailyData;

  /* ---------- UI ---------- */
  return (
    <div className="details-container">
     <button className="back-icon-btn" onClick={() => navigate(-1)}>
  <FiArrowLeft size={20} />
  <span>Back</span>
</button>

      {/* Summary */}
      <div className="details-header">
        <h1>{cityWeather.name}</h1>
        <p>
          {Math.round(cityWeather.main.temp)}° •{' '}
          {cityWeather.weather[0].description}
        </p>
      </div>

      {/* Hourly / Daily Toggle */}
      {/* <div className="chart-toggle">
        <button
          className={viewMode === 'hourly' ? 'active' : ''}
          onClick={() => setViewMode('hourly')}
        >
          Hourly
        </button>

        <button
          className={viewMode === 'daily' ? 'active' : ''}
          onClick={() => setViewMode('daily')}
        >
          Daily
        </button>
      </div> */}

      
      {/* {viewMode === 'hourly' && (
        <div className="range-selector">
          <button
            className={range === 24 ? 'active' : ''}
            onClick={() => setRange(24)}
          >
            24h
          </button>

          <button
            className={range === 48 ? 'active' : ''}
            onClick={() => setRange(48)}
          >
            48h
          </button>

          <button
            className={range === 120 ? 'active' : ''}
            onClick={() => setRange(120)}
          >
            5 Days
          </button>
        </div>
      )} */}
      <div className="controls-row">
  {/* View mode */}
  <div className="segmented">
    <button
      className={viewMode === 'hourly' ? 'active' : ''}
      onClick={() => setViewMode('hourly')}
    >
      Hourly
    </button>
    <button
      className={viewMode === 'daily' ? 'active' : ''}
      onClick={() => setViewMode('daily')}
    >
      Daily
    </button>
  </div>

  {/* Range selector */}
  <div className="range-pills">
    <button
      className={range === 24 ? 'active' : ''}
      onClick={() => setRange(24)}
    >
      24h
    </button>
    <button
      className={range === 48 ? 'active' : ''}
      onClick={() => setRange(48)}
    >
      48h
    </button>
    <button
      className={range === 120 ? 'active' : ''}
      onClick={() => setRange(120)}
    >
      5 Days
    </button>
  </div>
</div>


      {/* Charts */}
      <div className="charts-grid">
        <TemperatureChart
          data={chartData}
          mode={viewMode}
          range={range}
        />

        <WindHumidityChart
          data={chartData}
          mode={viewMode}
        />
      </div>
    </div>
  );
}

export default CityDetailsPage;
