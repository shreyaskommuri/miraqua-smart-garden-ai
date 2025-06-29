
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Droplets, Thermometer, Sun, MapPin, Calendar, Loader2 } from "lucide-react";

const PlotDetailsScreen = () => {
  const navigate = useNavigate();
  const { plotId } = useParams();
  const [searchParams] = useSearchParams();
  const [plotData, setPlotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const latitude = searchParams.get('lat') || 37.7749;
  const longitude = searchParams.get('lon') || -122.4194;

  useEffect(() => {
    fetchPlotDetails();
  }, [plotId]);

  const fetchPlotDetails = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlotData({
        id: plotId,
        name: "Pepper Patch",
        crop: "Bell Peppers",
        area: "25 m²",
        plantingDate: "2024-03-15",
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        moisture: 42,
        temperature: 75,
        sunlight: "Good",
        soilType: "Loam",
        nextWatering: "Now",
        status: "attention",
        weeklySchedule: [
          { day: "Mon", liters: 5.2, weather: "sunny" },
          { day: "Tue", liters: 4.8, weather: "cloudy" },
          { day: "Wed", liters: 6.1, weather: "sunny" },
          { day: "Thu", liters: 0, weather: "rainy" },
          { day: "Fri", liters: 5.5, weather: "sunny" },
          { day: "Sat", liters: 4.9, weather: "partly-cloudy" },
          { day: "Sun", liters: 5.8, weather: "sunny" }
        ]
      });
    } catch (err) {
      setError("Failed to load plot details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    fetchPlotDetails();
  };

  const handleEditSettings = () => {
    navigate(`/plot/${plotId}/settings`);
  };

  const handleDayClick = (day) => {
    navigate(`/plot/${plotId}/day/${day.day.toLowerCase()}`);
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
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
            <Button onClick={handleRetry} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!plotData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">Plot not found</p>
            <Button onClick={() => navigate("/app")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{plotData.name}</h1>
                <p className="text-xs text-gray-600">{plotData.crop}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditSettings}
            >
              <Settings className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="pt-20 pb-24 px-4">
          {/* Status Banner */}
          <Card className={`border-0 shadow-md mb-6 ${
            plotData.status === 'attention' ? 'bg-red-50 border-red-200' :
            plotData.status === 'optimal' ? 'bg-green-50 border-green-200' :
            'bg-yellow-50 border-yellow-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={
                    plotData.status === 'attention' ? 'bg-red-100 text-red-700' :
                    plotData.status === 'optimal' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }>
                    {plotData.status === 'attention' ? 'Needs Attention' :
                     plotData.status === 'optimal' ? 'Optimal' : 'Good'}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    Next watering: {plotData.nextWatering}
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Water Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sticky Tabs */}
          <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 -mx-4 px-4 py-2 mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6 space-y-4">
                {/* Current Conditions */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-4 text-center">
                      <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-900">{plotData.moisture}%</div>
                      <div className="text-xs text-blue-700">Moisture</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-4 text-center">
                      <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-orange-900">{plotData.temperature}°F</div>
                      <div className="text-xs text-orange-700">Temperature</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-4 text-center">
                      <Sun className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-900">{plotData.sunlight}</div>
                      <div className="text-xs text-green-700">Sunlight</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Plot Information */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Plot Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{plotData.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Planted:</span>
                      <span className="font-medium">{plotData.plantingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Type:</span>
                      <span className="font-medium">{plotData.soilType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location:</span>
                      <button className="font-medium text-blue-600 hover:underline flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {plotData.latitude.toFixed(4)}, {plotData.longitude.toFixed(4)}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6 space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">7-Day Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {plotData.weeklySchedule.map((day, index) => (
                        <div
                          key={index}
                          onClick={() => handleDayClick(day)}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium w-8">{day.day}</div>
                            <div className="text-xs text-gray-500">
                              {day.weather === 'sunny' ? '☀️' :
                               day.weather === 'cloudy' ? '☁️' :
                               day.weather === 'rainy' ? '🌧️' :
                               day.weather === 'partly-cloudy' ? '⛅' : ''}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-blue-600">
                              {day.liters > 0 ? `${day.liters}L` : 'Skip'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {day.weather === 'rainy' ? 'Rain expected' : 'Scheduled'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="mt-6 space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Water Schedule Optimization</h4>
                      <p className="text-sm text-blue-800">
                        Your peppers are showing signs of water stress. Consider increasing 
                        watering frequency by 20% during the next week's hot spell.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Growth Stage</h4>
                      <p className="text-sm text-green-800">
                        Your bell peppers are in flowering stage. This is a critical time 
                        for consistent moisture levels.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-900 mb-2">Weather Alert</h4>
                      <p className="text-sm text-amber-800">
                        Rain expected Thursday. Automatic watering will be skipped 
                        to prevent overwatering.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlotDetailsScreen;
