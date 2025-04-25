import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, mediaType = 'movie' }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = direction === 'left'
        ? current.scrollLeft - (current.offsetWidth - 200)
        : current.scrollLeft + (current.offsetWidth - 200);
      
      current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 px-4 md:px-6">{title}</h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/60 p-2 rounded-full z-10 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        
        {/* Movie row */}
        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide py-4 px-4 md:px-6"
        >
          {movies.map((movie) => (
            <MovieCard 
              key={`${movie.id}-${mediaType}`} 
              movie={movie} 
              mediaType={movie.media_type || mediaType} 
            />
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/60 p-2 rounded-full z-10 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
