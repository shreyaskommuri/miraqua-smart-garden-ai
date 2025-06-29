
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
  Leaf
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
  { id: 'home', label: 'Dashboard', icon: Home, path: '/home' },
  { 
    id: 'analytics', 
    label: 'AI Analytics', 
    icon: BarChart3, 
    path: '/analytics',
    subItems: [
      { id: 'predictive', label: 'Predictive Dashboard', icon: Target, path: '/analytics/predictive' },
      { id: 'anomalies', label: 'Anomaly Alerts', icon: Zap, path: '/analytics/anomalies' },
      { id: 'plant-health', label: 'Plant Health Scanner', icon: Camera, path: '/analytics/plant-health' },
      { id: 'yield', label: 'Yield Forecast', icon: Leaf, path: '/analytics/yield' }
    ]
  },
  { id: 'map', label: 'Smart Map', icon: Map, path: '/map' },
  { id: 'chat', label: 'AI Assistant', icon: MessageSquare, path: '/chat', badge: 3 },
  { 
    id: 'community', 
    label: 'Community', 
    icon: Users, 
    path: '/community',
    subItems: [
      { id: 'challenges', label: 'Challenges', icon: Target, path: '/community/challenges' },
      { id: 'feed', label: 'Garden Feed', icon: Eye, path: '/community/feed' },
      { id: 'ar-planner', label: 'AR Planner', icon: Camera, path: '/community/ar-planner' }
    ]
  },
  { 
    id: 'marketplace', 
    label: 'Marketplace', 
    icon: Store, 
    path: '/marketplace',
    badge: 2
  },
  { id: 'account', label: 'Account', icon: User, path: '/account' }
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
            "flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 cursor-pointer",
            active 
              ? "bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 shadow-sm border border-emerald-200/50" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            isSubItem && "p-2 text-sm"
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
            <Icon className={cn(
              "w-5 h-5",
              active ? "text-emerald-600" : "text-slate-500",
              isSubItem && "w-4 h-4"
            )} />
            <span className={cn(
              "font-medium",
              active ? "text-emerald-700" : "text-slate-700"
            )}>
              {item.label}
            </span>
            {item.badge && (
              <Badge className="bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {item.badge}
              </Badge>
            )}
          </div>
          {hasSubItems && (
            <div className={cn(
              "transform transition-transform duration-200",
              isExpanded ? "rotate-90" : "rotate-0"
            )}>
              <div className="w-2 h-2 border-r-2 border-b-2 border-slate-400 transform rotate-45"></div>
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
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Miraqua
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Real-time sync indicator */}
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-emerald-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-xs text-slate-500">
                {isOnline ? "Synced 3s ago" : "Offline"}
              </span>
            </div>
            
            <Button variant="ghost" size="sm" className="relative hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 bg-rose-500 text-white w-5 h-5 text-xs rounded-full">
                7
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm" className="hover:bg-slate-100">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200 lg:bg-white lg:z-40">
        <div className="flex items-center justify-center h-16 border-b border-slate-200">
          <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Miraqua Pro
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems.map(item => renderNavItem(item))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="text-sm font-medium text-slate-700 mb-3">Quick Actions</div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={() => navigate('/add-plot')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Plot
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => navigate('/analytics/plant-health')}
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan Plant Health
              </Button>
            </div>
          </div>
        </ScrollArea>
        
        {/* Status Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              ) : (
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              )}
              <span>{isOnline ? "All systems online" : "Offline mode"}</span>
            </div>
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex flex-col w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
              <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Miraqua Pro
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 px-4 py-6">
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
