
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  Navigation,
  TrendingUp,
  TrendingDown,
  Calendar
} from "lucide-react";

const WeatherForecastScreen = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'chart' | 'table'>('chart');

  // Mock weather data - in production this would come from API
  const weatherData = [
    {
      day: 'Today',
      date: '2024-01-15',
      high: 75,
      low: 58,
      humidity: 65,
      wind: 8,
      precipitation: 0,
      condition: 'sunny',
      icon: Sun,
      rainSkip: false,
      et0: 4.2
    },
    {
      day: 'Tomorrow',
      date: '2024-01-16',
      high: 68,
      low: 52,
      humidity: 85,
      wind: 12,
      precipitation: 80,
      condition: 'rain',
      icon: CloudRain,
      rainSkip: true,
      et0: 2.1
    },
    {
      day: 'Wed',
      date: '2024-01-17',
      high: 72,
      low: 55,
      humidity: 70,
      wind: 6,
      precipitation: 10,
      condition: 'cloudy',
      icon: Cloud,
      rainSkip: false,
      et0: 3.8
    },
    {
      day: 'Thu',
      date: '2024-01-18',
      high: 78,
      low: 62,
      humidity: 60,
      wind: 5,
      precipitation: 0,
      condition: 'sunny',
      icon: Sun,
      rainSkip: false,
      et0: 4.5
    },
    {
      day: 'Fri',
      date: '2024-01-19',
      high: 74,
      low: 59,
      humidity: 68,
      wind: 7,
      precipitation: 20,
      condition: 'partly-cloudy',
      icon: Cloud,
      rainSkip: false,
      et0: 3.9
    },
    {
      day: 'Sat',
      date: '2024-01-20',
      high: 76,
      low: 61,
      humidity: 62,
      wind: 9,
      precipitation: 0,
      condition: 'sunny',
      icon: Sun,
      rainSkip: false,
      et0: 4.3
    },
    {
      day: 'Sun',
      date: '2024-01-21',
      high: 73,
      low: 57,
      humidity: 75,
      wind: 11,
      precipitation: 40,
      condition: 'cloudy',
      icon: Cloud,
      rainSkip: false,
      et0: 3.2
    }
  ];

  const handleDayClick = (date: string) => {
    navigate(`/plot/1/day/${date}?weather=true`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
              <h1 className="text-lg font-semibold text-gray-900">Weather Forecast</h1>
              <p className="text-sm text-gray-500">7-Day Outlook</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/app')}
              className="p-2"
            >
              <Navigation className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Current Conditions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">75°F</h2>
                <p className="text-sm opacity-90">Feels like 73°F</p>
                <p className="text-sm opacity-75">San Francisco, CA</p>
              </div>
              <div className="text-center">
                <Sun className="w-12 h-12 mb-2" />
                <p className="text-sm">Sunny</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <Droplets className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">65%</p>
                <p className="opacity-75 text-xs">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">8 mph</p>
                <p className="opacity-75 text-xs">Wind</p>
              </div>
              <div className="text-center">
                <Eye className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">10 mi</p>
                <p className="opacity-75 text-xs">Visibility</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                <p className="opacity-90">4.2</p>
                <p className="opacity-75 text-xs">ET₀</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-1 bg-white/50 rounded-lg p-1">
            <Button
              variant={activeView === 'chart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('chart')}
              className="px-4"
            >
              Chart View
            </Button>
            <Button
              variant={activeView === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('table')}
              className="px-4"
            >
              Table View
            </Button>
          </div>
        </div>

        {/* 7-Day Forecast */}
        {activeView === 'chart' ? (
          <div className="space-y-3">
            {weatherData.map((day, index) => {
              const Icon = day.icon;
              return (
                <Card 
                  key={index}
                  className={`border-0 shadow-md bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300 ${
                    day.rainSkip ? 'border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => handleDayClick(day.date)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center min-w-[60px]">
                          <p className="font-semibold text-gray-900">{day.day}</p>
                          <p className="text-sm text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon className="w-8 h-8 text-blue-600" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">{day.high}°</span>
                              <span className="text-sm text-gray-500">{day.low}°</span>
                            </div>
                            <p className="text-sm text-gray-600 capitalize">{day.condition}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-gray-600">{day.precipitation}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wind className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{day.wind} mph</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-gray-600">{day.et0}</span>
                        </div>
                        {day.rainSkip && (
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                            Skip Watering
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Forecast Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Day</th>
                      <th className="text-center py-2">High/Low</th>
                      <th className="text-center py-2">Rain</th>
                      <th className="text-center py-2">Humidity</th>
                      <th className="text-center py-2">Wind</th>
                      <th className="text-center py-2">ET₀</th>
                      <th className="text-center py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.map((day, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleDayClick(day.date)}
                      >
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{day.day}</p>
                            <p className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="text-center py-3">
                          <span className="font-semibold text-gray-900">{day.high}°</span>
                          <span className="text-gray-500">/{day.low}°</span>
                        </td>
                        <td className="text-center py-3">{day.precipitation}%</td>
                        <td className="text-center py-3">{day.humidity}%</td>
                        <td className="text-center py-3">{day.wind} mph</td>
                        <td className="text-center py-3">{day.et0}</td>
                        <td className="text-center py-3">
                          {day.rainSkip ? (
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                              Skip
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                              Water
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weather Insights */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <CloudRain className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Rain Expected Tomorrow</h4>
                  <p className="text-sm text-blue-700">
                    We'll automatically skip watering for all plots due to 80% chance of rain.
                    This will save approximately 15 gallons of water.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Sun className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Optimal Watering Window</h4>
                  <p className="text-sm text-green-700">
                    Thursday shows perfect conditions - low wind, moderate humidity, and high ET₀.
                    Consider extending watering duration by 20% for maximum efficiency.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Wind className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-orange-900">Wind Advisory</h4>
                  <p className="text-sm text-orange-700">
                    Higher winds expected Tuesday and Sunday. Consider adjusting spray patterns
                    or watering earlier in the morning to reduce evaporation loss.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default WeatherForecastScreen;
