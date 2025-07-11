
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import {
  Bell,
  BarChart3,
  Settings,
  Search
} from "lucide-react";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  searchQuery,
  onSearchChange
}) => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getCurrentWeather = () => {
    // Mock weather data - would come from weather API
    return {
      temperature: 72,
      condition: "Sunny",
      humidity: 65,
      icon: "☀️"
    };
  };

  const weather = getCurrentWeather();

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Welcome Header */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {getGreeting()}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your gardens are looking great today
              </p>
            </div>
            
            {/* Weather Widget */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{weather.icon}</span>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {weather.temperature}°F
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {weather.condition}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search plots..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
};
