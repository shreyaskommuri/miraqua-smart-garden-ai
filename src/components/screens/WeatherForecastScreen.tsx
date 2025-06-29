
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Cloud, Sun, CloudRain, Droplets, Thermometer, Wind, Eye } from "lucide-react";

const WeatherForecastScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const plotId = searchParams.get('plotId');
  const latitude = searchParams.get('lat') || 37.7749;
  const longitude = searchParams.get('lon') || -122.4194;

  useEffect(() => {
    fetchWeatherForecast();
  }, [latitude, longitude]);

  const fetchWeatherForecast = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setForecastData({
        location: `${parseFloat(latitude).toFixed(4)}, ${parseFloat(longitude).toFixed(4)}`,
        current: {
          temperature: 72,
          condition: "sunny",
          humidity: 65,
          windSpeed: 8,
          visibility: 10
        },
        forecast: [
          {
            day: "Today",
            date: "2024-01-15",
            high: 75,
            low: 58,
            condition: "sunny",
            humidity: 60,
            windSpeed: 12,
            rainChance: 5,
            rainAmount: 0
          },
          {
            day: "Tomorrow",
            date: "2024-01-16",
            high: 73,
            low: 56,
            condition: "partly-cloudy",
            humidity: 70,
            windSpeed: 15,
            rainChance: 20,
            rainAmount: 0
          },
          {
            day: "Wednesday",
            date: "2024-01-17",
            high: 68,
            low: 52,
            condition: "cloudy",
            humidity: 85,
            windSpeed: 18,
            rainChance: 60,
            rainAmount: 0.2
          },
          {
            day: "Thursday",
            date: "2024-01-18",
            high: 65,
            low: 48,
            condition: "rainy",
            humidity: 90,
            windSpeed: 22,
            rainChance: 85,
            rainAmount: 1.2
          },
          {
            day: "Friday",
            date: "2024-01-19",
            high: 70,
            low: 54,
            condition: "partly-cloudy",
            humidity: 75,
            windSpeed: 14,
            rainChance: 30,
            rainAmount: 0
          },
          {
            day: "Saturday",
            date: "2024-01-20",
            high: 74,
            low: 58,
            condition: "sunny",
            humidity: 65,
            windSpeed: 10,
            rainChance: 10,
            rainAmount: 0
          },
          {
            day: "Sunday",
            date: "2024-01-21",
            high: 76,
            low: 60,
            condition: "sunny",
            humidity: 60,
            windSpeed: 8,
            rainChance: 5,
            rainAmount: 0
          }
        ]
      });
    } catch (err) {
      setError("Failed to load weather forecast. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition, size = "w-6 h-6") => {
    switch (condition) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'partly-cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-600`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getRainColor = (chance) => {
    if (chance >= 70) return "text-blue-600 font-semibold";
    if (chance >= 40) return "text-blue-500";
    return "text-gray-600";
  };

  const handleDayClick = (day) => {
    if (plotId) {
      navigate(`/plot/${plotId}/day/${day.day.toLowerCase()}?date=${day.date}`);
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
        
        <div className="px-6 py-6 space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
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
            <Button onClick={fetchWeatherForecast} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-gray-900">Weather Forecast</h1>
              <p className="text-sm text-gray-600">{forecastData.location}</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-24 space-y-6">
          {/* Current Weather */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {forecastData.current.temperature}°F
                  </h2>
                  <p className="text-blue-100 capitalize">
                    {forecastData.current.condition}
                  </p>
                </div>
                {getWeatherIcon(forecastData.current.condition, "w-12 h-12")}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-200" />
                  <span>{forecastData.current.humidity}% humidity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-blue-200" />
                  <span>{forecastData.current.windSpeed} mph</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-200" />
                  <span>{forecastData.current.visibility} mi</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {forecastData.forecast.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-16 text-sm font-medium text-gray-900">
                        {day.day}
                      </div>
                      {getWeatherIcon(day.condition)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900">
                            {day.high}°
                          </span>
                          <span className="text-gray-600">
                            {day.low}°
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm ${getRainColor(day.rainChance)}`}>
                        {day.rainChance}% rain
                      </div>
                      {day.rainAmount > 0 && (
                        <div className="text-xs text-blue-600">
                          {day.rainAmount}" expected
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Impact on Watering */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Watering Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Rain Expected</h4>
                <p className="text-sm text-blue-800">
                  Thursday's forecast shows 85% chance of rain with 1.2" expected. 
                  Automatic watering will be skipped to prevent overwatering.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Hot Weather Alert</h4>
                <p className="text-sm text-yellow-800">
                  Temperatures will be above 75°F this weekend. 
                  Consider increasing watering frequency by 15-20%.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Optimal Conditions</h4>
                <p className="text-sm text-green-800">
                  Friday through Sunday show ideal growing conditions with 
                  moderate temperatures and good humidity levels.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weather Chart Placeholder */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Temperature & Rainfall Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Thermometer className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive weather chart</p>
                  <p className="text-sm text-gray-500">Tap any day above for details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherForecastScreen;
