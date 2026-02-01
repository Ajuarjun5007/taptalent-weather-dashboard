import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { MdPushPin } from 'react-icons/md';

function CityCard({ data, pinned = false }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);

  const { name, main, weather, wind } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.description;

  const isFavorite = favorites.includes(name);

  return (
    <div className={`city-card ${pinned ? 'pinned-card' : ''}`}>
     {/* {pinned && (
  <div className="pin-badge">
    <MdPushPin />
  </div>
)} */}


      <div className="card-header">
        <h3 className="city-name">{name}</h3>
        <button
          className="favorite-btn"
          onClick={() => dispatch(toggleFavorite(name))}
        >
          {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
      </div>

      <div className="card-body">
        <div className="card-info">
          <p className="condition">{description}</p>

          <div className="stats">
            <div className="stat">
              <WiThermometer />
              <span>{Math.round(main.temp)}°</span>
            </div>
            <div className="stat">
              <WiHumidity />
              <span>{main.humidity}%</span>
            </div>
            <div className="stat">
              <WiStrongWind />
              <span>{wind.speed} m/s</span>
            </div>
          </div>
        </div>

        {icon && (
          <div className="weather-icon-box">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CityCard;
