
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('miraqua-theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    const updateTheme = () => {
      let actualTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        actualTheme = theme;
      }
      
      setResolvedTheme(actualTheme);
      
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      // Add new theme class
      root.classList.add(actualTheme);
      
      // Update CSS custom properties for better theme support
      if (actualTheme === 'dark') {
        root.style.setProperty('--background', '222.2 84% 4.9%');
        root.style.setProperty('--foreground', '210 40% 98%');
        root.style.setProperty('--card', '222.2 84% 4.9%');
        root.style.setProperty('--card-foreground', '210 40% 98%');
        root.style.setProperty('--popover', '222.2 84% 4.9%');
        root.style.setProperty('--popover-foreground', '210 40% 98%');
        root.style.setProperty('--primary', '142.1 76.2% 36.3%');
        root.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
        root.style.setProperty('--secondary', '217.2 32.6% 17.5%');
        root.style.setProperty('--secondary-foreground', '210 40% 98%');
        root.style.setProperty('--muted', '217.2 32.6% 17.5%');
        root.style.setProperty('--muted-foreground', '215 20.2% 65.1%');
        root.style.setProperty('--accent', '217.2 32.6% 17.5%');
        root.style.setProperty('--accent-foreground', '210 40% 98%');
        root.style.setProperty('--destructive', '0 62.8% 30.6%');
        root.style.setProperty('--destructive-foreground', '210 40% 98%');
        root.style.setProperty('--border', '217.2 32.6% 17.5%');
        root.style.setProperty('--input', '217.2 32.6% 17.5%');
        root.style.setProperty('--ring', '142.1 76.2% 36.3%');
      } else {
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '222.2 84% 4.9%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--popover', '0 0% 100%');
        root.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--primary', '142.1 76.2% 36.3%');
        root.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
        root.style.setProperty('--secondary', '210 40% 96%');
        root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--muted', '210 40% 96%');
        root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
        root.style.setProperty('--accent', '210 40% 96%');
        root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
        root.style.setProperty('--destructive', '0 84.2% 60.2%');
        root.style.setProperty('--destructive-foreground', '210 40% 98%');
        root.style.setProperty('--border', '214.3 31.8% 91.4%');
        root.style.setProperty('--input', '214.3 31.8% 91.4%');
        root.style.setProperty('--ring', '142.1 76.2% 36.3%');
      }
      
      localStorage.setItem('miraqua-theme', theme);
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
