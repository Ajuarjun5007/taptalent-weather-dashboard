import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
const [selectedCity, setSelectedCity] = useState(null);

  // Debounced autocomplete
  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct`,
          {
            params: {
              q: query,
              limit: 15,
              appid: API_KEY,
            },
          }
        );
       setSuggestions((res.data || []).slice(0, 6));

      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

 const handleSelect = (city) => {
  setQuery(`${city.name}, ${city.country}`);
  setSelectedCity(city);
  setSuggestions([]);
};

const handleAdd = () => {
  if (!selectedCity) {
    alert('Please select a city from the suggestions');
    return;
  }

  onSearch(selectedCity);
  setQuery('');
  setSelectedCity(null);
};


  return (
   <div className="search-container">
  <div className="search-input-wrapper">
    <input
      type="text"
      placeholder="Search city (e.g. Delhi)"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    {suggestions.length > 0 && (
      <ul className="autocomplete-list">
        {suggestions.map((city, idx) => (
          <li key={idx} onClick={() => handleSelect(city)}>
            <strong>{city.name}</strong>
            {city.state ? `, ${city.state}` : ''}, {city.country}
          </li>
        ))}
      </ul>
    )}
  </div>

  <button onClick={handleAdd}>Add</button>
</div>

  );
}

export default SearchBar;
