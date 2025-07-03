
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Screen imports
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import OnboardingCropScreen from "@/components/screens/OnboardingCropScreen";
import OnboardingLocationScreen from "@/components/screens/OnboardingLocationScreen";
import OnboardingAdvancedSettingsScreen from "@/components/screens/OnboardingAdvancedSettingsScreen";
import OnboardingCompleteScreen from "@/components/screens/OnboardingCompleteScreen";
import SignInScreen from "@/components/screens/SignInScreen";
import SignUpScreen from "@/components/screens/SignUpScreen";
import ForgotPasswordScreen from "@/components/screens/ForgotPasswordScreen";
import AddPlotScreen from "@/components/screens/AddPlotScreen";

// Main app screens
import HomeScreen from "@/components/screens/HomeScreen";
import AnalyticsScreen from "@/components/screens/AnalyticsScreen";
import PredictiveDashboardScreen from "@/components/screens/PredictiveDashboardScreen";
import AnomalyAlertsScreen from "@/components/screens/AnomalyAlertsScreen";
import PlantHealthScannerScreen from "@/components/screens/PlantHealthScannerScreen";
import YieldForecastScreen from "@/components/screens/YieldForecastScreen";
import MapOverviewScreen from "@/components/screens/MapOverviewScreen";
import FarmerChatScreen from "@/components/screens/FarmerChatScreen";
import CommunityScreen from "@/components/screens/CommunityScreen";
import MarketplaceScreen from "@/components/screens/MarketplaceScreen";
import AccountScreen from "@/components/screens/AccountScreen";
import PlotDetailsScreen from "@/components/screens/PlotDetailsScreen";
import PlotSettingsScreen from "@/components/screens/PlotSettingsScreen";
import SpecificDayScreen from "@/components/screens/SpecificDayScreen";
import ReportsScreen from "@/components/screens/ReportsScreen";
import SensorManagementScreen from "@/components/screens/SensorManagementScreen";
import DeviceControlScreen from "@/components/screens/DeviceControlScreen";
import WeatherForecastScreen from "@/components/screens/WeatherForecastScreen";
import CollaborationScreen from "@/components/screens/CollaborationScreen";
import UserProfileScreen from "@/components/screens/UserProfileScreen";
import NotificationSettingsScreen from "@/components/screens/NotificationSettingsScreen";
import HelpScreen from "@/components/screens/HelpScreen";
import CalendarScreen from "@/components/screens/CalendarScreen";
import AdvancedNavigation from "@/components/navigation/AdvancedNavigation";

const AppNavigator = () => {
  return (
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
      <Route path="/onboarding/advanced" element={<OnboardingAdvancedSettingsScreen />} />
      <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />

      {/* Add Plot */}
      <Route path="/add-plot" element={<AddPlotScreen />} />

      {/* Standalone Features */}
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
              <Route path="/day/:plotId/:date" element={<SpecificDayScreen />} />
              <Route path="/calendar/:plotId" element={<CalendarScreen />} />
            </Routes>
          </div>
        </div>
      } />

      {/* Legacy redirects */}
      <Route path="/home" element={<Navigate to="/app/home" replace />} />
      <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
      <Route path="/map" element={<Navigate to="/app/map" replace />} />
      <Route path="/chat" element={<Navigate to="/app/chat" replace />} />
      <Route path="/community" element={<Navigate to="/app/community" replace />} />
      <Route path="/marketplace" element={<Navigate to="/app/marketplace" replace />} />
      <Route path="/account" element={<Navigate to="/app/account" replace />} />

      {/* Plot routes outside app */}
      <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
      <Route path="/plot/:plotId/day/:day" element={<SpecificDayScreen />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

export default AppNavigator;
