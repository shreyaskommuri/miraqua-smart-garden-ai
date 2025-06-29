
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainTabs from "./MainTabs";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OnboardingCropScreen from "../screens/OnboardingCropScreen";
import OnboardingLocationScreen from "../screens/OnboardingLocationScreen";
import OnboardingAdvancedSettingsScreen from "../screens/OnboardingAdvancedSettingsScreen";
import OnboardingCompleteScreen from "../screens/OnboardingCompleteScreen";
import AddPlotScreen from "../screens/AddPlotScreen";
import PlotDetailsScreen from "../screens/PlotDetailsScreen";
import SpecificDayScreen from "../screens/SpecificDayScreen";
import FarmerChatScreen from "../screens/FarmerChatScreen";
import HelpScreen from "../screens/HelpScreen";
import WeatherForecastScreen from "../screens/WeatherForecastScreen";
import ExportReportsScreen from "../screens/ExportReportsScreen";
import CollaborationScreen from "../screens/CollaborationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MapOverviewScreen from "../screens/MapOverviewScreen";
import ReportsScreen from "../screens/ReportsScreen";
import SensorManagementScreen from "../screens/SensorManagementScreen";
import DeviceControlScreen from "../screens/DeviceControlScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/onboarding/crop" element={<OnboardingCropScreen />} />
      <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
      <Route path="/onboarding/advanced" element={<OnboardingAdvancedSettingsScreen />} />
      <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />
      <Route path="/add-plot" element={<AddPlotScreen />} />
      <Route path="/plot/:id" element={<PlotDetailsScreen />} />
      <Route path="/plot/:id/day/:date" element={<SpecificDayScreen />} />
      <Route path="/chat" element={<FarmerChatScreen />} />
      <Route path="/help" element={<HelpScreen />} />
      <Route path="/weather" element={<WeatherForecastScreen />} />
      <Route path="/export" element={<ExportReportsScreen />} />
      <Route path="/collaboration" element={<CollaborationScreen />} />
      <Route path="/map" element={<MapOverviewScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
      <Route path="/sensors" element={<SensorManagementScreen />} />
      <Route path="/devices" element={<DeviceControlScreen />} />
      <Route path="/notifications" element={<NotificationSettingsScreen />} />
      <Route path="/profile" element={<UserProfileScreen />} />
      <Route path="/app/*" element={<MainTabs />} />
      <Route path="/*" element={<WelcomeScreen />} />
    </Routes>
  );
};

export default AppNavigator;
