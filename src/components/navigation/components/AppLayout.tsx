
import React from "react";
import AdvancedNavigation from "@/components/navigation/AdvancedNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <AdvancedNavigation />
    <div className="flex-1 overflow-hidden lg:ml-64">
      <div className="h-full overflow-y-auto pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  </div>
);
