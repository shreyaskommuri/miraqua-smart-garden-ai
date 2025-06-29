
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Filter, 
  Plus,
  Bell,
  Grid3X3,
  List,
  Map,
  MessageSquare,
  Settings,
  RefreshCw
} from "lucide-react";
import { GlobalStatsPanel } from "@/components/ui/GlobalStatsPanel";
import { PlotCard } from "@/components/ui/PlotCard";
import { NotificationInbox } from "@/components/ui/NotificationInbox";
import { MiniMap } from "@/components/ui/MiniMap";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [plots, setPlots] = useState([
    {
      id: 1,
      name: "Tomato Garden",
      crop: "Tomatoes",
      moisture: 65,
      temperature: 73,
      sunlight: 85,
      nextWater: "2h 15m",
      status: "optimal" as const,
      location: "North Yard",
      latitude: 37.7749,
      longitude: -122.4194,
      area: 25,
      lastWatered: "Yesterday"
    },
    {
      id: 2,
      name: "Herb Corner",
      crop: "Basil & Oregano",
      moisture: 45,
      temperature: 71,
      sunlight: 78,
      nextWater: "4h 30m",
      status: "needs-water" as const,
      location: "Kitchen Window",
      latitude: 37.7751,
      longitude: -122.4196,
      area: 8,
      lastWatered: "2 days ago"
    },
    {
      id: 3,
      name: "Pepper Patch",
      crop: "Bell Peppers",
      moisture: 42,
      temperature: 75,
      sunlight: 92,
      nextWater: "Now",
      status: "attention" as const,
      location: "South Garden",
      latitude: 37.7747,
      longitude: -122.4192,
      area: 18,
      lastWatered: "3 days ago"
    }
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'weather' as const,
      title: 'Rain Expected',
      message: 'Skipping watering for Tomato Garden due to rain forecast',
      timestamp: '2 hours ago',
      read: false,
      priority: 'medium' as const,
      plotId: 1,
      plotName: 'Tomato Garden'
    },
    {
      id: '2',
      type: 'watering' as const,
      title: 'Watering Complete',
      message: 'Herb Corner watered for 15 minutes',
      timestamp: '1 day ago',
      read: true,
      priority: 'low' as const,
      plotId: 2,
      plotName: 'Herb Corner'
    },
    {
      id: '3',
      type: 'alert' as const,
      title: 'Low Moisture Alert',
      message: 'Pepper Patch moisture dropped below 45%',
      timestamp: '3 hours ago',
      read: false,
      priority: 'high' as const,
      plotId: 3,
      plotName: 'Pepper Patch'
    }
  ]);

  // Mock data - in real app this would come from API
  const globalStats = {
    totalWaterUsed: 142,
    avgMoisture: 68,
    nextWateringIn: '2h 15m',
    activePlots: 8,
    waterSavings: 23,
    moistureTrend: 'up' as const
  };

  // Online status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Refresh plots data when component mounts
  useEffect(() => {
    const getPlots = async () => {
      // In real app, this would be an API call
      console.log('Refreshing plots data');
    };
    getPlots();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const filteredPlots = plots.filter(plot =>
    plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWaterNow = (plotId: number) => {
    if (!isOnline) return;
    console.log(`Watering plot ${plotId}`);
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.logEvent('Plot_Water_Now', { plotId });
    }
  };

  const handleViewDetails = (plotId: number) => {
    const plot = plots.find(p => p.id === plotId);
    if (plot) {
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.logEvent('Plot_Card_Click', { plotId });
      }
      navigate(`/plot/${plotId}?lat=${plot.latitude}&lon=${plot.longitude}`);
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Fixed Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Good Morning, Sarah
              </h1>
              <p className="text-sm text-gray-600">Let's check on your garden</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/app/chat')}
                className="p-2"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Offline Banner */}
          {!isOnline && (
            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                📡 Offline—viewing cached data. Some features may be limited.
              </p>
            </div>
          )}
          
          {/* Search & View Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search plots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-9 bg-white/70 text-sm"
              />
              <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1">
                <Filter className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-1 bg-white/70 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-1.5"
              >
                <List className="w-3 h-3" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-1.5"
              >
                <Grid3X3 className="w-3 h-3" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="p-1.5"
              >
                <Map className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Main Content */}
      <ScrollArea className="h-screen">
        <div className="pt-[140px] pb-24 px-4">
          <div className="space-y-6">
            {/* Global Stats */}
            <GlobalStatsPanel 
              totalWaterUsed={142}
              avgMoisture={68}
              nextWateringIn="2h 15m"
              activePlots={plots.length}
              waterSavings={23}
              moistureTrend="up"
            />

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Quick Actions</h3>
                    <p className="text-xs opacity-90">Manage your garden efficiently</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => navigate('/app/chat')}
                      className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs px-3 py-2"
                      disabled={!isOnline}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      AI Chat
                    </Button>
                    <Button 
                      onClick={() => navigate('/add-plot')}
                      className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs px-3 py-2"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Plot
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <NotificationInbox
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismissNotification}
              onViewPlot={handleViewDetails}
            />

            {/* Plots Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Your Plots</h2>
                <Badge variant="outline" className="text-xs">
                  {filteredPlots.length} {viewMode === 'map' ? 'on map' : 'found'}
                </Badge>
              </div>
              
              {viewMode === 'map' ? (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                      {/* Map grid overlay */}
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 8.33}%` }} />
                        ))}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 8.33}%` }} />
                        ))}
                      </div>
                      
                      {filteredPlots.map((plot, index) => (
                        <div
                          key={plot.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                          style={{
                            left: `${30 + index * 20}%`,
                            top: `${40 + index * 10}%`
                          }}
                          onClick={() => handleViewDetails(plot.id)}
                        >
                          <div className="relative">
                            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-110 ${
                              plot.status === 'optimal' ? 'bg-green-500' :
                              plot.status === 'needs-water' ? 'bg-yellow-500' :
                              plot.status === 'attention' ? 'bg-red-500' : 'bg-gray-500'
                            }`}></div>
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                {plot.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Map Legend */}
                    <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Optimal</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Needs Water</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Attention</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-3' : 'space-y-3'}>
                  {filteredPlots.length === 0 ? (
                    <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Search className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">No plots found</h3>
                        <p className="text-sm text-gray-500 mb-3">Try adjusting your search terms</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredPlots.map((plot) => (
                      <div
                        key={plot.id}
                        className="transform transition-transform duration-150 hover:scale-[1.01] cursor-pointer"
                        onClick={() => handleViewDetails(plot.id)}
                      >
                        <PlotCard
                          plot={plot}
                          onWaterNow={handleWaterNow}
                          onViewDetails={handleViewDetails}
                          compact={viewMode === 'grid'}
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomeScreen;
