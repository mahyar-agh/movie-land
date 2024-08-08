import { useEffect, useRef } from 'react';
import { useKeyEvent } from '../hooks/useKeyEvent';

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKeyEvent('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
