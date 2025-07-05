
import React from "react";
import { Route } from "react-router-dom";
import OnboardingCropScreen from "@/components/screens/OnboardingCropScreen";
import OnboardingLocationScreen from "@/components/screens/OnboardingLocationScreen";
import OnboardingAdvancedSettingsScreen from "@/components/screens/OnboardingAdvancedSettingsScreen";
import OnboardingCompleteScreen from "@/components/screens/OnboardingCompleteScreen";

export const OnboardingRoutes = () => (
  <>
    <Route path="/onboarding/crop" element={<OnboardingCropScreen />} />
    <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
    <Route path="/onboarding/advanced" element={<OnboardingAdvancedSettingsScreen />} />
    <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />
  </>
);
