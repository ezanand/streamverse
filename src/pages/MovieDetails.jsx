import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Clock, Film, User } from 'lucide-react';
import { getDetails, getImageUrl } from '../services/api';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import MovieRow from '../components/MovieRow';

const MOVIE_TRAILER_API_KEY = import.meta.env.VITE_MOVIE_TRAILER_API_KEY;  // Fetching from .env file

const MovieDetails = ({ type = 'movie' }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();
  const { currentUser } = useAuth();

  const isInList = currentUser && details && isInWatchlist(details.id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getDetails(id, type);
        setDetails(data);
        fetchTrailer(data.title || data.name);  // Fetch trailer based on the title or name
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id, type]);

  const fetchTrailer = async (title) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title} trailer&key=${MOVIE_TRAILER_API_KEY}`
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${data.items[0].id.videoId}`);
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
    } finally {
      setIsTrailerLoading(false);  // Once trailer is fetched (or failed), update the loading state
    }
  };

  const handleWatchlistToggle = () => {
    if (!currentUser || !details) return;

    if (isInList) {
      removeFromWatchlist(details.id);
    } else {
      addToWatchlist({
        ...details,
        media_type: type
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflixRed"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link to="/" className="btn-primary">Go Back Home</Link>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const title = type === 'movie' ? details.title : details.name;
  const releaseDate = type === 'movie'
    ? details.release_date
    : details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const runtime = details.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : '';

  return (
    <div className="min-h-screen bg-netflixBlack">
      {/* Backdrop */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(details.backdrop_path, 'original')})`
          }}
        >
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-12 z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>

              {details.tagline && (
                <p className="text-xl text-gray-300 mb-6 italic">"{details.tagline}"</p>
              )}

              <div className="flex flex-wrap items-center text-sm mb-6 text-gray-300 gap-3">
                <span className="flex items-center bg-netflixRed text-white px-2 py-1 rounded">
                  <Star size={16} className="mr-1" />
                  {details.vote_average.toFixed(1)}
                </span>

                {year && <span>{year}</span>}

                {runtime && (
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {runtime}
                  </span>
                )}

                {details.genres?.map((genre, index) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 px-2 py-1 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                {/* Play button */}
                <button className="btn-primary flex items-center">
                  <Play size={18} className="mr-2" />
                  Play
                </button>

                {!isTrailerLoading && trailerUrl && (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center"
                  >
                    <Play size={18} className="mr-2" />
                    Watch Trailer
                  </a>
                )}

                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center px-4 py-2 rounded transition-colors ${isInList
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                >
                  {isInList ? (
                    <>
                      <Check size={18} className="mr-2" />
                      In My List
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2" />
                      Add to My List
                    </>
                  )}
                </button>
              </div>

              <p className="text-lg">{details.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-12">
        {details.credits?.cast && details.credits.cast.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {details.credits.cast.slice(0, 6).map(person => (
                <div key={person.id} className="rounded overflow-hidden bg-netflixDarkGray shadow-lg">
                  {person.profile_path ? (
                    <img
                      src={getImageUrl(person.profile_path)}
                      alt={person.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                      <User size={40} className="text-gray-600" />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-medium">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {details.similar?.results && details.similar.results.length > 0 && (
          <MovieRow
            title={`More Like This`}
            movies={details.similar.results}
            mediaType={type}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
