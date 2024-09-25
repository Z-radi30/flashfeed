import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-base-300 text-base-content hover:bg-base-200 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun size={20} className="text-base-content" />
      ) : (
        <Moon size={20} className="text-base-content" />
      )}
    </button>
  );
};

export default ThemeSwitcher;