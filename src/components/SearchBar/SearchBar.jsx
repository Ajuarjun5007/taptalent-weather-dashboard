import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search city (e.g. Paris)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default SearchBar;
