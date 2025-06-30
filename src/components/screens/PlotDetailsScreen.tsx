import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarSchedule } from "@/components/ui/CalendarSchedule";
import { MiniMap } from "@/components/ui/MiniMap";
import { 
  ArrowLeft, 
  MessageSquare, 
  Settings, 
  Droplets, 
  Thermometer, 
  Sun, 
  MapPin,
  Copy,
  Play,
  Loader2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Activity,
  Leaf,
  Zap,
  Calendar,
  BarChart3
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PlotDetailsScreen = () => {
  const navigate = useNavigate();
  const { plotId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [plotData, setPlotData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [watering, setWatering] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const latitude = parseFloat(searchParams.get('lat') || '37.7749');
  const longitude = parseFloat(searchParams.get('lon') || '-122.4194');

  const fetchPlotData = async () => {
    setLoading(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockSchedule = [
        {
          date: '2024-07-01',
          dayOfWeek: 'Mon',
          morning: { time: '06:00', duration: 5, volume: 15 },
          hasWatering: true,
          isToday: true
        },
        {
          date: '2024-07-02',
          dayOfWeek: 'Tue',
          afternoon: { time: '14:00', duration: 3, volume: 8 },
          hasWatering: true
        },
        {
          date: '2024-07-03',
          dayOfWeek: 'Wed',
          morning: { time: '06:00', duration: 5, volume: 15 },
          evening: { time: '18:00', duration: 2, volume: 5 },
          hasWatering: true
        },
        {
          date: '2024-07-04',
          dayOfWeek: 'Thu',
          hasWatering: false
        },
        {
          date: '2024-07-05',
          dayOfWeek: 'Fri',
          morning: { time: '06:00', duration: 4, volume: 12 },
          hasWatering: true
        },
        {
          date: '2024-07-06',
          dayOfWeek: 'Sat',
          afternoon: { time: '16:00', duration: 6, volume: 22 },
          hasWatering: true
        },
        {
          date: '2024-07-07',
          dayOfWeek: 'Sun',
          morning: { time: '07:00', duration: 3, volume: 10 },
          hasWatering: true
        }
      ];
      
      setPlotData({
        id: plotId,
        name: "Tomato Garden",
        crop: "Cherry Tomatoes",
        location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        currentTemp: 72,
        currentMoisture: 68,
        currentSunlight: 85,
        cropAge: "45 days",
        nextWatering: "Tomorrow 6:00 AM",
        schedule: mockSchedule,
        totalWaterToday: 15,
        weeklyTotal: 95,
        efficiency: 92,
        trend: 'up',
        healthScore: 87,
        lastWatered: "2 hours ago",
        soilPh: 6.8,
        nutrients: {
          nitrogen: 75,
          phosphorus: 82,
          potassium: 68
        }
      });
    } catch (err) {
      setError("Failed to load plot details");
    } finally {
      setLoading(false);
    }
  };

  const handleWaterNow = async () => {
    setWatering(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "✨ Watering started",
        description: "Your garden is being watered for 5 minutes",
      });
      fetchPlotData();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start watering",
        variant: "destructive"
      });
    } finally {
      setWatering(false);
    }
  };

  const handleDayClick = (day: any) => {
    navigate(`/plot/${plotId}/day/${day.date}?lat=${latitude}&lon=${longitude}&date=${day.date}`);
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    toast({
      title: "📍 Coordinates copied",
      description: "Location copied to clipboard"
    });
  };

  useEffect(() => {
    fetchPlotData();
  }, [plotId]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-4">
          <Card className="border-0 shadow-lg bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchPlotData}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-16 lg:top-0 z-30">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍅</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{plotData?.name}</h1>
                <p className="text-sm text-gray-500">{plotData?.crop}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate(`/plot/${plotId}/settings`)}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4 space-y-6 pb-20">
          {/* Ideal Conditions Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Ideal Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Thermometer className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">{plotData?.currentTemp}°F</div>
                  <div className="text-xs text-blue-700">Temperature</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Sun className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-1">{plotData?.currentSunlight}%</div>
                  <div className="text-xs text-green-700">Sunlight</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-900 mb-1">{plotData?.currentMoisture}%</div>
                  <div className="text-xs text-cyan-700">Water</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Timeline */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Growth Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Week 1</p>
                      <p className="text-sm text-gray-500">Germination completed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Week 3</p>
                      <p className="text-sm text-gray-500">First leaves appeared</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Week 6</p>
                      <p className="text-sm text-gray-500">Currently flowering</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-500">Week 10</p>
                      <p className="text-sm text-gray-400">Expected harvest</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Activity Log
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Next Watering</h3>
                    <Button
                      onClick={handleWaterNow}
                      disabled={watering}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                    >
                      {watering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      {watering ? "Watering..." : "Water Now"}
                    </Button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{plotData?.nextWatering}</p>
                  <p className="text-gray-600">Scheduled automatic watering</p>
                </CardContent>
              </Card>

              <CalendarSchedule 
                schedule={plotData?.schedule || []} 
                onDayClick={handleDayClick}
              />

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Location</h3>
                    <Button variant="ghost" size="sm" onClick={copyCoordinates}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{plotData?.location}</span>
                  </div>
                  <MiniMap latitude={latitude} longitude={longitude} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Watering completed</p>
                        <p className="text-sm text-gray-500">15L water applied • 2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Moisture level improved</p>
                        <p className="text-sm text-gray-500">From 45% to 68% • 3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Low moisture alert</p>
                        <p className="text-sm text-gray-500">Moisture dropped to 45% • 5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Water Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{plotData?.totalWaterToday}L</p>
                      <p className="text-sm text-blue-700">Today</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-900">Efficiency</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">{plotData?.efficiency}%</p>
                      <p className="text-sm text-green-700">This week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Modern Floating Water Button */}
      <div className="fixed bottom-6 left-6 right-6 lg:left-80 lg:right-6 z-30">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-16 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold text-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          {watering ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Watering in progress...
            </>
          ) : (
            <>
              <Play className="w-6 h-6 mr-3" />
              💧 Water Now (5 min)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlotDetailsScreen;
