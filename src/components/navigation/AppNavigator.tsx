
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
import MainTabs from "@/components/navigation/MainTabs";
import PlotDetailsScreen from "@/components/screens/PlotDetailsScreen";
import SpecificDayScreen from "@/components/screens/SpecificDayScreen";
import AddPlotScreen from "@/components/screens/AddPlotScreen";
import MapOverviewScreen from "@/components/screens/MapOverviewScreen";
import ReportsScreen from "@/components/screens/ReportsScreen";
import SensorManagementScreen from "@/components/screens/SensorManagementScreen";
import DeviceControlScreen from "@/components/screens/DeviceControlScreen";
import FarmerChatScreen from "@/components/screens/FarmerChatScreen";
import WeatherForecastScreen from "@/components/screens/WeatherForecastScreen";
import CollaborationScreen from "@/components/screens/CollaborationScreen";
import AccountScreen from "@/components/screens/AccountScreen";
import UserProfileScreen from "@/components/screens/UserProfileScreen";
import NotificationSettingsScreen from "@/components/screens/NotificationSettingsScreen";
import HelpScreen from "@/components/screens/HelpScreen";

const AppNavigator = () => {
  return (
    <Router>
      <Routes>
        {/* Welcome & Auth */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

        {/* Onboarding */}
        <Route path="/onboarding/crop" element={<OnboardingCropScreen />} />
        <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
        <Route path="/onboarding/advanced" element={<OnboardingAdvancedSettingsScreen />} />
        <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />

        {/* Main App */}
        <Route path="/app/*" element={<MainTabs />} />

        {/* Plot Management */}
        <Route path="/add-plot" element={<AddPlotScreen />} />
        <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
        <Route path="/plot/:plotId/day/:day" element={<SpecificDayScreen />} />

        {/* Features */}
        <Route path="/map" element={<MapOverviewScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/sensors" element={<SensorManagementScreen />} />
        <Route path="/devices" element={<DeviceControlScreen />} />
        <Route path="/chat" element={<FarmerChatScreen />} />
        <Route path="/weather" element={<WeatherForecastScreen />} />
        <Route path="/collaboration" element={<CollaborationScreen />} />

        {/* Settings & Profile */}
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/profile" element={<UserProfileScreen />} />
        <Route path="/notifications" element={<NotificationSettingsScreen />} />
        <Route path="/help" element={<HelpScreen />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;
