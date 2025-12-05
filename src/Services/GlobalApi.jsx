import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "549ef809c530fbe7d0f3add4b428a3dd"; // KEEP THIS SECRET IN A .env FILE IN PRODUCTION!

// Re-defining these for clarity, ensure your base URLs are correct
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=' + api_key;
const tvByGenreBaseURL = 'https://api.themoviedb.org/3/discover/tv?api_key=' + api_key;

// Simple cache utility
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
  set: (key, data, ttl = 300000) => { // 5 minutes default TTL
    const item = {
      data,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
};

const getTrendingVideos = () => {
  const cacheKey = 'trending_movies';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Using cached data for trending movies");
    return Promise.resolve({ data: cachedData });
  }
  const url = movieBaseUrl + "/trending/movie/day?api_key=" + api_key;
  console.log("API GET Request to:", url);
  return axios.get(url).then(resp => {
    cache.set(cacheKey, resp.data);
    return resp;
  });
}

const getTrendingTVShows = () => {
  const cacheKey = 'trending_tv';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Using cached data for trending TV shows");
    return Promise.resolve({ data: cachedData });
  }
  const url = movieBaseUrl + "/trending/tv/day?api_key=" + api_key;
  console.log("API GET Request to:", url);
  return axios.get(url).then(resp => {
    cache.set(cacheKey, resp.data);
    return resp;
  });
}

const getMovieByGenreId = (id) => {
  const url = movieByGenreBaseURL + "&with_genres=" + id;
  console.log("API GET Request to:", url);
  return axios.get(url);
}

const getSeriesByGenreId = (id) => {
  const cacheKey = `tv_genre_${id}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Using cached data for TV genre:", id);
    return Promise.resolve({ data: cachedData });
  }
  // Note: Since this is for TV shows, it's correct to use the TV base URL
  const url = tvByGenreBaseURL + "&with_genres=" + id;
  console.log("API GET Request to:", url);
  return axios.get(url).then(resp => {
    cache.set(cacheKey, resp.data);
    return resp;
  });
}

// NEW FUNCTION: Fetch the videos (trailers, clips, etc.) for a specific media item
const getVideosByMediaId = (id, type = 'movie') => {
    // type can be 'movie' or 'tv'
    const url = `${movieBaseUrl}/${type}/${id}/videos?api_key=${api_key}`;
    console.log(`API GET Request for Videos to: ${url}`);
    return axios.get(url);
}


export default {
  getTrendingVideos,
  getTrendingTVShows,
  getMovieByGenreId,
  getSeriesByGenreId,
  getVideosByMediaId // Export the new function
}
