import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "549ef809c530fbe7d0f3add4b428a3dd"; // Move to .env in production

// ----------------------------------------------------
// SIMPLE LOCAL STORAGE CACHE
// ----------------------------------------------------
const cache = {
  get: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  },
  set: (key, data, ttl = 300000) => {
    localStorage.setItem(
      key,
      JSON.stringify({ data, expiry: Date.now() + ttl })
    );
  },
};

// ----------------------------------------------------
// API FUNCTIONS
// ----------------------------------------------------

// ⭐ Trending Movies
const getTrendingMovies = () => {
  const cacheKey = "trending_movies";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/trending/movie/day?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Trending TV Shows
const getTrendingTVShows = () => {
  const cacheKey = "trending_tv";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/trending/tv/day?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Movies by Genre
const getMovieByGenreId = (id) => {
  return axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);
};

// ⭐ TV Shows by Genre
const getSeriesByGenreId = (id) => {
  const cacheKey = `tv_genre_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/discover/tv?api_key=${api_key}&with_genres=${id}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Upcoming Movies
const getUpcomingMovies = () => {
  const cacheKey = "upcoming_movies";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/movie/upcoming?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Recent Movies (Now Playing)
const getRecentMovies = () => {
  const cacheKey = "recent_movies";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/movie/now_playing?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Top Rated Movies
const getTopRatedMovies = () => {
  const cacheKey = "top_rated_movies";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  return axios.get(`${movieBaseUrl}/movie/top_rated?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Downloadable Movies (can be top rated or trending)
const getDownloadableMovies = () => {
  const cacheKey = "downloadable_movies";
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  // Here, using top-rated as downloadable for now
  return axios.get(`${movieBaseUrl}/movie/top_rated?api_key=${api_key}`)
    .then(resp => {
      cache.set(cacheKey, resp.data);
      return resp;
    });
};

// ⭐ Coming Soon by Genre (movies and tv)
const getComingSoonByGenreId = (id, type = "movie") => {
  const cacheKey = `coming_soon_${type}_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return Promise.resolve({ data: cached });

  let url = "";

  if (type === "movie") {
    if (id === "upcoming") {
      url = `${movieBaseUrl}/movie/upcoming?api_key=${api_key}`;
    } else {
      const today = new Date().toISOString().slice(0, 10);
      url = `${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}&primary_release_date.gte=${today}`;
    }
  } else {
    url = `${movieBaseUrl}/discover/tv?api_key=${api_key}&with_genres=${id}`;
  }

  return axios.get(url).then(resp => {
    cache.set(cacheKey, resp.data);
    return resp;
  });
};

// ⭐ Videos / Trailers
const getVideosByMediaId = (id, type = "movie") => {
  return axios.get(`${movieBaseUrl}/${type}/${id}/videos?api_key=${api_key}`);
};

// ----------------------------------------------------
// EXPORT
// ----------------------------------------------------
export default {
  getTrendingMovies,
  getTrendingTVShows,
  getMovieByGenreId,
  getSeriesByGenreId,
  getUpcomingMovies,
  getRecentMovies,
  getTopRatedMovies,
  getDownloadableMovies, // <- added for Download.jsx
  getComingSoonByGenreId,
  getVideosByMediaId,
};
