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
  Zap
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
}

interface Stats {
  totalWaterUsed: number;
  avgMoisture: number;
  nextWateringDue: string;
  activePlots: number;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlots([
        {
          id: 1,
          name: "Tomato Garden",
          crop: "Tomatoes",
          moisture: 85,
          temperature: 72,
          nextWatering: "2h 15m",
          status: "optimal",
          lat: 37.7749,
          lon: -122.4194
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
          lon: -122.4196
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
          lon: -122.4192
        }
      ]);

      setStats({
        totalWaterUsed: 142,
        avgMoisture: 57,
        nextWateringDue: "2h 15m",
        activePlots: 3
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Watering started",
        description: "Your plot is being watered now.",
      });
      
      // Refresh data
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
      case 'optimal': return 'bg-green-100 text-green-700 border-green-200';
      case 'needs-water': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'attention': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal': return 'Optimal';
      case 'needs-water': return 'Needs Water';
      case 'attention': return 'Attention';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-64">
        <div className="p-4 space-y-4">
          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Plots Skeleton */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-64">
        <div className="p-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchData}>
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
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-64">
        <div className="p-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No plots yet</h2>
              <p className="text-gray-600 mb-6">Add your first plot to get started with smart watering</p>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Plot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-64">
      {/* Header - Mobile Only */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Garden Dashboard</h1>
              <RealTimeIndicator className="mt-1" />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Garden Dashboard</h1>
              <div className="flex items-center space-x-4 mt-1">
                <RealTimeIndicator />
                <span className="text-sm text-gray-600">Last updated: just now</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/analytics/predictive')}
              >
                <Target className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/analytics/plant-health')}
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan Plants
              </Button>
              <Button
                onClick={() => navigate('/onboarding/crop')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Quick Actions - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => navigate('/analytics/anomalies')}
            >
              <Zap className="w-6 h-6 text-yellow-600" />
              <span>Check Alerts</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => navigate('/analytics/predictive')}
            >
              <Target className="w-6 h-6 text-blue-600" />
              <span>AI Forecast</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => navigate('/community/challenges')}
            >
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span>Challenges</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => navigate('/marketplace')}
            >
              <Plus className="w-6 h-6 text-purple-600" />
              <span>Marketplace</span>
            </Button>
          </div>

          {/* Stats Panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{stats?.totalWaterUsed}L</div>
                <div className="text-sm text-blue-700">Water Used</div>
                <div className="text-xs text-blue-600 mt-1">↓ 23% vs last week</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{stats?.avgMoisture}%</div>
                <div className="text-sm text-green-700">Avg Moisture</div>
                <div className="text-xs text-green-600 mt-1">↑ 8% improvement</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Sun className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{stats?.activePlots}</div>
                <div className="text-sm text-purple-700">Active Plots</div>
                <div className="text-xs text-purple-600 mt-1">All healthy</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-900">{stats?.nextWateringDue}</div>
                <div className="text-sm text-orange-700">Next Due</div>
                <div className="text-xs text-orange-600 mt-1">Optimal timing</div>
              </CardContent>
            </Card>
          </div>

          {/* Plot Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Gardens</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/map')}
              >
                View Map
              </Button>
            </div>
            
            {plots.map((plot) => (
              <Card 
                key={plot.id} 
                className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                onClick={() => navigate(`/plot/${plot.id}?lat=${plot.lat}&lon=${plot.lon}`)}
              >
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{plot.name}</h3>
                      <p className="text-sm text-gray-600">{plot.crop}</p>
                    </div>
                    <Badge className={getStatusColor(plot.status)}>
                      {getStatusText(plot.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-900">{plot.moisture}%</div>
                      <div className="text-xs text-blue-700">Moisture</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Thermometer className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-orange-900">{plot.temperature}°F</div>
                      <div className="text-xs text-orange-700">Temperature</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Sun className="w-5 h-5 text-green-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-900">{plot.nextWatering}</div>
                      <div className="text-xs text-green-700">Next Water</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWaterNow(plot.id);
                      }}
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Water Now
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat?plotId=${plot.id}&lat=${plot.lat}&lon=${plot.lon}`);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Ask AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Today's AI Insights</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Your garden saved 1,200L last week with AI optimization</li>
                    <li>• Sensor #42 battery running low - replace within 7 days</li>
                    <li>• Rain expected tomorrow - watering schedule adjusted</li>
                    <li>• Tomato plants showing excellent health indicators</li>
                  </ul>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/analytics/predictive')}
                    >
                      View Forecast
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/analytics/anomalies')}
                    >
                      Check Alerts
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomeScreen;
