
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
    path: '/community'
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
            "flex items-center justify-between w-full px-4 py-4 rounded-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden",
            active 
              ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg" 
              : "text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:text-slate-900",
            isSubItem && "py-3 text-sm rounded-xl"
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
          {/* Active indicator */}
          {active && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
          )}

          <div className="flex items-center space-x-4">
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-300 relative",
              active 
                ? "bg-white/20 shadow-lg" 
                : "bg-slate-100 group-hover:bg-white group-hover:shadow-sm",
              isSubItem && "p-2"
            )}>
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-300",
                active ? "text-white" : "text-slate-600 group-hover:text-blue-600",
                isSubItem && "w-4 h-4"
              )} />
            </div>
            <span className={cn(
              "font-medium transition-colors duration-300",
              active ? "text-white" : "text-slate-700 group-hover:text-slate-900"
            )}>
              {item.label}
            </span>
            {item.badge && (
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                {item.badge}
              </Badge>
            )}
          </div>
          {hasSubItems && (
            <div className={cn(
              "transform transition-transform duration-300 p-1",
              isExpanded ? "rotate-90" : "rotate-0"
            )}>
              <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45"></div>
            </div>
          )}
        </div>
        
        {hasSubItems && isExpanded && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {item.subItems!.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="hover:bg-slate-100 rounded-2xl p-3"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Miraqua
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Real-time sync indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-2xl">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-emerald-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-xs text-slate-600 font-medium">
                {isOnline ? "Live" : "Offline"}
              </span>
            </div>
            
            <Button variant="ghost" size="sm" className="relative hover:bg-slate-100 rounded-2xl p-3">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                7
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-white/20 lg:bg-white/95 lg:backdrop-blur-xl lg:z-40 lg:shadow-sm">
        <div className="flex items-center justify-center h-20 border-b border-white/20 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Miraqua Pro
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="space-y-4">
            {navigationItems.map(item => renderNavItem(item))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="text-sm font-semibold text-slate-700 mb-6 px-2">Quick Actions</div>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-2xl py-4 h-auto shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => navigate('/add-plot')}
              >
                <div className="p-2 bg-emerald-100 rounded-2xl mr-4">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Add New Plot</div>
                  <div className="text-xs text-emerald-600">Expand your garden</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-2xl py-4 h-auto shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => navigate('/analytics/plant-health')}
              >
                <div className="p-2 bg-blue-100 rounded-2xl mr-4">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Scan Plants</div>
                  <div className="text-xs text-blue-600">Check plant health</div>
                </div>
              </Button>
            </div>
          </div>
        </ScrollArea>
        
        {/* Status Footer */}
        <div className="p-6 border-t border-white/20 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isOnline ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
              )}></div>
              <span className="text-slate-600 font-medium">
                {isOnline ? "All systems online" : "Offline mode"}
              </span>
            </div>
            <Shield className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex flex-col w-80 bg-white/95 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/20 bg-gradient-to-r from-emerald-50 to-blue-50">
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Miraqua Pro
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-slate-100 rounded-2xl p-3"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 px-6 py-8">
              <div className="space-y-4">
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
