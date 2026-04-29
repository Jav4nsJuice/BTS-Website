import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const current = document.documentElement.getAttribute('data-theme');
    return (current === 'dark' ? 'dark' : 'light') as Theme;
  });

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme as Theme);
    };

    window.addEventListener('themeChange', updateTheme);
    return () => window.removeEventListener('themeChange', updateTheme);
  }, []);

  return theme;
};