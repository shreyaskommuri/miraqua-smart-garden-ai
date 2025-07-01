import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, 
  BarChart3, 
  Map, 
  MessageSquare, 
  User, 
  Settings,
  Bell,
  Wifi,
  WifiOff,
  Menu,
  X,
  Search,
  Plus,
  Zap,
  Target,
  Users,
  Shield,
  Store,
  Eye,
  Camera,
  Leaf,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: number;
  subItems?: NavItem[];
}

const navigationItems: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home, path: '/app/home' },
  { 
    id: 'analytics', 
    label: 'AI Analytics', 
    icon: BarChart3, 
    path: '/app/analytics',
    subItems: [
      { id: 'predictive', label: 'Predictive Dashboard', icon: Target, path: '/app/analytics/predictive' },
      { id: 'anomalies', label: 'Anomaly Alerts', icon: Zap, path: '/app/analytics/anomalies' },
      { id: 'plant-health', label: 'Plant Health Scanner', icon: Camera, path: '/app/analytics/plant-health' },
      { id: 'yield', label: 'Yield Forecast', icon: Leaf, path: '/app/analytics/yield' }
    ]
  },
  { id: 'map', label: 'Smart Map', icon: Map, path: '/app/map' },
  { id: 'chat', label: 'AI Assistant', icon: MessageSquare, path: '/app/chat', badge: 3 },
  { 
    id: 'community', 
    label: 'Community', 
    icon: Users, 
    path: '/app/community'
  },
  { 
    id: 'marketplace', 
    label: 'Marketplace', 
    icon: Store, 
    path: '/app/marketplace',
    badge: 2
  },
  { id: 'account', label: 'Account', icon: User, path: '/app/account' }
];

const AdvancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id} className={cn("w-full", isSubItem && "ml-4")}>
        <div
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
            active 
              ? "bg-green-600 text-white shadow-sm" 
              : "text-gray-700 hover:bg-gray-50",
            isSubItem && "py-2 text-sm rounded-lg"
          )}
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(item.id);
            } else {
              navigate(item.path);
              setIsOpen(false);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg transition-all duration-200",
              active 
                ? "bg-white/20" 
                : "bg-gray-100 group-hover:bg-white",
              isSubItem && "p-1.5"
            )}>
              <Icon className={cn(
                "w-4 h-4 transition-colors duration-200",
                active ? "text-white" : "text-gray-600 group-hover:text-gray-900",
                isSubItem && "w-3.5 h-3.5"
              )} />
            </div>
            <span className={cn(
              "font-medium transition-colors duration-200",
              active ? "text-white" : "text-gray-700 group-hover:text-gray-900"
            )}>
              {item.label}
            </span>
            {item.badge && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </Badge>
            )}
          </div>
          {hasSubItems && (
            <div className={cn(
              "transform transition-transform duration-200",
              isExpanded ? "rotate-90" : "rotate-0"
            )}>
              <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45"></div>
            </div>
          )}
        </div>
        
        {hasSubItems && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.subItems!.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="hover:bg-gray-100 rounded-xl p-2"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-900">
                Miraqua
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-xl">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs text-gray-600 font-medium">
                {isOnline ? "Live" : "Offline"}
              </span>
            </div>
            
            <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-xl p-2">
              <Bell className="w-5 h-5 text-gray-700" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                7
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-100 lg:bg-white lg:z-40">
        <div className="flex items-center justify-start h-20 border-b border-gray-100 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              Miraqua
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="space-y-2">
            {navigationItems.map(item => renderNavItem(item))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="text-sm font-semibold text-gray-700 mb-6 px-2">Quick Actions</div>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 h-auto"
                onClick={() => navigate('/add-plot')}
              >
                <div className="p-2 bg-green-100 rounded-xl mr-3">
                  <Plus className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Add New Plot</div>
                  <div className="text-xs text-gray-500">Expand your garden</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 h-auto"
                onClick={() => navigate('/app/analytics/plant-health')}
              >
                <div className="p-2 bg-blue-100 rounded-xl mr-3">
                  <Camera className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Scan Plants</div>
                  <div className="text-xs text-gray-500">Check plant health</div>
                </div>
              </Button>
            </div>
          </div>
        </ScrollArea>
        
        {/* Status Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isOnline ? "bg-green-500" : "bg-red-500"
              )}></div>
              <span className="text-gray-600 font-medium">
                {isOnline ? "System Online" : "Offline Mode"}
              </span>
            </div>
            <Shield className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex flex-col w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Miraqua
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100 rounded-xl p-2"
              >
                <X className="w-5 h-5 text-gray-700" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 px-6 py-8">
              <div className="space-y-2">
                {navigationItems.map(item => renderNavItem(item))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedNavigation;
