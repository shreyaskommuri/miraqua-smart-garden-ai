
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarSchedule } from "@/components/ui/CalendarSchedule";
import { MiniMap } from "@/components/ui/MiniMap";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MessageSquare, 
  Settings, 
  Droplets, 
  Thermometer, 
  Sun, 
  MapPin,
  Copy,
  Loader2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Activity,
  Leaf,
  Calendar,
  BarChart3,
  Camera,
  Share2,
  Heart,
  Gauge,
  Wind,
  Eye,
  Clock,
  Target,
  Award,
  Wifi,
  WifiOff,
  Battery,
  ChevronRight,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isOnline, setIsOnline] = useState(true);

  const latitude = parseFloat(searchParams.get('lat') || '37.7749');
  const longitude = parseFloat(searchParams.get('lon') || '-122.4194');

  const fetchPlotData = async () => {
    setLoading(true);
    setError("");
    
    try {
      console.log(`Fetching plot data for plot: ${plotId}`);
      
      // Simulate API call
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
        }
      ];

      // Get plot-specific data based on plotId
      const plotsData = {
        '1': {
          name: "Cherry Tomato Garden",
          crop: "Cherry Tomatoes",
          variety: "Sweet 100"
        },
        '2': {
          name: "Herb Garden", 
          crop: "Mixed Herbs",
          variety: "Basil & Rosemary"
        },
        '3': {
          name: "Pepper Patch",
          crop: "Bell Peppers", 
          variety: "California Wonder"
        }
      };

      const currentPlot = plotsData[plotId as keyof typeof plotsData] || plotsData['1'];
      
      setPlotData({
        id: plotId,
        ...currentPlot,
        location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        currentTemp: 72,
        currentMoisture: 68,
        currentSunlight: 85,
        humidity: 62,
        windSpeed: 8,
        uvIndex: 7,
        cropAge: "45 days",
        plantingDate: "May 15, 2024",
        expectedHarvest: "August 20, 2024",
        nextWatering: "Tomorrow 6:00 AM",
        schedule: mockSchedule,
        totalWaterToday: 15,
        weeklyTotal: 95,
        efficiency: 92,
        healthScore: 87,
        lastWatered: "2 hours ago",
        soilPh: 6.8,
        batteryLevel: 78,
        signalStrength: 85,
        nutrients: {
          nitrogen: 75,
          phosphorus: 82,
          potassium: 68
        },
        sensors: [
          { id: 1, name: "Soil Moisture", value: 68, unit: "%", status: "good", lastUpdate: "2 min ago" },
          { id: 2, name: "Temperature", value: 72, unit: "°F", status: "optimal", lastUpdate: "1 min ago" },
          { id: 3, name: "Light", value: 85, unit: "%", status: "good", lastUpdate: "3 min ago" },
          { id: 4, name: "pH Level", value: 6.8, unit: "pH", status: "good", lastUpdate: "5 min ago" }
        ],
        growthStages: [
          { stage: "Germination", date: "May 15", status: "completed", progress: 100 },
          { stage: "Seedling", date: "May 25", status: "completed", progress: 100 },
          { stage: "Vegetative", date: "Jun 10", status: "completed", progress: 100 },
          { stage: "Flowering", date: "Jun 30", status: "current", progress: 75 },
          { stage: "Fruiting", date: "Jul 20", status: "upcoming", progress: 0 },
          { stage: "Harvest", date: "Aug 20", status: "upcoming", progress: 0 }
        ]
      });

      console.log('Plot data loaded successfully:', currentPlot);
    } catch (err) {
      console.error('Error loading plot data:', err);
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
        title: "💧 Watering Started",
        description: "Your garden is being watered for 5 minutes",
      });
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
    navigate(`/app/plot/${plotId}/day/${day.date}?lat=${latitude}&lon=${longitude}`);
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    toast({
      title: "📍 Coordinates Copied",
      description: "Location copied to clipboard"
    });
  };

  const sharePlot = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "📤 Plot Shared", 
      description: "Plot link copied to clipboard"
    });
  };

  useEffect(() => {
    fetchPlotData();
  }, [plotId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading plot details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Something went wrong</h3>
              <p className="text-red-600 dark:text-red-300 mb-6 text-lg">{error}</p>
              <Button onClick={fetchPlotData} size="lg" className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!plotData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">No plot data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Wifi className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{plotData.name}</h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-gray-600 dark:text-gray-300">{plotData.crop} • {plotData.variety}</p>
                    <Badge variant="outline" className="text-xs">
                      <Heart className="w-3 h-3 mr-1 text-red-500" />
                      Health: {plotData.healthScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={sharePlot}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate(`/app/plot/${plotId}/settings`)}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-6 space-y-8 pb-24">
          {/* Sensor Status Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {plotData.sensors.map((sensor: any) => (
              <Card key={sensor.id} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      sensor.name === 'Soil Moisture' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      sensor.name === 'Temperature' ? 'bg-orange-100 dark:bg-orange-900/30' :
                      sensor.name === 'Light' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      {sensor.name === 'Soil Moisture' && <Droplets className="w-5 h-5 text-blue-600" />}
                      {sensor.name === 'Temperature' && <Thermometer className="w-5 h-5 text-orange-600" />}
                      {sensor.name === 'Light' && <Sun className="w-5 h-5 text-yellow-600" />}
                      {sensor.name === 'pH Level' && <Activity className="w-5 h-5 text-green-600" />}
                    </div>
                    <Badge variant={sensor.status === 'optimal' ? 'default' : 'secondary'} className="text-xs">
                      {sensor.status}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {sensor.value}{sensor.unit}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {sensor.lastUpdate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Watering Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Droplets className="w-6 h-6 mr-2" />
                    Next Watering
                  </h3>
                  <p className="text-3xl font-bold mb-2">{plotData.nextWatering}</p>
                  <p className="text-blue-100">Scheduled automatic watering</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Expected duration</p>
                  <p className="text-2xl font-bold">5 min</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Schedule */}
          <CalendarSchedule 
            schedule={plotData.schedule} 
            onDayClick={handleDayClick}
          />

          {/* Location Card */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Location & Environment</span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyCoordinates}>
                  <Copy className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MiniMap latitude={latitude} longitude={longitude} plotName={plotData.name} />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Water Now Button */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-3xl shadow-2xl"
        >
          {watering ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Watering in progress...
            </>
          ) : (
            <>
              <Droplets className="w-6 h-6 mr-3" />
              💧 Water Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlotDetailsScreen;
