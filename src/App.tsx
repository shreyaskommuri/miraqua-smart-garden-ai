import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
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
            <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
            <Route path="/plot/:plotId/settings" element={<PlotSettingsScreen />} />
            <Route path="/plot/:plotId/day/:date" element={<SpecificDayScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
