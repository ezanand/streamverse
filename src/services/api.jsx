import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = 'http://www.omdbapi.com';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';

const transformMovieData = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  name: movie.Title,
  poster_path: movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMAGE,
  backdrop_path: movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMAGE,
  overview: movie.Plot,
  vote_average: parseFloat(movie.imdbRating) || 0,
  release_date: movie.Year,
  media_type: movie.Type === 'series' ? 'tv' : 'movie'
});

const fetchMovies = async (searchTerm, type = 'movie') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/?apikey=${API_KEY}&s=${searchTerm}&type=${type}`);
    if (response.data.Response === 'True') {
      const detailedMovies = await Promise.all(
        response.data.Search.slice(0, 10).map(async (movie) => {
          const detailResponse = await axios.get(`${API_BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`);
          return transformMovieData(detailResponse.data);
        })
      );
      return detailedMovies;
    }
    return [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchTrending = () => {
  const genres = ['action', 'drama', 'comedy', 'thriller'];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  return fetchMovies(randomGenre);
};

export const fetchMoviesByGenre = (genre) => fetchMovies(genre, 'movie');
export const fetchTVByGenre = (genre) => fetchMovies(genre, 'series');

export const searchMovies = async (query) => {
  const [movies, series] = await Promise.all([
    fetchMovies(query, 'movie'),
    fetchMovies(query, 'series')
  ]);
  return [...movies, ...series];
};

export const getDetails = async (id, type = 'movie') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
    if (response.data.Response === 'True') {
      const details = response.data;
      const genre = details.Genre?.split(',')[0].trim() || '';
      const similarResponse = await axios.get(`${API_BASE_URL}/?apikey=${API_KEY}&s=${genre}&type=${type}`);
      const similar = similarResponse.data.Response === 'True'
        ? similarResponse.data.Search.filter(item => item.imdbID !== id).slice(0, 6)
        : [];

      return {
        ...transformMovieData(details),
        genres: details.Genre?.split(',').map((g, index) => ({
          id: index + 1,
          name: g.trim()
        })) || [],
        runtime: parseInt(details.Runtime) || 0,
        tagline: details.Plot?.split('.')[0] + '.',
        status: 'Released',
        similar: similar.map(item => transformMovieData(item)),
        credits: {
          cast: details.Actors?.split(',').map((actor, index) => ({
            id: index + 1,
            name: actor.trim(),
            character: '',
            profile_path: null
          })) || []
        }
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching details:', error);
    return null;
  }
};

export const getImageUrl = (path) => {
  return path && path !== 'N/A' ? path : PLACEHOLDER_IMAGE;
};
