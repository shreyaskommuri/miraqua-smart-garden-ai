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
  Activity
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PlotDetails {
  id: number;
  name: string;
  crop: string;
  current_temp_f: number;
  current_moisture: number;
  current_sunlight: string;
  crop_age: string;
  latitude: number;
  longitude: number;
  schedule: Array<{
    day: string;
    volume: number;
    status: 'optimal' | 'low' | 'high';
  }>;
}

const PlotDetailsScreen = () => {
  const navigate = useNavigate();
  const { plotId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [plotData, setPlotData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [watering, setWatering] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const latitude = parseFloat(searchParams.get('lat') || '37.7749');
  const longitude = parseFloat(searchParams.get('lon') || '-122.4194');

  const fetchPlotData = async () => {
    setLoading(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        trend: 'up'
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
        <div className="p-6">
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-red-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <Button 
                variant="outline" 
                onClick={fetchPlotData}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-16 lg:top-0 z-30 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-xl p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {plotData.name}
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-600">{plotData.crop}</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full px-3">
                    {plotData.efficiency}% Efficient
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/chat?plotId=${plotId}`)}
                className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/plot/${plotId}/settings`)}
                className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
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
          {/* Location Card */}
          <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Garden Location</h3>
                    <p className="text-blue-100 text-sm">Tap coordinates to copy</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyCoordinates}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">GPS Coordinates</p>
                  <p className="font-mono text-lg font-semibold bg-gray-50 p-3 rounded-xl border">
                    {plotData.location}
                  </p>
                </div>
                <div className="h-24 rounded-xl overflow-hidden">
                  <MiniMap 
                    latitude={latitude}
                    longitude={longitude}
                    plotName={plotData.name}
                    showControls={false}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-32 z-20 bg-white/95 backdrop-blur-lg -mx-6 px-6 py-4 border-b border-gray-100">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-2xl p-1">
                <TabsTrigger 
                  value="details" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Live Data
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="mt-8 space-y-6">
              {/* Modern Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-blue-500 rounded-2xl w-fit mx-auto mb-4">
                      <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-1">{plotData.currentMoisture}%</div>
                    <div className="text-blue-700 font-medium mb-2">Soil Moisture</div>
                    <div className="flex items-center justify-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-medium">+5% vs yesterday</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-orange-500 rounded-2xl w-fit mx-auto mb-4">
                      <Thermometer className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-orange-900 mb-1">{plotData.currentTemp}°F</div>
                    <div className="text-orange-700 font-medium mb-2">Temperature</div>
                    <div className="flex items-center justify-center text-sm">
                      <Activity className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-blue-600 font-medium">Optimal range</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-yellow-500 rounded-2xl w-fit mx-auto mb-4">
                      <Sun className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-900 mb-1">{plotData.currentSunlight}%</div>
                    <div className="text-yellow-700 font-medium mb-2">Sunlight</div>
                    <div className="flex items-center justify-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-medium">Perfect exposure</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plant Information */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                  <h3 className="text-xl font-semibold mb-2">Plant Health Status</h3>
                  <p className="text-green-100">Your garden is thriving! 🌱</p>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Plant Age</p>
                      <p className="text-2xl font-bold text-green-800">{plotData.cropAge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Next Watering</p>
                      <p className="text-2xl font-bold text-green-800">{plotData.nextWatering}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-8 space-y-6">
              <CalendarSchedule 
                schedule={plotData.schedule}
                onDayClick={handleDayClick}
              />

              {/* Weekly Summary */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-900 mb-1">{plotData.totalWaterToday}L</div>
                    <div className="text-emerald-700 font-medium">Today's Water</div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-1">{plotData.weeklyTotal}L</div>
                    <div className="text-blue-700 font-medium">Weekly Total</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Modern Sticky Water Button */}
      <div className="fixed bottom-6 left-6 right-6 lg:left-80 lg:right-6 z-30">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-16 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
