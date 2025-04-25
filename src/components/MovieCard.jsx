import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Plus, Check } from 'lucide-react';
import { getImageUrl } from '../services/api';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

const MovieCard = ({ movie, mediaType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();
  const { currentUser } = useAuth();
  
  const isInList = currentUser && isInWatchlist(movie.id);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (isInList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        ...movie,
        media_type: mediaType
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/${mediaType}/${movie.id}`);
  };

  return (
    <div 
      className="movie-card relative flex-shrink-0 w-36 sm:w-44 md:w-48 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title || movie.name} 
        className="w-full h-auto rounded-md shadow-md"
        loading="lazy"
      />

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/75 rounded-md flex flex-col p-3 animate-fade-in">
          <h3 className="font-semibold text-sm text-white mb-1">
            {movie.title || movie.name}
          </h3>

          <div className="flex items-center text-xs text-gray-400 mb-2">
            <span className="text-emerald-400 font-medium mr-2">{movie.vote_average?.toFixed(1)} ★</span>
            <span>{(movie.release_date || '').substring(0, 4) || 'N/A'}</span>
          </div>

          <p className="text-xs text-gray-300 mb-auto line-clamp-3">
            {movie.overview || 'No description available.'}
          </p>

          <div className="flex justify-between items-center mt-3">
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${mediaType}/${movie.id}`);
              }}
              aria-label="Play"
            >
              <Play size={16} />
            </button>

            <button 
              className={`p-1 rounded-full transition ${isInList ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}
              onClick={handleWatchlistToggle}
              aria-label={isInList ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {isInList ? <Check size={16} /> : <Plus size={16} />}
            </button>

            <button 
              className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${mediaType}/${movie.id}`);
              }}
              aria-label="More Info"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
