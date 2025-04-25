import React from 'react';
import { useMovies } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const { watchlist } = useMovies();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-netflixBlack pt-24 pb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-white">My List</h2>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {watchlist.map((item) => (
              <MovieCard
                key={`${item.id}-${item.media_type}`}
                movie={item}
                mediaType={item.media_type}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-netflixDarkGray rounded-lg">
            <UserIcon size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-white">Your list is empty</h3>
            <p className="text-gray-400 mb-4">
              Add movies and TV shows to your list to watch them later
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Browse Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
