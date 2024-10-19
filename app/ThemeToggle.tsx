'use client';

import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    const newTheme = theme === 'acid' ? 'dark' : 'acid';
    setTheme(newTheme);
  };

  // Apply the theme to the document when theme state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <button 
      className="btn btn-sm" 
      onClick={toggleTheme}
    >
      {theme === 'acid' ? (
        <FaMoon className="w-6 h-6" />
      ) : (
        <FaSun className="w-6 h-6" />
      )}
    </button>
  );
};
