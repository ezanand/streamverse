import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { getImageUrl } from '../services/api';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useMovies();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const searchResults = await search(query);
        setResults(searchResults.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query, search]);

  const handleResultClick = (item) => {
    navigate(`/${item.media_type}/${item.id}`);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies or TV shows"
          className="w-full bg-netflixDarkGray border border-gray-700 text-white px-4 py-2 pr-10 rounded-l focus:outline-none"
        />
        <button 
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-r transition-colors"
        >
          <SearchIcon size={18} />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-16 text-gray-400 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X size={18} />
        </button>
      </form>

      {query.trim().length >= 2 && (
        <div className="absolute top-full left-0 w-full bg-netflixDarkGray mt-1 rounded-md shadow-lg z-50 max-h-96 overflow-auto animate-fade-in">
          {loading && results.length === 0 ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={`${item.id}-${item.media_type}`} className="border-b border-gray-700 last:border-0">
                  <button
                    onClick={() => handleResultClick(item)}
                    className="flex items-center p-3 w-full text-left hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={getImageUrl(item.poster_path, 'w92')}
                      alt={item.title || item.name}
                      className="w-12 h-18 object-cover rounded mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{item.title || item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                    </div>
                  </button>
                </li>
              ))}
              <li className="p-2">
                <button
                  onClick={handleSubmit}
                  className="w-full text-center text-sm text-gray-300 hover:text-white p-2"
                >
                  See all results for "{query}"
                </button>
              </li>
            </ul>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center text-gray-400">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
