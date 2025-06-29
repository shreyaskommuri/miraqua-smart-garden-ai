
import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Home, BarChart3, User, MessageSquare, Map } from "lucide-react";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AccountScreen from "../screens/AccountScreen";
import MapOverviewScreen from "../screens/MapOverviewScreen";
import FarmerChatScreen from "../screens/FarmerChatScreen";
import { cn } from "@/lib/utils";

const MainTabs = () => {
  const location = useLocation();

  const tabs = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/app/map", icon: Map, label: "Map" },
    { path: "/app/chat", icon: MessageSquare, label: "AI Chat" },
    { path: "/app/account", icon: User, label: "Account" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/map" element={<MapOverviewScreen />} />
          <Route path="/chat" element={<FarmerChatScreen />} />
          <Route path="/account" element={<AccountScreen />} />
        </Routes>
      </div>
      
      {/* Fixed Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-2 py-1 z-40 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => {
            const active = isActive(tab.path);
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 transform min-w-0 flex-1",
                  active 
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 scale-105" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <Icon className={cn(
                    "w-5 h-5 mb-1 transition-colors duration-200", 
                    active && "text-blue-600"
                  )} />
                  {active && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200 truncate",
                  active ? "text-blue-600" : "text-gray-500"
                )}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainTabs;
