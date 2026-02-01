import { useDispatch, useSelector } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import { toggleUnit } from '../../features/settings/settingsSlice';

function SettingsButton() {
  const dispatch = useDispatch();
  const unit = useSelector(state => state.settings.unit);

  return (
    <button
      className="settings-btn"
      onClick={() => dispatch(toggleUnit())}
      title="Toggle °C / °F"
    >
      <FiSettings size={18} />
      <span>{unit === 'metric' ? '°C' : '°F'}</span>
    </button>
  );
}

export default SettingsButton;
