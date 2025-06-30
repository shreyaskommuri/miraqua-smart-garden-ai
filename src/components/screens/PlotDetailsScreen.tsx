
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
  Calendar
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/60 rounded-3xl animate-pulse backdrop-blur-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6">
          <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-red-50 to-rose-50 border-red-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <Button 
                variant="outline" 
                onClick={fetchPlotData}
                className="bg-white hover:bg-red-50 border-red-200 text-red-700 rounded-2xl"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-white/20 sticky top-16 lg:top-0 z-30 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-2xl p-2 hover:bg-slate-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {plotData?.name}
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-slate-600">{plotData?.crop}</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full px-3">
                    {plotData?.efficiency}% Efficient
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/chat?plotId=${plotId}`)}
                className="rounded-2xl border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/plot/${plotId}/settings`)}
                className="rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="px-6 py-8 space-y-8 pb-32">
          {/* Hero Stats Card */}
          <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            <CardContent className="p-8 relative z-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-emerald-100 mb-2">Plant Health Score</div>
                  <div className="text-4xl font-bold mb-4">{plotData?.healthScore}%</div>
                  <div className="flex items-center space-x-4 text-sm text-emerald-100">
                    <div className="flex items-center">
                      <Leaf className="w-4 h-4 mr-1" />
                      {plotData?.cropAge}
                    </div>
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 mr-1" />
                      {plotData?.lastWatered}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-emerald-100 mb-2">GPS Location</div>
                  <div 
                    className="text-lg font-mono cursor-pointer hover:text-white transition-colors"
                    onClick={copyCoordinates}
                  >
                    {plotData?.location}
                  </div>
                  <div className="text-sm text-emerald-100 mt-2">Tap to copy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-32 z-20 bg-white/95 backdrop-blur-xl -mx-6 px-6 py-4 border-b border-white/20">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100 rounded-2xl p-1">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="sensors" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Sensors
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-8 space-y-6">
              {/* Current Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">{plotData?.currentMoisture}%</div>
                    <div className="text-blue-700 font-medium mb-4">Soil Moisture</div>
                    <div className="flex items-center justify-center text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                      <span className="text-emerald-600 font-medium">+5% vs yesterday</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Thermometer className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-orange-900 mb-2">{plotData?.currentTemp}°F</div>
                    <div className="text-orange-700 font-medium mb-4">Temperature</div>
                    <div className="flex items-center justify-center text-sm">
                      <Activity className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-blue-600 font-medium">Optimal range</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sun className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-900 mb-2">{plotData?.currentSunlight}%</div>
                    <div className="text-yellow-700 font-medium mb-4">Sunlight</div>
                    <div className="flex items-center justify-center text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                      <span className="text-emerald-600 font-medium">Perfect exposure</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Next Watering */}
              <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900 mb-1">Next Watering</h3>
                        <p className="text-emerald-700">{plotData?.nextWatering}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-900">{plotData?.totalWaterToday}L</div>
                      <div className="text-sm text-emerald-700">Today's usage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="mt-8 space-y-6">
              {/* Soil Analysis */}
              <Card className="border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                    <span>Soil Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-slate-600 mb-2">pH Level</div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{plotData?.soilPh}</div>
                      <div className="text-sm text-emerald-600">Optimal range</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Nitrogen</span>
                          <span>{plotData?.nutrients.nitrogen}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: `${plotData?.nutrients.nitrogen}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Phosphorus</span>
                          <span>{plotData?.nutrients.phosphorus}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${plotData?.nutrients.phosphorus}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Potassium</span>
                          <span>{plotData?.nutrients.potassium}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: `${plotData?.nutrients.potassium}%`}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-8 space-y-6">
              <CalendarSchedule 
                schedule={plotData?.schedule}
                onDayClick={(day) => navigate(`/plot/${plotId}/day/${day.date}?lat=${latitude}&lon=${longitude}&date=${day.date}`)}
              />

              {/* Weekly Summary */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <CardContent className="p-8 text-center">
                    <div className="text-3xl font-bold text-emerald-900 mb-2">{plotData?.totalWaterToday}L</div>
                    <div className="text-emerald-700 font-medium">Today's Water</div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-8 text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">{plotData?.weeklyTotal}L</div>
                    <div className="text-blue-700 font-medium">Weekly Total</div>
                  </CardContent>
                </Card>
              </div>
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
