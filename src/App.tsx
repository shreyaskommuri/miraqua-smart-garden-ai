
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import AppNavigator from './components/navigation/AppNavigator';

function App() {
  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Add manifest link to head
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    return () => {
      if (document.head.contains(manifestLink)) {
        document.head.removeChild(manifestLink);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <AppNavigator />
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
