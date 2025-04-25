import React from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

const HeroBanner = ({ item }) => {
  if (!item) return null;

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${getImageUrl(item.backdrop_path, 'original')})`,
          height: '100%',
          width: '100%',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 md:pb-24 md:px-16 z-10">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {item.title || item.name}
          </h1>

          <div className="flex items-center text-sm mb-4 text-gray-300">
            <span className="bg-purple-600 text-white px-2 py-1 rounded mr-3">
              {parseFloat(item.vote_average).toFixed(1)} ★
            </span>
            <span>{item.release_date?.substring(0, 4) || "N/A"}</span>
            <span className="mx-2">•</span>
            <span>{item.media_type === 'movie' ? 'Movie' : 'Series'}</span>
          </div>

          <p className="text-lg md:text-xl mb-8 text-gray-200 line-clamp-3">
            {item.overview || "No description available for this title."}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/${item.media_type}/${item.id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded flex items-center transition-all"
            >
              <Play size={18} className="mr-2" />
              Stream Now
            </Link>
            <Link
              to={`/${item.media_type}/${item.id}`}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded flex items-center transition-all"
            >
              <Info size={18} className="mr-2" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
