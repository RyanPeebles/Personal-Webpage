import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // Check for saved theme or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default fallback
  });

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-surface text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}