
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  TrendingUp, 
  Plus, 
  MessageCircle, 
  Play,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Camera,
  Target,
  Zap,
  Activity,
  Leaf,
  MapPin
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RealTimeIndicator, usePlotUpdates } from "@/components/ui/RealTimeUpdates";

interface Plot {
  id: number;
  name: string;
  crop: string;
  moisture: number;
  temperature: number;
  nextWatering: string;
  status: 'optimal' | 'needs-water' | 'attention';
  lat: number;
  lon: number;
  efficiency?: number;
}

interface Stats {
  totalWaterUsed: number;
  avgMoisture: number;
  nextWateringDue: string;
  activePlots: number;
  weeklySavings: number;
  efficiency: number;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plots, setPlots] = useState<Plot[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlots([
        {
          id: 1,
          name: "Tomato Garden",
          crop: "Cherry Tomatoes",
          moisture: 85,
          temperature: 72,
          nextWatering: "2h 15m",
          status: "optimal",
          lat: 37.7749,
          lon: -122.4194,
          efficiency: 94
        },
        {
          id: 2,
          name: "Herb Corner",
          crop: "Basil & Oregano",
          moisture: 45,
          temperature: 71,
          nextWatering: "4h 30m",
          status: "needs-water",
          lat: 37.7751,
          lon: -122.4196,
          efficiency: 87
        },
        {
          id: 3,
          name: "Pepper Patch",
          crop: "Bell Peppers",
          moisture: 42,
          temperature: 75,
          nextWatering: "Now",
          status: "attention",
          lat: 37.7747,
          lon: -122.4192,
          efficiency: 91
        }
      ]);

      setStats({
        totalWaterUsed: 142,
        avgMoisture: 57,
        nextWateringDue: "2h 15m",
        activePlots: 3,
        weeklySavings: 1200,
        efficiency: 91
      });
    } catch (err) {
      setError("Failed to load garden data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleWaterNow = async (plotId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "💧 Watering started",
        description: "Your garden is being watered now",
      });
      
      handleRefresh();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start watering. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'needs-water': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'attention': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal': return '✨ Optimal';
      case 'needs-water': return '💧 Needs Water';
      case 'attention': return '⚠️ Attention';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6">
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-50 to-rose-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <Button 
                variant="outline" 
                onClick={fetchData}
                className="bg-white hover:bg-red-50 border-red-200 text-red-700 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!loading && plots.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6">
          <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Miraqua! 🌱</h2>
              <p className="text-blue-100">Start your smart gardening journey</p>
            </div>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-8 text-lg">Add your first plot to begin monitoring and optimizing your garden with AI-powered insights.</p>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Plot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Modern Header - Mobile */}
      <header className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Garden Dashboard
              </h1>
              <RealTimeIndicator className="mt-2" />
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="rounded-xl p-2"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-xl px-4 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Header - Desktop */}
      <header className="hidden lg:block bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Garden Dashboard
              </h1>
              <div className="flex items-center space-x-6 mt-2">
                <RealTimeIndicator />
                <span className="text-gray-600">Last synced: just now</span>
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full px-3">
                  {stats?.efficiency}% Efficiency
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/analytics/predictive')}
                className="rounded-2xl border-blue-200 text-blue-700 hover:bg-blue-50 px-6"
              >
                <Target className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/analytics/plant-health')}
                className="rounded-2xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6"
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan Plants
              </Button>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-2xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-6 lg:p-8 space-y-8">
          {/* Modern Quick Actions - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            <Button
              variant="outline"
              className="h-24 flex-col justify-center space-y-3 rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 text-yellow-700 font-medium transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/analytics/anomalies')}
            >
              <Zap className="w-8 h-8 text-yellow-600" />
              <span>Check Alerts</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col justify-center space-y-3 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 font-medium transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/analytics/predictive')}
            >
              <Target className="w-8 h-8 text-blue-600" />
              <span>AI Forecast</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col justify-center space-y-3 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 font-medium transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/community')}
            >
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span>Community</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col justify-center space-y-3 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 font-medium transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/marketplace')}
            >
              <Plus className="w-8 h-8 text-purple-600" />
              <span>Marketplace</span>
            </Button>
          </div>

          {/* Modern Stats Panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
              <CardContent className="p-6 text-center text-white">
                <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                  <Droplets className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats?.totalWaterUsed}L</div>
                <div className="text-blue-100 font-medium mb-2">Water Used</div>
                <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                  ↓ 23% vs last week
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600">
              <CardContent className="p-6 text-center text-white">
                <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats?.avgMoisture}%</div>
                <div className="text-emerald-100 font-medium mb-2">Avg Moisture</div>
                <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                  ↑ 8% improvement
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600">
              <CardContent className="p-6 text-center text-white">
                <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                  <Sun className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats?.activePlots}</div>
                <div className="text-purple-100 font-medium mb-2">Active Plots</div>
                <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                  All healthy
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
              <CardContent className="p-6 text-center text-white">
                <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                  <Thermometer className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats?.nextWateringDue}</div>
                <div className="text-orange-100 font-medium mb-2">Next Due</div>
                <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                  Optimal timing
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plot Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Your Gardens
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/map')}
                className="text-blue-600 hover:bg-blue-50 rounded-xl"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </div>
            
            {plots.map((plot) => (
              <Card 
                key={plot.id} 
                className="border-0 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-sm overflow-hidden"
                onClick={() => navigate(`/plot/${plot.id}?lat=${plot.lat}&lon=${plot.lon}`)}
              >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{plot.name}</h3>
                      <p className="text-gray-600 mb-3">{plot.crop}</p>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(plot.status) + " rounded-full px-4 py-1 font-medium"}>
                          {getStatusText(plot.status)}
                        </Badge>
                        {plot.efficiency && (
                          <Badge className="bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                            {plot.efficiency}% Efficient
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-blue-900 mb-1">{plot.moisture}%</div>
                      <div className="text-xs text-blue-700 font-medium">Moisture</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                      <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-orange-900 mb-1">{plot.temperature}°F</div>
                      <div className="text-xs text-orange-700 font-medium">Temperature</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                      <Sun className="w-6 h-6 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-green-900 mb-1">{plot.nextWatering}</div>
                      <div className="text-xs text-green-700 font-medium">Next Water</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWaterNow(plot.id);
                      }}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      💧 Water Now
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat?plotId=${plot.id}&lat=${plot.lat}&lon=${plot.lon}`);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl py-3 font-medium"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      🤖 Ask AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modern AI Insights Card */}
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Today's AI Insights ✨</h3>
                  <p className="text-blue-100">Smart recommendations for your garden</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">🌊 Your garden saved <span className="font-semibold text-green-600">1,200L</span> last week with AI optimization</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">🔋 Sensor #42 battery running low - replace within 7 days</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">🌧️ Rain expected tomorrow - watering schedule adjusted</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">🍅 Tomato plants showing excellent health indicators</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  size="sm" 
                  onClick={() => navigate('/analytics/predictive')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl px-6 font-medium"
                >
                  View Forecast
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/analytics/anomalies')}
                  className="border-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl px-6 font-medium"
                >
                  Check Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomeScreen;
