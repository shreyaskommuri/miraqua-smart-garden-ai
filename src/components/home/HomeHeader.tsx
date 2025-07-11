
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

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/app/analytics")}>
                <BarChart3 className="w-4 h-4" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" onClick={() => navigate("/app/account")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="p-6 pb-0">
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
    </>
  );
};
