import React, { useEffect, useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

const Home = () => {
  const { trending, genres, loadMoviesByGenre, moviesByGenre, loadTVByGenre, tvByGenre, loading } = useMovies();
  const [featuredContent, setFeaturedContent] = useState(null);

  useEffect(() => {
    if (trending && trending.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, trending.length));
      setFeaturedContent(trending[randomIndex]);
    }
  }, [trending]);

  useEffect(() => {
    if (genres && genres.length > 0) {
      const homePageGenres = genres.slice(0, 3);
      homePageGenres.forEach(genre => {
        loadMoviesByGenre(genre.id);
        loadTVByGenre(genre.id);
      });
    }
  }, [genres, loadMoviesByGenre, loadTVByGenre]);

  if (loading && (!trending || trending.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflixRed"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflixBlack pb-10">
      {featuredContent && <HeroBanner item={featuredContent} />}
      
      <div className="container mx-auto mt-6">
        <MovieRow title="Trending Now" movies={trending} />
        
        {genres.slice(0, 3).map(genre => (
          <React.Fragment key={genre.id}>
            {moviesByGenre[genre.id] && (
              <MovieRow 
                title={`${genre.name} Movies`}
                movies={moviesByGenre[genre.id]} 
                mediaType="movie" 
              />
            )}
            
            {tvByGenre[genre.id] && (
              <MovieRow 
                title={`${genre.name} TV Shows`}
                movies={tvByGenre[genre.id]} 
                mediaType="tv" 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;