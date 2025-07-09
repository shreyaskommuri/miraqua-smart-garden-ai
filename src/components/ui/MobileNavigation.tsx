import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Home, 
  BarChart3, 
  MapPin, 
  MessageSquare, 
  Users, 
  ShoppingCart, 
  Settings, 
  HelpCircle,
  User,
  Bell,
  X
} from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: "Home", path: "/app/home" },
    { icon: BarChart3, label: "Analytics", path: "/app/analytics" },
    { icon: MapPin, label: "Map Overview", path: "/app/map" },
    { icon: MessageSquare, label: "AI Chat", path: "/app/chat" },
    { icon: Users, label: "Community", path: "/app/community" },
    { icon: ShoppingCart, label: "Marketplace", path: "/app/marketplace" },
    { icon: Bell, label: "Notifications", path: "/notification-settings" },
    { icon: User, label: "Account", path: "/app/account" },
    { icon: Settings, label: "Settings", path: "/app/account" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <SheetTitle className="text-lg font-bold">Miraqua</SheetTitle>
                <p className="text-sm text-muted-foreground">Smart Irrigation</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="py-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start px-6 h-12 text-left hover:bg-muted/50"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};