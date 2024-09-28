import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const ArticleDetails = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
        {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover mb-4 rounded-lg " />
          )}
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          
          <p className="text-gray-600 mb-4">{article.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>{article.author ? `By ${article.author}` : 'Unknown Author'}</span>
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
          </div>
          <p className="mb-4">Source: {article.source.name}</p>
          <div className="flex justify-between items-center mt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline"
            >
              Read full article
            </a>
            <button
              onClick={onClose}
              className="bg-primary text-white px-4 py-2 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;