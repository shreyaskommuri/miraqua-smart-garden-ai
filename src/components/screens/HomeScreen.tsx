
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
  CloudRain,
  User
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">My Location</p>
                <p className="font-semibold text-gray-900">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Monitor your smart garden</p>
            </div>
            <Button 
              onClick={() => navigate('/add-plot')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Plot
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4 space-y-6 pb-20">
          {/* Weather Banner */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <CloudRain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Heavy rain predicted in 2 days</p>
                    <p className="text-blue-100 text-sm">Check irrigation and protect crops</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Categories</h2>
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
                  <span className="text-2xl">🍆</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Vegetables</p>
              </div>
            </div>
          </div>

          {/* My Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">My Tasks</h2>
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
                      <p className="font-medium text-gray-900">Check Tomato Plants</p>
                      <p className="text-sm text-gray-500">Apply 50% fertilizer for optimal growth today</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">High</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Water Lettuce Plants</p>
                      <p className="text-sm text-gray-500">Schedule watering for optimal growth</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Medium</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* My Plots */}
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
                  onClick={() => navigate(`/plot/${plot.id}?lat=37.7749&lon=-122.4194`)}
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
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(plot.status)} text-xs px-2 py-1 rounded-full`}>
                        {plot.status === 'healthy' ? 'Healthy' : 
                         plot.status === 'warning' ? 'Attention' : 'Critical'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
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
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Timer className="w-4 h-4 mr-1" />
                        {plot.nextWatering}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{plot.waterUsage}L</span>
                        {getTrendIcon(plot.trend)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button
          onClick={() => navigate('/add-plot')}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
