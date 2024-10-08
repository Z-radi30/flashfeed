import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import SearchBar from './SearchBar';

const Navbar = ({ darkMode, toggleDarkMode, handleSearch }) => {
  return (
    <div className="navbar flex-col bg-base-100 pb-4">
      {/* Upper section with logo and theme switcher */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <a href="/" className="btn btn-ghost normal-case text-3xl font-bold">⚡FlashFeed</a>
        <div className="flex-1 flex justify-end">
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
      
      {/* Lower section with search bar */}
      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Navbar;