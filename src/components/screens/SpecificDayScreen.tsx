
import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Droplets, 
  Thermometer, 
  Sun, 
  Calendar,
  Clock,
  MapPin,
  Play,
  Pause,
  ExternalLink,
  Copy,
  CloudRain,
  Wind,
  Eye,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Camera,
  MessageSquare
} from "lucide-react";
import { MiniMap } from "@/components/ui/MiniMap";

const SpecificDayScreen = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isWatering, setIsWatering] = useState(false);
  const [duration, setDuration] = useState("15");
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Get coordinates from URL params
  const latitude = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 37.7749;
  const longitude = searchParams.get('lon') ? parseFloat(searchParams.get('lon')!) : -122.4194;

  // Enhanced day data
  const dayData = {
    date: `June ${date}, 2024`,
    dayOfWeek: "Monday",
    scheduledTime: "6:00 AM",
    plannedVolume: "2.5L",
    completed: false,
    actualVolume: "0L",
    actualTime: "",
    plotName: "Tomato Garden",
    weather: {
      current: {
        temperature: 75,
        humidity: 62,
        precipitation: "0%",
        condition: "Sunny",
        uvIndex: 7,
        windSpeed: "5 mph"
      },
      hourly: [
        { time: "6 AM", temp: 68, condition: "Clear", icon: "☀️", precipitation: 0 },
        { time: "9 AM", temp: 72, condition: "Sunny", icon: "☀️", precipitation: 0 },
        { time: "12 PM", temp: 78, condition: "Sunny", icon: "☀️", precipitation: 5 },
        { time: "3 PM", temp: 82, condition: "Partly Cloudy", icon: "⛅", precipitation: 10 },
        { time: "6 PM", temp: 76, condition: "Cloudy", icon: "☁️", precipitation: 20 },
        { time: "9 PM", temp: 70, condition: "Clear", icon: "🌙", precipitation: 0 }
      ]
    },
    metrics: {
      current: {
        moisture: 58,
        temperature: 72,
        sunlight: 85,
        ph: 6.8
      },
      trend: {
        moisture: -8,
        temperature: +2,
        sunlight: +12
      }
    },
    aiRecommendations: [
      {
        type: "timing",
        priority: "high",
        title: "Optimal Watering Window",
        message: "Water between 5:30-6:30 AM for best absorption",
        icon: "⏰"
      },
      {
        type: "duration",
        priority: "medium", 
        title: "Adjust Duration",
        message: "Reduce to 12 minutes due to recent humidity",
        icon: "💧"
      },
      {
        type: "weather",
        priority: "low",
        title: "Weather Alert",
        message: "Light rain possible this evening - monitor soil",
        icon: "🌧️"
      }
    ],
    history: [
      { time: "6:00 AM", action: "Watering scheduled", type: "schedule" },
      { time: "5:45 AM", action: "Soil moisture check: 58%", type: "reading" },
      { time: "12:00 AM", action: "Weather update received", type: "system" }
    ]
  };

  const handleWaterNow = () => {
    setIsWatering(true);
    // Simulate watering process
    setTimeout(() => {
      setIsWatering(false);
      // Update completed status
    }, parseInt(duration) * 1000);
  };

  const copyCoordinates = async () => {
    const coords = `${latitude}, ${longitude}`;
    try {
      await navigator.clipboard.writeText(coords);
    } catch (err) {
      console.error('Failed to copy coordinates:', err);
    }
  };

  const openInMaps = () => {
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">{dayData.dayOfWeek}</h1>
              <p className="text-sm text-gray-500">{dayData.date}</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Plot Location */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {dayData.plotName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                  <Button variant="ghost" size="sm" onClick={copyCoordinates} className="p-1">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={openInMaps}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </div>
            
            <MiniMap 
              latitude={latitude}
              longitude={longitude}
              plotName={dayData.plotName}
              className="h-24"
            />
          </CardContent>
        </Card>

        {/* Schedule Status */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Today's Schedule</h3>
                <p className="text-sm opacity-90">
                  {dayData.completed ? "Completed" : "Scheduled"} for {dayData.scheduledTime}
                </p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                {dayData.completed ? "Done" : "Pending"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-90">Planned Volume</p>
                <p className="font-medium">{dayData.plannedVolume}</p>
              </div>
              <div>
                <p className="opacity-90">Actual Volume</p>
                <p className="font-medium">{dayData.actualVolume || "Not watered yet"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* AI Recommendations */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dayData.aiRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-xl">{rec.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm">{rec.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Activity */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Today's Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayData.history.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'schedule' ? 'bg-blue-500' :
                      item.type === 'reading' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6 mt-6">
            {/* Current Weather */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Current Weather</h3>
                    <p className="text-sm opacity-90">{dayData.weather.current.condition}</p>
                  </div>
                  <div className="text-4xl">☀️</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="opacity-90">Temperature</p>
                    <p className="font-medium">{dayData.weather.current.temperature}°F</p>
                  </div>
                  <div>
                    <p className="opacity-90">Humidity</p>
                    <p className="font-medium">{dayData.weather.current.humidity}%</p>
                  </div>
                  <div>
                    <p className="opacity-90">UV Index</p>
                    <p className="font-medium">{dayData.weather.current.uvIndex}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hourly Forecast */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Hourly Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {dayData.weather.hourly.map((hour, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{hour.time}</p>
                      <div className="text-2xl mb-1">{hour.icon}</div>
                      <p className="font-semibold text-gray-900">{hour.temp}°F</p>
                      <p className="text-xs text-blue-600">{hour.precipitation}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6 mt-6">
            {/* Current Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      dayData.metrics.trend.moisture < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">{dayData.metrics.trend.moisture}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {dayData.metrics.current.moisture}%
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Soil Moisture</div>
                  <Progress value={dayData.metrics.current.moisture} className="h-2" />
                  <p className="text-xs text-orange-600 mt-1">Below optimal - watering recommended</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">+{dayData.metrics.trend.temperature}°F</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {dayData.metrics.current.temperature}°F
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Soil Temperature</div>
                  <Progress value={(dayData.metrics.current.temperature - 50) * 2} className="h-2" />
                  <p className="text-xs text-green-600 mt-1">Perfect for root development</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Sun className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">+{dayData.metrics.trend.sunlight}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {dayData.metrics.current.sunlight}%
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Sunlight Exposure</div>
                  <Progress value={dayData.metrics.current.sunlight} className="h-2" />
                  <p className="text-xs text-green-600 mt-1">Excellent light conditions</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {dayData.metrics.current.ph}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Soil pH</div>
                  <Progress value={((dayData.metrics.current.ph - 5) / 4) * 100} className="h-2" />
                  <p className="text-xs text-green-600 mt-1">Optimal range for tomatoes</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            {/* Water Now Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                  Manual Watering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleWaterNow}
                  disabled={isWatering}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {isWatering ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Watering... ({duration}min)
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Water Now ({duration}min)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="h-12">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask AI
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Calendar className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                  <Button variant="outline" className="h-12">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Notes for Today</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any observations or notes for this day..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button className="mt-3 w-full" variant="outline">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default SpecificDayScreen;
