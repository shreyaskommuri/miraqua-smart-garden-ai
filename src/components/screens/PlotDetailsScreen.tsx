
import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Droplets, 
  Thermometer, 
  Sun, 
  Calendar,
  Settings,
  MapPin,
  Copy,
  ExternalLink,
  Edit,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { MiniMap } from "@/components/ui/MiniMap";

const PlotDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("details");
  const [scheduleView, setScheduleView] = useState<'original' | 'ai'>('ai');

  // Get coordinates from URL params or defaults
  const latitude = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 37.7749;
  const longitude = searchParams.get('lon') ? parseFloat(searchParams.get('lon')!) : -122.4194;

  // Mock data - in real app this would come from API
  const plotData = {
    id: parseInt(id || '1'),
    name: "Tomato Garden",
    crop: "Tomatoes",
    variety: "Cherokee Purple",
    area: 25,
    areaUnit: "sq ft",
    plantingDate: "2024-03-15",
    location: "North Yard",
    latitude,
    longitude,
    status: "optimal",
    moisture: 68,
    temperature: 73,
    sunlight: 85,
    soilPh: 6.8,
    lastWatered: "Yesterday 6:00 AM",
    nextWatering: "Today 6:00 AM",
    totalWaterUsed: 45.2,
    daysActive: 45,
    healthScore: 92
  };

  const weeklySchedule = {
    original: [
      { day: 'Mon', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'completed' },
      { day: 'Tue', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'completed' },
      { day: 'Wed', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'scheduled' },
      { day: 'Thu', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'scheduled' },
      { day: 'Fri', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'scheduled' },
      { day: 'Sat', time: '6:00 AM', duration: 15, volume: '2.5L', status: 'scheduled' },
      { day: 'Sun', time: 'Skip', duration: 0, volume: '0L', status: 'skip' }
    ],
    ai: [
      { day: 'Mon', time: '5:45 AM', duration: 12, volume: '2.2L', status: 'completed', reason: 'Cooler morning' },
      { day: 'Tue', time: 'Skip', duration: 0, volume: '0L', status: 'skip', reason: 'Rain expected' },
      { day: 'Wed', time: '6:15 AM', duration: 18, volume: '3.1L', status: 'scheduled', reason: 'Higher temps' },
      { day: 'Thu', time: '5:30 AM', duration: 15, volume: '2.6L', status: 'scheduled', reason: 'Optimal window' },
      { day: 'Fri', time: '6:00 AM', duration: 14, volume: '2.4L', status: 'scheduled', reason: 'Standard' },
      { day: 'Sat', time: 'Skip', duration: 0, volume: '0L', status: 'skip', reason: 'Weekend rain' },
      { day: 'Sun', time: '7:00 AM', duration: 20, volume: '3.5L', status: 'scheduled', reason: 'Catch-up water' }
    ]
  };

  const metrics = [
    {
      label: 'Soil Moisture',
      value: plotData.moisture,
      unit: '%',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'up',
      change: '+5%',
      status: plotData.moisture > 60 ? 'good' : plotData.moisture > 40 ? 'warning' : 'danger'
    },
    {
      label: 'Temperature',
      value: plotData.temperature,
      unit: '°F',
      icon: Thermometer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: 'stable',
      change: '±1°F',
      status: 'good'
    },
    {
      label: 'Sunlight',
      value: plotData.sunlight,
      unit: '%',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      trend: 'up',
      change: '+8%',
      status: 'good'
    },
    {
      label: 'Soil pH',
      value: plotData.soilPh,
      unit: '',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: 'stable',
      change: '±0.1',
      status: 'good'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'skip': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
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

  const handleViewDay = (day: string) => {
    const dayNumber = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day) + 15; // Mock day number
    navigate(`/plot/${id}/day/${dayNumber}?lat=${latitude}&lon=${longitude}`);
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
              <h1 className="text-lg font-semibold text-gray-900">{plotData.name}</h1>
              <p className="text-sm text-gray-500">{plotData.crop}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/plot/${id}/settings`)}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Status Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Healthy & Thriving</span>
                </div>
                <p className="text-sm opacity-90">Health Score: {plotData.healthScore}%</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{plotData.daysActive}</div>
                <div className="text-sm opacity-90">days active</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="opacity-90">Next Watering</p>
                <p className="font-medium">{plotData.nextWatering}</p>
              </div>
              <div>
                <p className="opacity-90">Water Used</p>
                <p className="font-medium">{plotData.totalWaterUsed}L total</p>
              </div>
              <div>
                <p className="opacity-90">Last Watered</p>
                <p className="font-medium">{plotData.lastWatered}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Location & Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Coordinates</p>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                  <Button variant="ghost" size="sm" onClick={copyCoordinates} className="p-1">
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={openInMaps} className="p-1">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-medium">{plotData.area} {plotData.areaUnit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Variety</p>
                <p className="font-medium">{plotData.variety}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Planted</p>
                <p className="font-medium">{new Date(plotData.plantingDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <MiniMap 
              latitude={latitude}
              longitude={longitude}
              plotName={plotData.name}
              className="h-32"
            />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Current Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Activity;
                
                return (
                  <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          <TrendIcon className="w-4 h-4" />
                          <span className="text-xs font-medium">{metric.change}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
                      {metric.label === 'Soil Moisture' && (
                        <Progress 
                          value={metric.value} 
                          className="h-2" 
                        />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white">
                    <Droplets className="w-4 h-4 mr-2" />
                    Water Now
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Settings
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Calendar className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Activity className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 mt-6">
            {/* Schedule Toggle */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Schedule Type</h3>
                    <p className="text-sm text-gray-600">
                      {scheduleView === 'ai' ? 'AI-optimized for weather & efficiency' : 'Your original fixed schedule'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={scheduleView === 'original' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setScheduleView('original')}
                      className="text-xs px-3"
                    >
                      Original
                    </Button>
                    <Button
                      variant={scheduleView === 'ai' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setScheduleView('ai')}
                      className="text-xs px-3"
                    >
                      AI Optimized
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">This Week's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weeklySchedule[scheduleView].map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleViewDay(day.day)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-center">
                        <div className="font-semibold text-gray-900">{day.day}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(day.status)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {day.time} {day.duration > 0 && `(${day.duration}min)`}
                          </p>
                          {scheduleView === 'ai' && day.reason && (
                            <p className="text-xs text-gray-600">{day.reason}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{day.volume}</p>
                      <Badge variant="outline" className={`text-xs ${
                        day.status === 'completed' ? 'bg-green-100 text-green-700' :
                        day.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {day.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Schedule Stats */}
            {scheduleView === 'ai' && (
              <Card className="border-0 shadow-lg bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-900">AI Optimization Benefits</h4>
                      <p className="text-sm text-green-700">This week vs original schedule</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">18%</div>
                      <div className="text-xs text-green-600">water saved</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-700">2</div>
                      <div className="text-green-600">days skipped</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-700">3.2L</div>
                      <div className="text-green-600">water saved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-700">100%</div>
                      <div className="text-green-600">health maintained</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default PlotDetailsScreen;
