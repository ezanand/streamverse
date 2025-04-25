import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchTrending, fetchMoviesByGenre, fetchTVByGenre, searchMovies } from '../services/api';

const MovieContext = createContext(null);

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [tvByGenre, setTvByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const trendingData = await fetchTrending();
        setTrending(trendingData);
        
        const predefinedGenres = [
          { id: 'action', name: "Action" },
          { id: 'comedy', name: "Comedy" },
          { id: 'drama', name: "Drama" },
          { id: 'thriller', name: "Thriller" },
          { id: 'horror', name: "Horror" },
          { id: 'romance', name: "Romance" },
          { id: 'sci-fi', name: "Sci-Fi" },
          { id: 'adventure', name: "Adventure" }
        ];
        setGenres(predefinedGenres);
        
        const savedWatchlist = localStorage.getItem('netflix_watchlist');
        if (savedWatchlist) {
          setWatchlist(JSON.parse(savedWatchlist));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const loadMoviesByGenre = async (genreId) => {
    if (moviesByGenre[genreId]) return; 
    
    try {
      const movies = await fetchMoviesByGenre(genreId);
      setMoviesByGenre(prev => ({
        ...prev,
        [genreId]: movies
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTVByGenre = async (genreId) => {
    if (tvByGenre[genreId]) return;
    
    try {
      const tvShows = await fetchTVByGenre(genreId);
      setTvByGenre(prev => ({
        ...prev,
        [genreId]: tvShows
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const search = async (query) => {
    try {
      setLoading(true);
      const results = await searchMovies(query);
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (item) => {
    const newWatchlist = [...watchlist, item];
    setWatchlist(newWatchlist);
    localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (itemId) => {
    const newWatchlist = watchlist.filter(item => item.id !== itemId);
    setWatchlist(newWatchlist);
    localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (itemId) => {
    return watchlist.some(item => item.id === itemId);
  };

  const value = {
    trending,
    genres,
    moviesByGenre,
    tvByGenre,
    watchlist,
    loading,
    error,
    loadMoviesByGenre,
    loadTVByGenre,
    search,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};