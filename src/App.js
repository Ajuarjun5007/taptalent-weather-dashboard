import { useEffect, useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import FullPageLoader from './components/Loader/FullPageLoader';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // fade duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <FullPageLoader visible={showSplash} />
      {!showSplash && <DashboardPage />}
    </>
  );
}

export default App;
