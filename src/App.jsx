import React, { useState, useEffect } from 'react';
import { getTopHeadlines, searchNews } from './services/newsApi';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';
import ArticleDetails from './components/ArticleDetails';
import ErrorMessage from './components/ErrorMessage';
import ThemeSwitcher from './components/ThemeSwitcher';

const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);
    console.log('Fetching news...', { query, selectedCategory });
    try {
      const response = query
        ? await searchNews(query)
        : await getTopHeadlines('us', selectedCategory);
      console.log('API response:', response);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">FlashFeed</h1>
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="mb-6 flex flex-wrap justify-center gap-2">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => handleCategoryChange(category)}
      className={`px-3 py-1 rounded ${
        selectedCategory === category ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content'
      }`}
    >
      {category}
    </button>
  ))}
</div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <ErrorMessage message={error} />}
        {articles.length === 0 && !loading && !error && (
          <p className="text-center text-base-content">No articles found. Try a different search or category.</p>
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
    </div>
  );
};

export default App;