
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { RealTimeProvider } from '@/components/ui/RealTimeUpdates';
import AdvancedNavigation from '@/components/navigation/AdvancedNavigation';

// Import all screens
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import OnboardingCropScreen from '@/components/screens/OnboardingCropScreen';
import OnboardingLocationScreen from '@/components/screens/OnboardingLocationScreen';
import OnboardingAdvancedSettingsScreen from '@/components/screens/OnboardingAdvancedSettingsScreen';
import OnboardingCompleteScreen from '@/components/screens/OnboardingCompleteScreen';
import SignInScreen from '@/components/screens/SignInScreen';
import SignUpScreen from '@/components/screens/SignUpScreen';
import ForgotPasswordScreen from '@/components/screens/ForgotPasswordScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import AnalyticsScreen from '@/components/screens/AnalyticsScreen';
import MapOverviewScreen from '@/components/screens/MapOverviewScreen';
import PlotDetailsScreen from '@/components/screens/PlotDetailsScreen';
import SpecificDayScreen from '@/components/screens/SpecificDayScreen';
import AddPlotScreen from '@/components/screens/AddPlotScreen';
import FarmerChatScreen from '@/components/screens/FarmerChatScreen';
import WeatherForecastScreen from '@/components/screens/WeatherForecastScreen';
import AccountScreen from '@/components/screens/AccountScreen';
import UserProfileScreen from '@/components/screens/UserProfileScreen';
import NotificationSettingsScreen from '@/components/screens/NotificationSettingsScreen';
import HelpScreen from '@/components/screens/HelpScreen';
import PredictiveDashboardScreen from '@/components/screens/PredictiveDashboardScreen';
import AnomalyAlertsScreen from '@/components/screens/AnomalyAlertsScreen';
import PlantHealthScannerScreen from '@/components/screens/PlantHealthScannerScreen';
import YieldForecastScreen from '@/components/screens/YieldForecastScreen';
import CommunityScreen from '@/components/screens/CommunityScreen';
import MarketplaceScreen from '@/components/screens/MarketplaceScreen';

function App() {
  return (
    <RealTimeProvider>
      <Router>
        <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <AdvancedNavigation />
          
          <main className="lg:ml-64">
            <Routes>
              {/* Welcome & Auth */}
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              
              {/* Onboarding Flow */}
              <Route path="/onboarding/crop" element={<OnboardingCropScreen />} />
              <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
              <Route path="/onboarding/advanced-settings" element={<OnboardingAdvancedSettingsScreen />} />
              <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />
              
              {/* Main App */}
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/analytics" element={<AnalyticsScreen />} />
              <Route path="/analytics/predictive" element={<PredictiveDashboardScreen />} />
              <Route path="/analytics/anomalies" element={<AnomalyAlertsScreen />} />
              <Route path="/analytics/plant-health" element={<PlantHealthScannerScreen />} />
              <Route path="/analytics/yield" element={<YieldForecastScreen />} />
              <Route path="/map" element={<MapOverviewScreen />} />
              <Route path="/add-plot" element={<AddPlotScreen />} />
              
              {/* Plot Management */}
              <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
              <Route path="/plot/:plotId/day/:day" element={<SpecificDayScreen />} />
              
              {/* Features */}
              <Route path="/chat" element={<FarmerChatScreen />} />
              <Route path="/weather" element={<WeatherForecastScreen />} />
              <Route path="/community" element={<CommunityScreen />} />
              <Route path="/marketplace" element={<MarketplaceScreen />} />
              
              {/* Account & Settings */}
              <Route path="/account" element={<AccountScreen />} />
              <Route path="/profile" element={<UserProfileScreen />} />
              <Route path="/notifications" element={<NotificationSettingsScreen />} />
              <Route path="/help" element={<HelpScreen />} />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </RealTimeProvider>
  );
}

export default App;
