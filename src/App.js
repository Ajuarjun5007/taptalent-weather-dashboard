import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CityDetailsPage from './pages/CityDetailsPage';
import FullPageLoader from './components/Loader/FullPageLoader';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <FullPageLoader visible />;

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
