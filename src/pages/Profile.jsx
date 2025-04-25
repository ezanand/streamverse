import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { watchlist } = useMovies();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-netflixBlack to-netflixDarkGray pt-24 pb-10 text-white">
  <div className="container mx-auto px-4">
    <div className="bg-netflixDarkGray/80 backdrop-blur-md rounded-xl p-8 mb-10 shadow-xl transition-all hover:shadow-2xl duration-300">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-netflixRed shadow-lg">
          <img 
            src={currentUser?.avatar || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-extrabold mb-1 tracking-wide">{currentUser?.name}</h1>
          <p className="text-gray-400 mb-5 italic">{currentUser?.email}</p>

          <div className="flex flex-wrap gap-4">
            <button className="btn-secondary flex items-center bg-gray-700 hover:bg-gray-600 transition-colors px-4 py-2 rounded">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold mb-6 border-b border-netflixRed pb-2">My List</h2>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlist.map(item => (
            <MovieCard 
              key={`${item.id}-${item.media_type}`} 
              movie={item} 
              mediaType={item.media_type} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-netflixDarkGray/60 rounded-lg shadow-md">
          <UserIcon size={48} className="mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your list is empty</h3>
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
</div>

  );
};

export default Profile;