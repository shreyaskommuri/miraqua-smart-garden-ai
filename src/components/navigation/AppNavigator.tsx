
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

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/onboarding/crop" element={<OnboardingCropScreen />} />
      <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
      <Route path="/onboarding/advanced" element={<OnboardingAdvancedSettingsScreen />} />
      <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />
      <Route path="/add-plot" element={<AddPlotScreen />} />
      <Route path="/plot/:id" element={<PlotDetailsScreen />} />
      <Route path="/plot/:id/day/:date" element={<SpecificDayScreen />} />
      <Route path="/chat" element={<FarmerChatScreen />} />
      <Route path="/*" element={<MainTabs />} />
    </Routes>
  );
};

export default AppNavigator;
