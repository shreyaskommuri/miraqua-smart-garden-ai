
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
  Zap,
  AlertTriangle,
  Calendar,
  Timer,
  Sprout,
  CloudRain
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
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 68,
    forecast: "Rain expected tomorrow"
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
          trend: 'up'
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
          trend: 'down'
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
          trend: 'stable'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning 👋
              </h1>
              <p className="text-sm text-gray-600 mt-1">Your farm is looking great today</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
                <Settings className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Monitor and manage your smart irrigation system</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/add-plot')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 font-medium shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="px-6 lg:px-8 py-8 space-y-8 pb-32">
          {/* Weather Card */}
          <Card className="border-0 shadow-sm rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Sun className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">{weatherData.temperature}°F</div>
                    <div className="text-lg text-blue-100 mb-1">{weatherData.condition}</div>
                    <div className="text-sm text-blue-200 flex items-center">
                      <Droplets className="w-4 h-4 mr-2" />
                      {weatherData.humidity}% humidity
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-200 mb-2">Next 24h</div>
                  <div className="text-base text-blue-100">{weatherData.forecast}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{plots.length}</div>
                <div className="text-sm text-gray-600">Active Plots</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">36L</div>
                <div className="text-sm text-gray-600">Water Today</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-orange-600" />
                  </div>
                  <Activity className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">72°F</div>
                <div className="text-sm text-gray-600">Avg Temp</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">2</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
                <div className="text-sm text-gray-600">Alerts</div>
              </CardContent>
            </Card>
          </div>

          {/* Plots Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Plots</h2>
                <p className="text-gray-600 mt-1">Monitor soil conditions and watering schedules</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/map')}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl"
              >
                View Map
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plots.map((plot) => (
                <Card 
                  key={plot.id}
                  className="border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/plot/${plot.id}?lat=37.7749&lon=-122.4194`)}
                >
                  <CardContent className="p-6">
                    {/* Plot Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{plot.name}</h3>
                          <Badge className={`${getStatusColor(plot.status)} border-0 rounded-full px-3 py-1 text-xs font-medium`}>
                            {plot.status === 'healthy' ? 'Healthy' : 
                             plot.status === 'warning' ? 'Needs Water' : 
                             'Attention'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{plot.crop}</p>
                        <p className="text-gray-500 text-xs flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {plot.location}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Droplets className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-1">{plot.moisture}%</div>
                        <div className="text-xs text-gray-600">Moisture</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Thermometer className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-1">{plot.temperature}°F</div>
                        <div className="text-xs text-gray-600">Temperature</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Sun className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-1">{plot.sunlight}%</div>
                        <div className="text-xs text-gray-600">Light</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <Timer className="w-4 h-4 mr-2" />
                        <span>Next: {plot.nextWatering}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{plot.waterUsage}L</span>
                        <span className="text-xs text-gray-500">today</span>
                        {getTrendIcon(plot.trend)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate('/analytics/plant-health')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm border-0"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">Plant Health</span>
            </Button>

            <Button
              onClick={() => navigate('/analytics')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm border-0"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Analytics</span>
            </Button>

            <Button
              onClick={() => navigate('/chat')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm border-0"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium">AI Assistant</span>
            </Button>

            <Button
              onClick={() => navigate('/community')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm border-0"
            >
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-medium">Community</span>
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button
          onClick={() => navigate('/add-plot')}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
