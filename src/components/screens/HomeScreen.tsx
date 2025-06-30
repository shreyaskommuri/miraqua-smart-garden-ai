
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/60 rounded-3xl animate-pulse backdrop-blur-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Good morning 🌱
              </h1>
              <p className="text-sm text-slate-600 mt-1">Your garden is thriving today</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-30">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Good morning 🌱</h1>
              <p className="text-slate-600">Your garden is thriving today - 3 plots need attention</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/add-plot')}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="px-6 lg:px-8 py-8 space-y-8 pb-32">
          {/* Weather Overview */}
          <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2">{weatherData.temperature}°F</div>
                  <div className="text-xl text-blue-100 mb-1">{weatherData.condition}</div>
                  <div className="text-sm text-blue-200 flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    {weatherData.humidity}% humidity
                  </div>
                </div>
                <div className="text-right">
                  <Sun className="w-16 h-16 text-yellow-300 mb-4" />
                  <div className="text-sm text-blue-200">{weatherData.forecast}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{plots.length}</div>
                <div className="text-sm text-slate-600">Active Plots</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">36L</div>
                <div className="text-sm text-slate-600">Today's Water</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">94%</div>
                <div className="text-sm text-slate-600">Efficiency</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">2</div>
                <div className="text-sm text-slate-600">Alerts</div>
              </CardContent>
            </Card>
          </div>

          {/* Plots Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Your Plots</h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/map')}
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-2xl"
              >
                View Map
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plots.map((plot) => (
                <Card 
                  key={plot.id}
                  className="border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 cursor-pointer group hover:scale-105"
                  onClick={() => navigate(`/plot/${plot.id}?lat=37.7749&lon=-122.4194`)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{plot.name}</h3>
                        <p className="text-slate-600 text-sm">{plot.crop}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(plot.status)} border rounded-full px-3 py-1 text-xs font-medium`}>
                          {plot.status}
                        </Badge>
                        {getTrendIcon(plot.trend)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                          <Droplets className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{plot.moisture}%</div>
                        <div className="text-xs text-slate-600">Moisture</div>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                          <Thermometer className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{plot.temperature}°F</div>
                        <div className="text-xs text-slate-600">Temp</div>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                          <Sun className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{plot.sunlight}%</div>
                        <div className="text-xs text-slate-600">Light</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {plot.location}
                      </div>
                      <div className="text-slate-900 font-medium">{plot.waterUsage}L today</div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="text-sm text-slate-600">Next watering: {plot.nextWatering}</div>
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
              className="h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Leaf className="w-6 h-6" />
              <span className="text-sm font-medium">Scan Plants</span>
            </Button>

            <Button
              onClick={() => navigate('/analytics')}
              className="h-24 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Activity className="w-6 h-6" />
              <span className="text-sm font-medium">Analytics</span>
            </Button>

            <Button
              onClick={() => navigate('/chat')}
              className="h-24 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Zap className="w-6 h-6" />
              <span className="text-sm font-medium">AI Assistant</span>
            </Button>

            <Button
              onClick={() => navigate('/community')}
              className="h-24 bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MapPin className="w-6 h-6" />
              <span className="text-sm font-medium">Community</span>
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button
          onClick={() => navigate('/add-plot')}
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
