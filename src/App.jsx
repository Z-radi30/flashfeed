import React, { useState, useEffect } from 'react';
import { getTopHeadlines, searchNews } from './services/newsApi';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = query
        ? await searchNews(query)
        : await getTopHeadlines();
      setArticles(response.data.articles);
    } catch (error) {
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchNews(query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">FlashFeed</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default App;