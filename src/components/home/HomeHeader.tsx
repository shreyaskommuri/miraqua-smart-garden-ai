
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
