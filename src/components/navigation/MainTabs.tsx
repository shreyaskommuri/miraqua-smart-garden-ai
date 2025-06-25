
import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Home, BarChart3, User, MessageSquare } from "lucide-react";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AccountScreen from "../screens/AccountScreen";
import { cn } from "@/lib/utils";

const MainTabs = () => {
  const location = useLocation();

  const tabs = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/chat", icon: MessageSquare, label: "AI Chat" },
    { path: "/app/account", icon: User, label: "Account" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app" || location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/account" element={<AccountScreen />} />
        </Routes>
      </div>
      
      {/* Enhanced Bottom Tab Navigation */}
      <div className="bg-white border-t border-gray-100 px-4 py-2 safe-area-pb shadow-lg">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const active = isActive(tab.path);
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform",
                  active 
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 scale-105 shadow-md" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mb-1 transition-colors duration-200", 
                  active && "text-blue-600"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  active ? "text-blue-600" : "text-gray-500"
                )}>
                  {tab.label}
                </span>
                {active && (
                  <div className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainTabs;
