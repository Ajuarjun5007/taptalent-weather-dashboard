import { useDispatch, useSelector } from 'react-redux';
import { setUnit } from '../features/settings/settingsSlice';
import { IoClose } from 'react-icons/io5';

export default function SettingsModal({ onClose }) {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Settings</h3>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="unit-toggle">
          <button
            className={unit === 'metric' ? 'active' : ''}
            onClick={() => dispatch(setUnit('metric'))}
          >
            °C Celsius
          </button>

          <button
            className={unit === 'imperial' ? 'active' : ''}
            onClick={() => dispatch(setUnit('imperial'))}
          >
            °F Fahrenheit
          </button>
        </div>
      </div>
    </div>
  );
}
