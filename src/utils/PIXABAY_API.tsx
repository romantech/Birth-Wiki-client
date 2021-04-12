import axios from 'axios';

const PIXABAY_API = axios.create({
  baseURL: `https://pixabay.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.REACT_APP_PIXABAY_API_KEY,
    safesearch: true,
    orientation: 'vertical',
    // per_page: 10,
  },
});

export default PIXABAY_API;
