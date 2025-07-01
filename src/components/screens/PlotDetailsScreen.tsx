
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
  BarChart3,
  Bell,
  Camera,
  Share2,
  Heart,
  Gauge,
  Cloud,
  Wind,
  Eye,
  Clock,
  Target,
  Award,
  Wifi,
  WifiOff,
  Battery,
  ChevronRight,
  Info
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
      console.log(`Plot data loaded for plot: ${plotId}`);
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
        name: "Cherry Tomato Garden",
        crop: "Cherry Tomatoes",
        variety: "Sweet 100",
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
        trend: 'up',
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
        title: "💧 Watering Started",
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
    navigate(`/app/plot/${plotId}/day/${day.date}?lat=${latitude}&lon=${longitude}&date=${day.date}`);
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
    
    // Simulate connectivity status
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 10000);
    
    return () => clearInterval(interval);
  }, [plotId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6 space-y-6">
          <div className="animate-pulse">
            <div className="h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6"></div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-4"></div>
            ))}
          </div>
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
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Oops! Something went wrong</h3>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🍅</span>
                  </div>
                  {isOnline ? (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Wifi className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <WifiOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{plotData?.name}</h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-gray-600 dark:text-gray-300">{plotData?.crop} • {plotData?.variety}</p>
                    <Badge variant="outline" className="text-xs">
                      <Heart className="w-3 h-3 mr-1 text-red-500" />
                      Health: {plotData?.healthScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={shareplot} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate(`/app/plot/${plotId}/settings`)}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-6 space-y-8 pb-24">
          {/* Status Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {plotData?.sensors.map((sensor: any) => (
              <Card key={sensor.id} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
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

          {/* Growth Progress */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Growth Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plotData?.growthStages.map((stage: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      stage.status === 'completed' ? 'bg-green-500 text-white' :
                      stage.status === 'current' ? 'bg-blue-500 text-white' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {stage.status === 'completed' && <Award className="w-5 h-5" />}
                      {stage.status === 'current' && <Activity className="w-5 h-5" />}
                      {stage.status === 'upcoming' && <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{stage.stage}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{stage.date}</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Eye className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8 space-y-6">
              {/* Next Watering Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <Droplets className="w-6 h-6 mr-2" />
                        Next Watering
                      </h3>
                      <p className="text-3xl font-bold mb-2">{plotData?.nextWatering}</p>
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
                schedule={plotData?.schedule || []} 
                onDayClick={handleDayClick}
              />

              {/* Enhanced Location Card */}
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
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Wind className="w-5 h-5 text-gray-600 dark:text-gray-300 mx-auto mb-1" />
                      <div className="font-semibold">{plotData?.windSpeed} mph</div>
                      <div className="text-xs text-gray-500">Wind Speed</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Sun className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                      <div className="font-semibold">UV {plotData?.uvIndex}</div>
                      <div className="text-xs text-gray-500">UV Index</div>
                    </div>
                  </div>
                  <MiniMap latitude={latitude} longitude={longitude} plotName={plotData?.name} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-8">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: Droplets, color: "blue", title: "Watering completed", desc: "15L water applied", time: "2 hours ago", bg: "bg-blue-50 dark:bg-blue-900/20" },
                      { icon: TrendingUp, color: "green", title: "Moisture level improved", desc: "From 45% to 68%", time: "3 hours ago", bg: "bg-green-50 dark:bg-green-900/20" },
                      { icon: AlertTriangle, color: "orange", title: "Low moisture alert", desc: "Moisture dropped to 45%", time: "5 hours ago", bg: "bg-orange-50 dark:bg-orange-900/20" },
                      { icon: Leaf, color: "green", title: "Growth stage updated", desc: "Entered flowering stage", time: "1 day ago", bg: "bg-green-50 dark:bg-green-900/20" },
                      { icon: Camera, color: "purple", title: "Photo captured", desc: "Weekly growth photo", time: "2 days ago", bg: "bg-purple-50 dark:bg-purple-900/20" }
                    ].map((activity, index) => (
                      <div key={index} className={`flex items-start space-x-4 p-4 ${activity.bg} rounded-2xl transition-all duration-200 hover:shadow-md`}>
                        <div className={`w-12 h-12 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-xl flex items-center justify-center`}>
                          <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{activity.desc}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span>Water Usage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{plotData?.totalWaterToday}L</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Used today</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly total</span>
                        <span className="font-semibold">{plotData?.weeklyTotal}L</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-green-600" />
                      <span>Efficiency</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-600 mb-2">{plotData?.efficiency}%</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">This week</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">+5% from last week</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Nutrient Levels */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>Soil Nutrients</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(plotData?.nutrients || {}).map(([nutrient, value]) => (
                      <div key={nutrient} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize font-medium">{nutrient}</span>
                          <span className="font-semibold">{value}%</span>
                        </div>
                        <Progress value={value as number} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Status */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Device Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Battery className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Battery</p>
                        <p className="text-sm text-gray-500">{plotData?.batteryLevel}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wifi className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Signal</p>
                        <p className="text-sm text-gray-500">{plotData?.signalStrength}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-18 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
        >
          {watering ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              <div className="text-center">
                <div>Watering in progress...</div>
                <div className="text-sm opacity-80">Please wait</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div>💧 Water Now</div>
                <div className="text-sm opacity-80">5 minute cycle</div>
              </div>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlotDetailsScreen;
