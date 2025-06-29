
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Edit, 
  MessageCircle, 
  Droplets, 
  Thermometer, 
  Sun, 
  MapPin,
  Calendar,
  Copy,
  Play,
  Loader2,
  AlertTriangle
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
  
  const [plotDetails, setPlotDetails] = useState<PlotDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [watering, setWatering] = useState(false);

  const latitude = parseFloat(searchParams.get('lat') || '37.7749');
  const longitude = parseFloat(searchParams.get('lon') || '-122.4194');

  const fetchPlotDetails = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlotDetails({
        id: parseInt(plotId || '1'),
        name: "Tomato Garden",
        crop: "Tomatoes",
        current_temp_f: 72,
        current_moisture: 85,
        current_sunlight: "Good",
        crop_age: "3 weeks",
        latitude,
        longitude,
        schedule: [
          { day: "Mon", volume: 15, status: "optimal" },
          { day: "Tue", volume: 12, status: "optimal" },
          { day: "Wed", volume: 18, status: "high" },
          { day: "Thu", volume: 10, status: "low" },
          { day: "Fri", volume: 16, status: "optimal" },
          { day: "Sat", volume: 14, status: "optimal" },
          { day: "Sun", volume: 13, status: "optimal" }
        ]
      });
    } catch (err) {
      setError("Unable to load plot details");
    } finally {
      setLoading(false);
    }
  };

  const handleWaterNow = async () => {
    setWatering(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Watering started",
        description: "Your plot is being watered now.",
      });
      
      // Refresh data
      fetchPlotDetails();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start watering. Please try again.",
        variant: "destructive"
      });
    } finally {
      setWatering(false);
    }
  };

  const copyLocation = () => {
    const locationText = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    navigator.clipboard.writeText(locationText);
    toast({
      title: "Location copied",
      description: "Coordinates copied to clipboard",
    });
  };

  const handleDayClick = (day: string) => {
    navigate(`/plot/${plotId}/day/${day.toLowerCase()}?lat=${latitude}&lon=${longitude}`);
  };

  useEffect(() => {
    fetchPlotDetails();
  }, [plotId]);

  const getVolumeColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'low': return 'bg-yellow-500';
      case 'high': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
          <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
              <Button variant="outline" onClick={fetchPlotDetails}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!plotDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No details available</h2>
              <p className="text-gray-600 mb-6">Create a watering plan to see plot details here.</p>
              <Button onClick={fetchPlotDetails} className="bg-green-600 hover:bg-green-700">
                Generate Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{plotDetails.name}</h1>
                <p className="text-sm text-gray-600">{plotDetails.crop}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/plot/${plotId}/settings`)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/chat?plotId=${plotId}&lat=${latitude}&lon=${longitude}`)}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-160px)]">
        <div className="px-4 py-4 space-y-6 pb-32">
          {/* Location Info */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyLocation}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm -mx-4 px-4 py-2 border-b">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="mt-6 space-y-4">
              {/* Current Conditions */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Current Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-orange-900">{plotDetails.current_temp_f}°F</div>
                      <div className="text-sm text-orange-700">Temperature</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-900">{plotDetails.current_moisture}%</div>
                      <div className="text-sm text-blue-700">Moisture</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Sun className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-900">{plotDetails.current_sunlight}</div>
                      <div className="text-sm text-green-700">Sunlight</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-900">{plotDetails.crop_age}</div>
                      <div className="text-sm text-purple-700">Crop Age</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Preview */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6 space-y-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>7-Day Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plotDetails.schedule.map((day) => (
                      <div
                        key={day.day}
                        onClick={() => handleDayClick(day.day)}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium w-8">{day.day}</div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getVolumeColor(day.status)}`}
                              style={{ width: `${(day.volume / 20) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-600">{day.volume}L</div>
                          <Badge 
                            className={`text-xs ${
                              day.status === 'optimal' ? 'bg-green-100 text-green-700' :
                              day.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {day.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Sticky Water Now Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleWaterNow}
          disabled={watering}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {watering ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Watering...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Water Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlotDetailsScreen;
