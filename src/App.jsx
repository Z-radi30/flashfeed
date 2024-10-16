import React, { useState, useEffect } from 'react';
import { getTopHeadlines, searchNews } from './services/newsApi';
import NewsCard from './components/NewsCard';
import ArticleDetails from './components/ArticleDetails';
import ErrorMessage from './components/ErrorMessage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
const ITEMS_PER_PAGE = 15; // Number of articles per page (3 rows of 5)

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]); // Fetch news when category changes

  useEffect(() => {
    // Update theme when darkMode changes
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = query
        ? await searchNews(query)
        : await getTopHeadlines('us', selectedCategory);
      setArticles(response.data.articles);
      setCurrentPage(1); // Reset to first page when fetching new articles
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

  // Pagination logic
  const indexOfLastArticle = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // Rendering Navbar component
    <div className="flex flex-col min-h-screen bg-base-100">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-screen-2xl">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleSearch={handleSearch}/>
        
    {/* Rendering Category selection buttons */}
        <div className="my-6 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-3xl font-bold ${
                selectedCategory === category ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Rendering Loading and error states */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <ErrorMessage message={error} />}
        {currentArticles.length === 0 && !loading && !error && (
          <p className="text-center text-base-content">No articles found. Try a different search or category.</p>
        )}

        {/* Rendering grid of NewsCard components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentArticles.map((article, index) => (
            <NewsCard key={index} article={article} onClick={setSelectedArticle} />
          ))}
        </div>

        {/* Rendering ArticleDetails component for the selected article */}
        {selectedArticle && (
          <ArticleDetails article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              <button className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`} onClick={() => paginate(1)}>1</button>
              <button className={`join-item btn ${currentPage === 2 ? 'btn-active' : ''}`} onClick={() => paginate(2)}>2</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;