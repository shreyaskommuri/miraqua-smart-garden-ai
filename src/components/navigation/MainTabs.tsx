
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
    { path: "/", icon: Home, label: "Home" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/chat", icon: MessageSquare, label: "AI Chat" },
    { path: "/account", icon: User, label: "Account" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/account" element={<AccountScreen />} />
        </Routes>
      </div>
      
      {/* Bottom Tab Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className={cn("w-6 h-6 mb-1", isActive && "text-blue-600")} />
                <span className={cn(
                  "text-xs font-medium",
                  isActive ? "text-blue-600" : "text-gray-500"
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
