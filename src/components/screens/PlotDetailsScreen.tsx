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
  RefreshCw
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
        weeklyTotal: 95
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
        title: "Watering started",
        description: "Manual watering for 5 minutes",
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
      title: "Coordinates copied",
      description: "Location copied to clipboard"
    });
  };

  useEffect(() => {
    fetchPlotData();
  }, [plotId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold">Plot Details</h1>
            </div>
          </div>
        </header>
        
        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold">Plot Details</h1>
            </div>
          </div>
        </header>
        
        <div className="p-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchPlotData}>
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-emerald-900">{plotData.name}</h1>
                <p className="text-sm text-emerald-700">{plotData.crop}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/chat?plotId=${plotId}`)}>
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-160px)]">
        <div className="px-4 py-4 space-y-6 pb-32">
          {/* Location Card */}
          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Location</span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyCoordinates}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                  <p className="font-mono text-sm">{plotData.location}</p>
                </div>
                <div className="h-16">
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
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm -mx-4 px-4 py-2 border-b">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">{plotData.currentMoisture}%</div>
                    <div className="text-sm text-blue-700">Moisture</div>
                  </CardContent>
                </Card>
                
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4 text-center">
                    <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-900">{plotData.currentTemp}°F</div>
                    <div className="text-sm text-orange-700">Temperature</div>
                  </CardContent>
                </Card>
                
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <Sun className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-900">{plotData.currentSunlight}%</div>
                    <div className="text-sm text-yellow-700">Sunlight</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Plant Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Crop Age</p>
                      <p className="font-semibold text-green-800">{plotData.cropAge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 mb-1">Next Watering</p>
                      <p className="font-semibold text-green-800">{plotData.nextWatering}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6 space-y-4">
              <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-800">Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarSchedule 
                    schedule={plotData.schedule}
                    onDayClick={handleDayClick}
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-900">{plotData.totalWaterToday}L</div>
                    <div className="text-sm text-emerald-700">Today's Water</div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-900">{plotData.weeklyTotal}L</div>
                    <div className="text-sm text-blue-700">Weekly Total</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Sticky Water Now Button */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/95 backdrop-blur-sm border-t border-emerald-200 p-4">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium"
        >
          {watering ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Watering...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Water Now (5 min)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlotDetailsScreen;
