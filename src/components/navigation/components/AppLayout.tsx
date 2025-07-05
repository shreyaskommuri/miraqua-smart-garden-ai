
import React from "react";
import AdvancedNavigation from "@/components/navigation/AdvancedNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <AdvancedNavigation />
    <div className="flex-1 overflow-y-auto lg:ml-72">
      {children}
    </div>
  </div>
);
