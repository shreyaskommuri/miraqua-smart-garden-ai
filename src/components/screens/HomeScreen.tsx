
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Leaf, 
  Plus, 
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Bell,
  Settings,
  ChevronRight,
  Timer,
  CloudRain,
  User,
  MessageSquare,
  BarChart3,
  Zap,
  Home,
  Map,
  Users,
  ShoppingCart,
  Camera,
  Calendar,
  Wifi,
  WifiOff,
  Battery,
  AlertTriangle
} from "lucide-react";

interface PlotData {
  id: number;
  name: string;
  crop: string;
  moisture: number;
  temperature: number;
  sunlight: number;
  status: 'healthy' | 'warning' | 'critical';
  nextWatering: string;
  location: string;
  waterUsage: number;
  trend: 'up' | 'down' | 'stable';
  sensorStatus: 'online' | 'offline';
  batteryLevel: number;
  soilPh: number;
  lastWatered: string;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState({
    totalWaterSaved: 847,
    activeSensors: 12,
    automationSavings: 34,
    alertsToday: 3
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPlots([
        {
          id: 1,
          name: "Tomato Garden",
          crop: "Cherry Tomatoes",
          moisture: 75,
          temperature: 72,
          sunlight: 85,
          status: 'healthy',
          nextWatering: "Tomorrow 6:00 AM",
          location: "North Plot",
          waterUsage: 15.2,
          trend: 'up',
          sensorStatus: 'online',
          batteryLevel: 87,
          soilPh: 6.8,
          lastWatered: "Yesterday 6:00 AM"
        },
        {
          id: 2,
          name: "Herb Corner",
          crop: "Mixed Herbs",
          moisture: 45,
          temperature: 74,
          sunlight: 92,
          status: 'warning',
          nextWatering: "Today 3:00 PM",
          location: "South Garden",
          waterUsage: 8.7,
          trend: 'down',
          sensorStatus: 'online',
          batteryLevel: 34,
          soilPh: 7.2,
          lastWatered: "2 days ago"
        },
        {
          id: 3,
          name: "Lettuce Bed",
          crop: "Butter Lettuce",
          moisture: 88,
          temperature: 68,
          sunlight: 78,
          status: 'healthy',
          nextWatering: "Tomorrow 8:00 AM",
          location: "East Side",
          waterUsage: 12.1,
          trend: 'stable',
          sensorStatus: 'offline',
          batteryLevel: 0,
          soilPh: 6.5,
          lastWatered: "Yesterday 8:00 AM"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChatWithPlot = (plot: PlotData) => {
    // Store plot data in sessionStorage for the chat to access
    sessionStorage.setItem('selectedPlotForChat', JSON.stringify(plot));
    navigate('/chat');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-700 bg-green-100';
      case 'warning': return 'text-orange-700 bg-orange-100';
      case 'critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSensorIcon = (status: string) => {
    return status === 'online' ? 
      <Wifi className="w-4 h-4 text-green-500" /> : 
      <WifiOff className="w-4 h-4 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Miraqua</h1>
                  <p className="text-xs text-gray-500">Smart Irrigation</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Bell className="w-4 h-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Settings className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Miraqua</h1>
                <p className="text-xs text-gray-500">Smart Irrigation</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 relative">
                <Bell className="w-4 h-4 text-gray-600" />
                {systemStatus.alertsToday > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {systemStatus.alertsToday}
                  </div>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={() => navigate('/account')}>
                <Settings className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Quick Navigation */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 bg-green-50 text-green-700">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => navigate('/map')}>
            <Map className="w-4 h-4" />
            <span>Map</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => navigate('/community')}>
            <Users className="w-4 h-4" />
            <span>Community</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => navigate('/marketplace')}>
            <ShoppingCart className="w-4 h-4" />
            <span>Store</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-6 pb-20">
          {/* System Overview Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Water Saved</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{systemStatus.totalWaterSaved}L</div>
                <div className="text-xs text-blue-700">This month</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Automation</span>
                </div>
                <div className="text-2xl font-bold text-green-900">{systemStatus.automationSavings}%</div>
                <div className="text-xs text-green-700">Savings</div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Alert */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <CloudRain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Heavy rain predicted in 2 days</p>
                    <p className="text-blue-100 text-sm">Auto-adjusted watering schedule</p>
                  </div>
                </div>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Crop Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Crop Categories</h2>
              <Button variant="ghost" size="sm" className="text-green-600">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🥕</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Carrots</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🥬</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Lettuce</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🍅</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Tomato</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🌿</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Herbs</p>
              </div>
            </div>
          </div>

          {/* Priority Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Priority Tasks</h2>
              <Button variant="ghost" size="sm" className="text-green-600">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Low Battery Alert</p>
                      <p className="text-sm text-gray-500">Herb Corner sensor needs battery replacement</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Sensor Offline</p>
                      <p className="text-sm text-gray-500">Lettuce Bed sensor lost connection</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">High</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Schedule Optimization</p>
                      <p className="text-sm text-gray-500">AI suggests 15% water reduction for tomatoes</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Medium</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* My Plots with Enhanced Features */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">My Plots</h2>
              <Button variant="ghost" size="sm" className="text-green-600">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {plots.map((plot) => (
                <Card 
                  key={plot.id}
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{plot.name}</h3>
                          <p className="text-sm text-gray-500">{plot.crop}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{plot.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={`${getStatusColor(plot.status)} text-xs px-2 py-1 rounded-full`}>
                          {plot.status === 'healthy' ? 'Healthy' : 
                           plot.status === 'warning' ? 'Attention' : 'Critical'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getSensorIcon(plot.sensorStatus)}
                          <Battery className={`w-3 h-3 ${plot.batteryLevel > 30 ? 'text-green-500' : 'text-red-500'}`} />
                          <span className="text-xs text-gray-500">{plot.batteryLevel}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plot.moisture}%</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <Droplets className="w-3 h-3 mr-1" />
                          Moisture
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plot.temperature}°F</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <Thermometer className="w-3 h-3 mr-1" />
                          Temp
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plot.sunlight}%</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <Sun className="w-3 h-3 mr-1" />
                          Light
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plot.soilPh}</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          pH Level
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center text-gray-500">
                        <Timer className="w-4 h-4 mr-1" />
                        Next: {plot.nextWatering}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{plot.waterUsage}L</span>
                        {getTrendIcon(plot.trend)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => navigate(`/plot/${plot.id}?lat=37.7749&lon=-122.4194`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleChatWithPlot(plot)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        AI Help
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/analytics/plant-health`)}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Alerts for this plot */}
                    {plot.sensorStatus === 'offline' && (
                      <div className="mt-3 p-2 bg-red-50 rounded-lg flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-700">Sensor offline - Check connection</span>
                      </div>
                    )}
                    {plot.batteryLevel < 30 && (
                      <div className="mt-3 p-2 bg-orange-50 rounded-lg flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-700">Low battery - Replace soon</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-green-600">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button 
            className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            onClick={() => navigate('/add-plot')}
          >
            <Plus className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1" onClick={() => navigate('/chat')}>
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">AI Chat</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1" onClick={() => navigate('/account')}>
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
