
import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Droplets, 
  Sun, 
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Clock,
  Play,
  Pause,
  Settings,
  Map,
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { MiniMap } from "@/components/ui/MiniMap";
import { usePlotUpdates } from "@/components/ui/RealTimeUpdates";

const SpecificDayScreen = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [duration, setDuration] = useState('5');
  const [wateringMode, setWateringMode] = useState<'manual' | 'scheduled'>('manual');
  const [isWatering, setIsWatering] = useState(false);
  
  // Get real-time updates for this plot
  const { sensorData, wateringStatus } = usePlotUpdates(id || '1');
  
  // Get coordinates from URL params
  const latitude = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 37.7749;
  const longitude = searchParams.get('lon') ? parseFloat(searchParams.get('lon')!) : -122.4194;
  const fromWeather = searchParams.get('weather') === 'true';

  // Mock data for the specific day
  const dayData = {
    date: date || '2024-01-15',
    plotName: 'Tomato Garden',
    weather: {
      high: 75,
      low: 58,
      condition: 'sunny',
      humidity: 65,
      wind: 8,
      precipitation: 0,
      icon: Sun
    },
    schedule: [
      {
        time: '06:00',
        duration: 12,
        volume: 2.2,
        status: 'completed',
        actualDuration: 12,
        efficiency: 95,
        moisture: { before: 45, after: 68 }
      },
      {
        time: '18:00',
        duration: 8,
        volume: 1.5,
        status: 'scheduled',
        actualDuration: 0,
        efficiency: 0,
        moisture: { before: 0, after: 0 }
      }
    ],
    hourlyWeather: [
      { time: '00:00', temp: 62, humidity: 78, wind: 5, icon: Cloud },
      { time: '03:00', temp: 59, humidity: 82, wind: 4, icon: Cloud },
      { time: '06:00', temp: 58, humidity: 85, wind: 3, icon: Sun },
      { time: '09:00', temp: 68, humidity: 70, wind: 6, icon: Sun },
      { time: '12:00', temp: 75, humidity: 60, wind: 8, icon: Sun },
      { time: '15:00', temp: 74, humidity: 58, wind: 9, icon: Sun },
      { time: '18:00', temp: 70, humidity: 65, wind: 7, icon: Sun },
      { time: '21:00', temp: 65, humidity: 72, wind: 5, icon: Cloud }
    ],
    insights: [
      {
        type: 'efficiency',
        title: 'High Absorption Rate',
        message: 'Morning watering achieved 95% efficiency due to optimal conditions',
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        type: 'recommendation',
        title: 'Evening Watering Optimal',
        message: 'Low wind and moderate humidity make 6 PM ideal for next watering',
        icon: Clock,
        color: 'text-blue-600'
      },
      {
        type: 'alert',
        title: 'Monitor Soil Temperature',
        message: 'Soil temperature rising - consider mulching to retain moisture',
        icon: AlertTriangle,
        color: 'text-orange-600'
      }
    ]
  };

  const handleWaterNow = async () => {
    setIsWatering(true);
    
    // Simulate watering process
    console.log(`Starting manual watering for ${duration} minutes`);
    
    // In production, this would call the actual API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsWatering(false);
    alert(`Watering started for ${duration} minutes!`);
    
    // Refresh the UI to show updated status
    window.location.reload();
  };

  const WeatherIcon = dayData.weather.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
              <h1 className="text-lg font-semibold text-gray-900">{dayData.plotName}</h1>
              <p className="text-sm text-gray-500">
                {new Date(dayData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/plot/${id}?lat=${latitude}&lon=${longitude}`)}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Weather Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <WeatherIcon className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">{dayData.weather.high}°F</h2>
                    <p className="text-sm opacity-90">High: {dayData.weather.high}° • Low: {dayData.weather.low}°</p>
                  </div>
                </div>
                <p className="text-sm opacity-75 capitalize">{dayData.weather.condition}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Precipitation</p>
                <p className="text-xl font-bold">{dayData.weather.precipitation}%</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Droplets className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">{dayData.weather.humidity}%</p>
                <p className="opacity-75 text-xs">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">{dayData.weather.wind} mph</p>
                <p className="opacity-75 text-xs">Wind</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">Good</p>
                <p className="opacity-75 text-xs">Conditions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Sensor Data */}
        {sensorData && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="font-semibold text-green-900">Live Sensor Data</h4>
                    <p className="text-sm text-green-700">
                      Moisture: {sensorData.moisture}% • Temperature: {sensorData.temperature}°F
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Live</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manual Watering Controls */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Play className="w-5 h-5 mr-2 text-blue-600" />
              Manual Watering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={wateringMode} onValueChange={(value) => setWateringMode(value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="scheduled">Add to Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {wateringStatus && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {wateringStatus.status === 'started' ? 'Currently Watering' : 'Watering Status'}
                  </span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  {wateringStatus.status === 'started' 
                    ? `${wateringStatus.duration} minutes remaining`
                    : `Last watered: ${wateringStatus.lastCompleted || 'Unknown'}`
                  }
                </p>
              </div>
            )}

            <Button
              onClick={handleWaterNow}
              disabled={isWatering}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isWatering ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Starting Watering...
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4 mr-2" />
                  Water for {duration} minutes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Watering */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dayData.schedule.map((session, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  session.status === 'completed' 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {session.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.time}</h4>
                      <p className="text-sm text-gray-600">
                        {session.duration} min • {session.volume}L
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                  >
                    {session.status}
                  </Badge>
                </div>
                
                {session.status === 'completed' && (
                  <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <p className="text-gray-600">Efficiency</p>
                      <p className="font-semibold text-green-600">{session.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Moisture</p>
                      <p className="font-semibold text-gray-900">
                        {session.moisture.before}% → {session.moisture.after}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{session.actualDuration} min</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hourly Conditions */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Hourly Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {dayData.hourlyWeather.map((hour, index) => {
                  const HourIcon = hour.icon;
                  return (
                    <div key={index} className="flex-shrink-0 text-center p-3 bg-gray-50 rounded-lg min-w-[80px]">
                      <p className="text-xs text-gray-600 mb-1">{hour.time}</p>
                      <HourIcon className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <p className="font-semibold text-sm text-gray-900">{hour.temp}°</p>
                      <p className="text-xs text-gray-500">{hour.humidity}%</p>
                      <p className="text-xs text-gray-500">{hour.wind}mph</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Map */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Map className="w-5 h-5 mr-2 text-purple-600" />
              Plot Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MiniMap 
              latitude={latitude}
              longitude={longitude}
              plotName={dayData.plotName}
              className="h-48"
            />
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Coordinates</p>
                <p className="font-medium">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-gray-600">Zone</p>
                <p className="font-medium">USDA Zone 10a</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Insights */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Smart Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dayData.insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className={`w-5 h-5 mt-1 ${insight.color}`} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default SpecificDayScreen;
