import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="theme-toggle-container relative flex items-center rounded-full p-1 border border-white/20 bg-white/5 backdrop-blur-sm">
      {/* Sliding indicator */}
      <div
        className={`absolute h-8 w-8 rounded-full bg-primary-500 shadow-lg transition-transform duration-300 ease-out ${
          theme === 'light' ? 'translate-x-0' : 'translate-x-8'
        }`}
      />

      {/* Light mode button */}
      <button
        onClick={() => toggleTheme('light')}
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
          theme === 'light' ? 'text-white' : 'text-white/50 hover:text-white/80'
        }`}
        aria-label="Light mode"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {/* Dark mode button */}
      <button
        onClick={() => toggleTheme('dark')}
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-white/50 hover:text-white/80'
        }`}
        aria-label="Dark mode"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  );
}
