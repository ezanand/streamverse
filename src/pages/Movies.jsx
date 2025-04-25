import React, { useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieRow from '../components/MovieRow';

const Movies = () => {
  const { genres, loadMoviesByGenre, moviesByGenre, loading } = useMovies();

  // Load movies by genre
  useEffect(() => {
    if (genres && genres.length > 0) {
      genres.forEach(genre => {
        loadMoviesByGenre(genre.id);
      });
    }
  }, [genres, loadMoviesByGenre]);

  if (loading && (!genres || genres.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflixRed"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflixBlack pt-24 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Movies</h1>
        
        {genres.map(genre => (
          <div key={genre.id}>
            {moviesByGenre[genre.id] && moviesByGenre[genre.id].length > 0 && (
              <MovieRow 
                title={genre.name} 
                movies={moviesByGenre[genre.id]} 
                mediaType="movie" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;