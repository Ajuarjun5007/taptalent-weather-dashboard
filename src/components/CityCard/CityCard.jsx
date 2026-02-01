function CityCard({ data }) {
  if (!data) return null;

  return (
    <div className="city-card">
      <div className="card-header">
        <h3>{data.name}</h3>
        <span className="temp">{Math.round(data.main.temp)}°</span>
      </div>

      <p className="condition">{data.weather[0].main}</p>

      <div className="card-details">
        <div>
          💧 <span>{data.main.humidity}%</span>
        </div>
        <div>
          💨 <span>{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
