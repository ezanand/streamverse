import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const { search } = useMovies();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      try {
        const searchResults = await search(query);
        setResults(searchResults);
      } catch (err) {
        setError('Error occurred while searching');
        console.error(err);
      }
    };

    performSearch();

  }, [query, search]);

  return (
    <div className="min-h-screen bg-netflixBlack pt-24 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-400 mb-8">
          {query ? `Showing results for "${query}"` : 'Enter a search term'}
        </p>

        {error ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map(item => (
              <MovieCard 
                key={`${item.id}-${item.media_type}`} 
                movie={item} 
                mediaType={item.media_type} 
              />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">No results found for "{query}"</p>
            <p className="mt-2 text-gray-500">Try a different search term</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
