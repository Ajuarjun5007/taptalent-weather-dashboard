import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';

function CityCard({ data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);

  if (!data) return null;

  const isFavorite = favorites.includes(data.name);

  return (
    <div className="city-card">
      <div className="card-header">
        <h3>{data.name}</h3>

        <span
          className={`star ${isFavorite ? 'active' : ''}`}
          onClick={() => dispatch(toggleFavorite(data.name))}
        >
          ★
        </span>
      </div>

      <p className="condition">{data.weather[0].main}</p>
      <div className="card-details">
        <div>🌡 {Math.round(data.main.temp)}°</div>
        <div>💧 {data.main.humidity}%</div>
      </div>
    </div>
  );
}

export default CityCard;
