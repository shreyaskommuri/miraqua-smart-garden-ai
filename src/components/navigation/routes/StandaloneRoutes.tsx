
import React from "react";
import { Route } from "react-router-dom";
import AddPlotScreen from "@/components/screens/AddPlotScreen";
import ReportsScreen from "@/components/screens/ReportsScreen";
import SensorManagementScreen from "@/components/screens/SensorManagementScreen";
import DeviceControlScreen from "@/components/screens/DeviceControlScreen";
import WeatherForecastScreen from "@/components/screens/WeatherForecastScreen";
import CollaborationScreen from "@/components/screens/CollaborationScreen";
import UserProfileScreen from "@/components/screens/UserProfileScreen";
import NotificationSettingsScreen from "@/components/screens/NotificationSettingsScreen";
import HelpScreen from "@/components/screens/HelpScreen";
import PlotDetailsScreen from "@/components/screens/PlotDetailsScreen";
import SpecificDayScreen from "@/components/screens/SpecificDayScreen";

export const StandaloneRoutes = () => (
  <>
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
    <Route path="/plot/:plotId" element={<PlotDetailsScreen />} />
    <Route path="/plot/:plotId/day/:day" element={<SpecificDayScreen />} />
  </>
);
