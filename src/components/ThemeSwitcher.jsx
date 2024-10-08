import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle dark mode"
    >
      {/* Show Sun icon for dark mode, Moon icon for light mode */}
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;