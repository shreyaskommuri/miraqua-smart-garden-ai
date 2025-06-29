
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Droplets, Clock, MapPin, Sun, CloudRain, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SpecificDayScreen = () => {
  const navigate = useNavigate();
  const { plotId, day } = useParams();
  const { toast } = useToast();
  const [dayData, setDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWatering, setIsWatering] = useState(false);
  const [duration, setDuration] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDayData();
  }, [plotId, day]);

  const fetchDayData = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDayData({
        date: day,
        plotName: "Pepper Patch",
        weather: {
          high: 78,
          low: 62,
          condition: "sunny",
          humidity: 65,
          windSpeed: 8
        },
        hourlySchedule: [
          { hour: 6, scheduled: 1.2, actual: 1.2, weather: "clear" },
          { hour: 12, scheduled: 0, actual: 0, weather: "sunny" },
          { hour: 18, scheduled: 0.8, actual: 0.8, weather: "clear" },
        ],
        totalScheduled: 2.0,
        totalActual: 2.0,
        soilMoisture: [
          { time: "06:00", level: 45 },
          { time: "09:00", level: 52 },
          { time: "12:00", level: 48 },
          { time: "15:00", level: 43 },
          { time: "18:00", level: 51 },
          { time: "21:00", level: 49 }
        ],
        location: { lat: 37.7747, lon: -122.4192 }
      });
    } catch (err) {
      setError("Failed to load day details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaterNow = async () => {
    if (duration < 1 || duration > 60) {
      toast({
        title: "Invalid Duration",
        description: "Duration must be between 1 and 60 minutes.",
        variant: "destructive"
      });
      return;
    }

    setIsWatering(true);
    
    try {
      // Simulate watering API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Watering Started",
        description: `Watering ${dayData.plotName} for ${duration} minutes.`,
      });
      
      // Refresh data after watering
      await fetchDayData();
    } catch (err) {
      toast({
        title: "Watering Failed",
        description: "Unable to start watering. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsWatering(false);
    }
  };

  const handleMapClick = () => {
    if (dayData?.location) {
      navigate(`/map?lat=${dayData.location.lat}&lon=${dayData.location.lon}&zoom=15`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </header>
        
        <div className="px-6 py-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchDayData} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">Day data not found</p>
            <Button onClick={() => navigate(-1)} className="w-full">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <CloudRain className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{dayData.plotName}</h1>
              <p className="text-sm text-gray-600 capitalize">{day}</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-32 space-y-6">
          {/* Weather Overview */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(dayData.weather.condition)}
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">{dayData.weather.condition}</h3>
                    <p className="text-sm text-gray-600">
                      {dayData.weather.high}°F / {dayData.weather.low}°F
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Humidity:</span>
                  <span className="ml-2 font-medium">{dayData.weather.humidity}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Wind:</span>
                  <span className="ml-2 font-medium">{dayData.weather.windSpeed} mph</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Schedule */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Hourly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayData.hourlySchedule.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-12">
                        {hour.hour}:00
                      </span>
                      {getWeatherIcon(hour.weather)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">
                        {hour.scheduled > 0 ? `${hour.scheduled}L` : 'Skip'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {hour.actual > 0 ? `✓ ${hour.actual}L delivered` : 'Not scheduled'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total scheduled:</span>
                  <span className="font-bold text-blue-600">{dayData.totalScheduled}L</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Total delivered:</span>
                  <span className="font-bold text-green-600">{dayData.totalActual}L</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manual Watering */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                Manual Watering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 5)}
                  className="h-12"
                />
                <p className="text-xs text-gray-500">
                  Duration must be between 1 and 60 minutes
                </p>
              </div>
              
              <Button
                onClick={handleWaterNow}
                disabled={isWatering}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isWatering ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Droplets className="w-4 h-4 mr-2" />
                    Water Now ({duration} min)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Soil Moisture Chart */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Soil Moisture Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayData.soilMoisture.map((reading, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{reading.time}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${reading.level}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-10">{reading.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Map Thumbnail */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <div 
                onClick={handleMapClick}
                className="relative w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg cursor-pointer hover:from-blue-200 hover:to-green-200 transition-colors"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Tap to view full map</p>
                    <p className="text-xs text-gray-500">
                      {dayData.location.lat.toFixed(4)}, {dayData.location.lon.toFixed(4)}
                    </p>
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

export default SpecificDayScreen;
