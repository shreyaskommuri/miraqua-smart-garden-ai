
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "./routes/AuthRoutes";
import { OnboardingRoutes } from "./routes/OnboardingRoutes";
import { StandaloneRoutes } from "./routes/StandaloneRoutes";
import { LegacyRedirects } from "./routes/LegacyRedirects";
import { MainAppRoutes } from "./routes/MainAppRoutes";

const AppNavigator = () => {
  return (
    <Routes>
      <AuthRoutes />
      <OnboardingRoutes />
      <StandaloneRoutes />
      <LegacyRedirects />
      <MainAppRoutes />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

export default AppNavigator;
