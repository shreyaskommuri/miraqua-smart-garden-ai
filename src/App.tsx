
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import AdvancedNavigation from './components/navigation/AdvancedNavigation';
import HomeScreen from './components/screens/HomeScreen';
import AnalyticsScreen from './components/screens/AnalyticsScreen';
import PredictiveDashboardScreen from './components/screens/PredictiveDashboardScreen';
import AnomalyAlertsScreen from './components/screens/AnomalyAlertsScreen';
import PlantHealthScannerScreen from './components/screens/PlantHealthScannerScreen';
import YieldForecastScreen from './components/screens/YieldForecastScreen';
import MapOverviewScreen from './components/screens/MapOverviewScreen';
import FarmerChatScreen from './components/screens/FarmerChatScreen';
import CommunityScreen from './components/screens/CommunityScreen';
import MarketplaceScreen from './components/screens/MarketplaceScreen';
import AccountScreen from './components/screens/AccountScreen';
import PlotDetailsScreen from './components/screens/PlotDetailsScreen';
import PlotSettingsScreen from './components/screens/PlotSettingsScreen';
import SpecificDayScreen from './components/screens/SpecificDayScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import AddPlotScreen from './components/screens/AddPlotScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import SensorManagementScreen from './components/screens/SensorManagementScreen';
import DeviceControlScreen from './components/screens/DeviceControlScreen';
import WeatherForecastScreen from './components/screens/WeatherForecastScreen';
import CollaborationScreen from './components/screens/CollaborationScreen';
import UserProfileScreen from './components/screens/UserProfileScreen';
import NotificationSettingsScreen from './components/screens/NotificationSettingsScreen';
import HelpScreen from './components/screens/HelpScreen';

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
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            
            {/* Standalone Routes */}
            <Route path="/add-plot" element={<AddPlotScreen />} />
            <Route path="/reports" element={<ReportsScreen />} />
            <Route path="/sensors" element={<SensorManagementScreen />} />
            <Route path="/devices" element={<DeviceControlScreen />} />
            <Route path="/weather" element={<WeatherForecastScreen />} />
            <Route path="/weather/:plotId" element={<WeatherForecastScreen />} />
            <Route path="/collaboration" element={<CollaborationScreen />} />
            <Route path="/profile" element={<UserProfileScreen />} />
            <Route path="/notifications" element={<NotificationSettingsScreen />} />
            <Route path="/help" element={<HelpScreen />} />
            
            {/* Main App Routes with Navigation */}
            <Route path="/app/*" element={
              <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <AdvancedNavigation />
                <div className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/analytics" element={<AnalyticsScreen />} />
                    <Route path="/analytics/predictive" element={<PredictiveDashboardScreen />} />
                    <Route path="/analytics/anomalies" element={<AnomalyAlertsScreen />} />
                    <Route path="/analytics/plant-health" element={<PlantHealthScannerScreen />} />
                    <Route path="/analytics/yield" element={<YieldForecastScreen />} />
                    <Route path="/map" element={<MapOverviewScreen />} />
                    <Route path="/chat" element={<FarmerChatScreen />} />
                    <Route path="/community" element={<CommunityScreen />} />
                    <Route path="/marketplace" element={<MarketplaceScreen />} />
                    <Route path="/account" element={<AccountScreen />} />
                    
                    {/* Plot Detail Routes */}
                    <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
                    <Route path="/plot/:plotId/settings" element={<PlotSettingsScreen />} />
                    <Route path="/plot/:plotId/day/:date" element={<SpecificDayScreen />} />
                  </Routes>
                </div>
              </div>
            } />
            
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            
            {/* Legacy routes redirect */}
            <Route path="/home" element={<Navigate to="/app/home" replace />} />
            <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
            <Route path="/map" element={<Navigate to="/app/map" replace />} />
            <Route path="/chat" element={<Navigate to="/app/chat" replace />} />
            <Route path="/community" element={<Navigate to="/app/community" replace />} />
            <Route path="/marketplace" element={<Navigate to="/app/marketplace" replace />} />
            <Route path="/account" element={<Navigate to="/app/account" replace />} />
          </Routes>
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
