import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const NewsCard = ({ article, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
      onClick={() => onClick(article)}
    >
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{article.source.name}</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;