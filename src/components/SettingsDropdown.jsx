import { useDispatch, useSelector } from 'react-redux';
import { setUnit } from '../features/settings/settingsSlice';

function SettingsDropdown() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);

  return (
    <div className="settings-dropdown">
      <p className="settings-title">Temperature Unit</p>

      <button
        className={unit === 'metric' ? 'active' : ''}
        onClick={() => dispatch(setUnit('metric'))}
      >
        Celsius (°C)
      </button>

      <button
        className={unit === 'imperial' ? 'active' : ''}
        onClick={() => dispatch(setUnit('imperial'))}
      >
        Fahrenheit (°F)
      </button>
    </div>
  );
}

export default SettingsDropdown;
