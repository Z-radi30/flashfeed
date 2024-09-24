import React, { useState, useEffect } from 'react';
import { getTopHeadlines, searchNews } from './services/newsApi';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';
import ArticleDetails from './components/ArticleDetails';
import ErrorMessage from './components/ErrorMessage';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = query
        ? await searchNews(query)
        : await getTopHeadlines('us', selectedCategory);
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">FlashFeed</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1 rounded ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {articles.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No articles found. Try a different search or category.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} onClick={setSelectedArticle} />
        ))}
      </div>
      {selectedArticle && (
        <ArticleDetails article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
};

export default App;