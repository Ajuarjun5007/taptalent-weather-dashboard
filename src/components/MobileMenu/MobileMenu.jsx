import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '../../features/settings/settingsSlice';
import GoogleSignIn from '../Auth/GoogleSignIn';
import SignOutButton from '../Auth/SignOutButton';
import './MobileMenu.css';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Overlay */}
      {isOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}

      {/* Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Auth Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Account</h3>
            {user ? (
              <>
                <div className="sidebar-user-info">
                  <img src={user.photo} alt={user.name} />
                  <span>{user.name}</span>
                </div>
                <div onClick={closeMenu}>
                  <SignOutButton />
                </div>
              </>
            ) : (
              <div onClick={closeMenu}>
                <GoogleSignIn />
              </div>
            )}
          </div>

          {/* Temperature Unit Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Temperature Unit</h3>
            <div className="sidebar-unit-toggle">
              <button
                className={`toggle-btn ${unit === 'metric' ? 'active' : ''}`}
                onClick={() => {
                  dispatch(toggleUnit());
                }}
              >
                Celsius
              </button>
              <button
                className={`toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
                onClick={() => {
                  dispatch(toggleUnit());
                }}
              >
                Fahrenheit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
