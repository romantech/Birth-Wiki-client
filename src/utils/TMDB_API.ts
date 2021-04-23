import axios from 'axios';

const TMDB_API = axios.create({
  baseURL: `https://api.themoviedb.org/3/search`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export default TMDB_API;
