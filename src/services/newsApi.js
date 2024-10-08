import axios from 'axios';

// Use Vite's environment variable syntax
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Create axios instance with base configuration
const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Fetch top headlines with optional country and category parameters
export const getTopHeadlines = (country = 'us', category = '') => {
  return newsApi.get('/top-headlines', {
    params: {
      country,
      category,
    },
  });
};

// Search for news articles with a query
export const searchNews = (query) => {
  return newsApi.get('/everything', {
    params: {
      q: query,
    },
  });
};

export default newsApi;