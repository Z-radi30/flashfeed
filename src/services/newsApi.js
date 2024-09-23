import axios from 'axios';

const API_KEY = 'b236de36de114dfcbfe332c54dc9d19e'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getTopHeadlines = (country = 'us', category = '') => {
  return newsApi.get('/top-headlines', {
    params: {
      country,
      category,
    },
  });
};

export const searchNews = (query) => {
  return newsApi.get('/everything', {
    params: {
      q: query,
    },
  });
};