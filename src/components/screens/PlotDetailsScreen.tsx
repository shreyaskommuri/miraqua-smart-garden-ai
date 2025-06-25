
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Droplets, 
  Thermometer, 
  Sun, 
  Settings, 
  Calendar,
  Clock,
  MapPin,
  Edit,
  Camera,
  Share,
  MoreHorizontal
} from "lucide-react";

const PlotDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [scheduleView, setScheduleView] = useState<'original' | 'modified'>('modified');

  // Mock data - in real app this would come from API
  const plotData = {
    id: parseInt(id || '1'),
    name: "Tomato Garden",
    crop: "Tomatoes",
    location: "North Yard",
    plantedDate: "2024-03-15",
    area: "12 sq ft",
    soilType: "Loamy",
    flexType: "Daily",
    moisture: 65,
    temperature: 73,
    sunlight: 85,
    nextWater: "2h 15m",
    status: "optimal",
    photo: null,
    lastWatered: "2 hours ago",
    totalWater: "24.5L this week"
  };

  const weeklySchedule = [
    { day: 'Mon', date: '25', scheduled: true, time: '6:00 AM', volume: '2.5L', completed: true },
    { day: 'Tue', date: '26', scheduled: false, time: '', volume: '', completed: false },
    { day: 'Wed', date: '27', scheduled: true, time: '6:00 AM', volume: '2.5L', completed: false },
    { day: 'Thu', date: '28', scheduled: false, time: '', volume: '', completed: false },
    { day: 'Fri', date: '29', scheduled: true, time: '6:00 AM', volume: '2.5L', completed: false },
    { day: 'Sat', date: '30', scheduled: false, time: '', volume: '', completed: false },
    { day: 'Sun', date: '31', scheduled: true, time: '6:00 AM', volume: '2.5L', completed: false },
  ];

  const convertTemp = (temp: number, unit: 'F' | 'C') => {
    if (unit === 'C') {
      return Math.round((temp - 32) * 5/9);
    }
    return temp;
  };

  const handleDayClick = (day: any) => {
    if (day.scheduled) {
      navigate(`/plot/${id}/day/${day.date}`);
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
            <h1 className="text-lg font-semibold text-gray-900">{plotData.name}</h1>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Photo Banner */}
      <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {plotData.photo ? (
            <img src={plotData.photo} alt={plotData.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-white">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-70" />
              <p className="text-sm opacity-70">Add a photo</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">{plotData.name}</h2>
              <p className="text-sm opacity-90 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {plotData.location}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Share className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            {/* Status Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Current Status</h3>
                    <p className="text-sm opacity-90">Everything looks great!</p>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Optimal
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-90">Last watered</p>
                    <p className="font-medium">{plotData.lastWatered}</p>
                  </div>
                  <div>
                    <p className="opacity-90">Next watering</p>
                    <p className="font-medium">{plotData.nextWater}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Live Metrics</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTempUnit(tempUnit === 'F' ? 'C' : 'F')}
                    className="text-xs"
                  >
                    °{tempUnit}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Soil Moisture</span>
                        <span className="text-sm font-bold text-blue-600">{plotData.moisture}%</span>
                      </div>
                      <Progress value={plotData.moisture} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">Optimal range: 60-80%</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Thermometer className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Temperature</span>
                        <span className="text-sm font-bold text-orange-600">
                          {convertTemp(plotData.temperature, tempUnit)}°{tempUnit}
                        </span>
                      </div>
                      <Progress value={(plotData.temperature - 50) * 2} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">Ideal for tomatoes</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Sun className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Sunlight</span>
                        <span className="text-sm font-bold text-yellow-600">{plotData.sunlight}%</span>
                      </div>
                      <Progress value={plotData.sunlight} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">6-8 hours daily</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card className="border-0 shadow-lg bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg text-amber-900">What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Your tomatoes are in their flowering stage. With current conditions, expect to see small fruits 
                  forming in the next 2-3 weeks. The moisture levels are perfect, and the temperature is ideal 
                  for fruit set. Continue with the current watering schedule.
                </p>
              </CardContent>
            </Card>

            {/* Plot Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Plot Information</CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Crop Type</p>
                    <p className="font-medium">{plotData.crop}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted Date</p>
                    <p className="font-medium">{plotData.plantedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="font-medium">{plotData.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Soil Type</p>
                    <p className="font-medium">{plotData.soilType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Flex Type</p>
                    <p className="font-medium">{plotData.flexType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Water Used</p>
                    <p className="font-medium">{plotData.totalWater}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            {/* Schedule Controls */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Weekly Schedule</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={scheduleView === 'original' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setScheduleView('original')}
                    >
                      Original
                    </Button>
                    <Button
                      variant={scheduleView === 'modified' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setScheduleView('modified')}
                    >
                      Modified
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {weeklySchedule.map((day, index) => (
                <Card 
                  key={index}
                  className={`border-0 shadow-md cursor-pointer transition-all duration-200 ${
                    day.scheduled 
                      ? 'bg-blue-50 border-blue-200 hover:shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  } ${day.completed ? 'bg-green-50 border-green-200' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{day.date}</div>
                    
                    {day.scheduled && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-blue-600">{day.time}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Droplets className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-blue-600">{day.volume}</span>
                        </div>
                        {day.completed && (
                          <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2"></div>
                        )}
                      </div>
                    )}
                    
                    {!day.scheduled && (
                      <div className="text-xs text-gray-400">Rest</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Legend */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                    <span className="text-sm text-gray-600">Scheduled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
                    <span className="text-sm text-gray-600">Rest day</span>
                  </div>
                </div>
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

export default PlotDetailsScreen;
