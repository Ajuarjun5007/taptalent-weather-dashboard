import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CityDetailsPage from './pages/CityDetailsPage';
import FullPageLoader from './components/Loader/FullPageLoader';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, logoutUser } from './features/auth/authSlice';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const dispatch = useDispatch();

  // Check Firebase auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photo: firebaseUser.photoURL,
          })
        );
      } else {
        // User is logged out
        dispatch(logoutUser());
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || authLoading) return <FullPageLoader visible />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/city/:cityName" element={<CityDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
