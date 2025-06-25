
import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  Copy
} from "lucide-react";

const SpecificDayScreen = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isWatering, setIsWatering] = useState(false);
  const [duration, setDuration] = useState("15");
  const [notes, setNotes] = useState("");

  // Get coordinates from URL params
  const latitude = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 37.7749;
  const longitude = searchParams.get('lon') ? parseFloat(searchParams.get('lon')!) : -122.4194;

  // Mock data - in real app this would come from API
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
      temperature: 75,
      humidity: 62,
      precipitation: "0%",
      condition: "Sunny"
    },
    metrics: {
      moisture: 58,
      temperature: 72,
      sunlight: 85
    },
    recommendations: [
      "Perfect conditions for watering",
      "Soil moisture is slightly low",
      "Consider watering 15 minutes earlier due to heat"
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
            <div className="flex items-center justify-between">
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
                <p className="font-medium">{dayData.actualVolume}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Context */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Sun className="w-5 h-5 mr-2 text-yellow-600" />
              Weather Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-lg font-semibold">{dayData.weather.temperature}°F</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">{dayData.weather.humidity}%</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Precipitation</p>
                  <p className="text-lg font-semibold">{dayData.weather.precipitation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="text-lg font-semibold">{dayData.weather.condition}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Metrics */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Current Plot Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Soil Moisture</span>
                  <span className="text-sm font-bold text-blue-600">{dayData.metrics.moisture}%</span>
                </div>
                <Progress value={dayData.metrics.moisture} className="h-3" />
                <p className="text-xs text-gray-500 mt-1">Below optimal - watering recommended</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Soil Temperature</span>
                  <span className="text-sm font-bold text-orange-600">{dayData.metrics.temperature}°F</span>
                </div>
                <Progress value={(dayData.metrics.temperature - 50) * 2} className="h-3" />
                <p className="text-xs text-gray-500 mt-1">Perfect for root development</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Sunlight Exposure</span>
                  <span className="text-sm font-bold text-yellow-600">{dayData.metrics.sunlight}%</span>
                </div>
                <Progress value={dayData.metrics.sunlight} className="h-3" />
                <p className="text-xs text-gray-500 mt-1">Excellent light conditions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-900">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dayData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p className="text-sm text-green-800">{rec}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

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
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default SpecificDayScreen;
