import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  Settings, 
  Droplets, 
  Clock, 
  Bell,
  Wifi,
  Battery,
  MapPin,
  Thermometer,
  Sun,
  Leaf,
  Save,
  Trash2,
  AlertTriangle,
  Camera,
  Edit3,
  Calendar,
  Target,
  Plus,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlotData {
  id: string;
  name: string;
  cropType: string;
  location: { lat: number; lng: number };
  plantedDate: string;
  autoWatering: boolean;
  smartScheduling: boolean;
  notifications: boolean;
  weatherIntegration: boolean;
  moistureThreshold: number;
  wateringDuration: number;
  sensors: {
    moisture: { status: 'online' | 'offline'; battery: number; signal: string };
    temperature: { status: 'online' | 'offline'; battery: number; signal: string };
  };
}

const PlotSettingsScreen = () => {
  const navigate = useNavigate();
  const { plotId } = useParams();
  const { toast } = useToast();
  
  const [plotData, setPlotData] = useState<PlotData>({
    id: plotId || '1',
    name: "Tomato Garden",
    cropType: "cherry-tomatoes",
    location: { lat: 37.7749, lng: -122.4194 },
    plantedDate: "2024-05-15",
    autoWatering: true,
    smartScheduling: true,
    notifications: true,
    weatherIntegration: true,
    moistureThreshold: 65,
    wateringDuration: 10,
    sensors: {
      moisture: { status: 'online', battery: 89, signal: 'Strong' },
      temperature: { status: 'online', battery: 76, signal: 'Good' }
    }
  });

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const cropTypes = [
    { value: "cherry-tomatoes", label: "Cherry Tomatoes" },
    { value: "bell-peppers", label: "Bell Peppers" },
    { value: "basil", label: "Basil" },
    { value: "oregano", label: "Oregano" },
    { value: "lettuce", label: "Lettuce" },
    { value: "carrots", label: "Carrots" },
    { value: "strawberries", label: "Strawberries" },
    { value: "cucumbers", label: "Cucumbers" },
    { value: "spinach", label: "Spinach" },
    { value: "kale", label: "Kale" }
  ];

  const handleBackNavigation = () => {
    navigate(`/app/plot/${plotId}`);
  };

  useEffect(() => {
    // Simulate loading plot data
    const loadPlotData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data would be loaded here
        console.log('Plot data loaded for plot:', plotId);
      } catch (error) {
        console.error('Failed to load plot data:', error);
        toast({
          title: "Error",
          description: "Failed to load plot settings",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadPlotData();
  }, [plotId, toast]);

  const handleFieldChange = (field: keyof PlotData, value: any) => {
    setPlotData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving plot settings:', plotData);
      
      toast({
        title: "✅ Settings saved",
        description: "Your plot settings have been updated successfully",
      });
      setHasChanges(false);
    } catch (err) {
      console.error('Save error:', err);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this plot? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "🗑️ Plot deleted",
        description: "Your plot has been removed successfully",
      });
      navigate('/app/home');
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete plot. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addSensor = () => {
    toast({
      title: "Add Sensor",
      description: "Sensor pairing mode activated. Follow device instructions.",
    });
  };

  const testWatering = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "💧 Test watering completed",
        description: "Manual watering cycle ran for 30 seconds",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start test watering",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDaysPlanted = () => {
    const planted = new Date(plotData.plantedDate);
    const now = new Date();
    return Math.floor((now.getTime() - planted.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loading && !plotData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plot settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-100 dark:border-gray-700 z-50 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackNavigation} className="rounded-xl p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Configure "{plotData.name}"</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <Badge variant="secondary" className="animate-pulse text-xs">
                  Unsaved changes
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                disabled={loading || !hasChanges}
                className="rounded-xl border-green-200 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with proper top padding */}
      <div className="pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs Navigation */}
            <div className="mb-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <TabsTrigger 
                  value="general" 
                  className="rounded-xl font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="watering" 
                  className="rounded-xl font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                >
                  Watering
                </TabsTrigger>
                <TabsTrigger 
                  value="sensors" 
                  className="rounded-xl font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                >
                  Sensors
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="rounded-xl font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-xl">
                      <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="plotName">Plot Name</Label>
                    <Input
                      id="plotName"
                      value={plotData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="rounded-xl border-gray-200 dark:border-gray-600 focus:border-green-300 dark:focus:border-green-500"
                      placeholder="Enter plot name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={plotData.cropType} onValueChange={(value) => handleFieldChange('cropType', value)}>
                      <SelectTrigger className="rounded-xl border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop.value} value={crop.value}>
                            {crop.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-900 dark:text-blue-100">Location</span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {plotData.location.lat.toFixed(4)}, {plotData.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-green-900 dark:text-green-100">Planted</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm">{getDaysPlanted()} days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="watering" className="space-y-6">
              {/* Watering Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                        <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Watering Configuration</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testWatering}
                      disabled={loading}
                      className="rounded-xl"
                    >
                      <Droplets className="w-4 h-4 mr-2" />
                      Test Water
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">Auto Watering</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Enable automatic irrigation</p>
                      </div>
                    </div>
                    <Switch
                      checked={plotData.autoWatering}
                      onCheckedChange={(value) => handleFieldChange('autoWatering', value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Moisture Threshold ({plotData.moistureThreshold}%)</Label>
                    <div className="px-4">
                      <Slider
                        value={[plotData.moistureThreshold]}
                        onValueChange={(value) => handleFieldChange('moistureThreshold', value[0])}
                        max={100}
                        min={20}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>20% (Dry)</span>
                        <span>100% (Saturated)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Watering Duration ({plotData.wateringDuration} minutes)</Label>
                    <div className="px-4">
                      <Slider
                        value={[plotData.wateringDuration]}
                        onValueChange={(value) => handleFieldChange('wateringDuration', value[0])}
                        max={30}
                        min={2}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>2 min</span>
                        <span>30 min</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-6">
              {/* Sensor Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-xl">
                      <Wifi className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span>Sensor Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-green-200 dark:border-green-700 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Droplets className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-medium text-green-900 dark:text-green-100">Moisture Sensor</span>
                        </div>
                        <Badge className={`${plotData.sensors.moisture.status === 'online' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                          {plotData.sensors.moisture.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-green-700 dark:text-green-300">Battery</p>
                          <div className="flex items-center space-x-2">
                            <Battery className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-900 dark:text-green-100">
                              {plotData.sensors.moisture.battery}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-green-700 dark:text-green-300">Signal</p>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {plotData.sensors.moisture.signal}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-orange-200 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          <span className="font-medium text-orange-900 dark:text-orange-100">Temperature Sensor</span>
                        </div>
                        <Badge className={`${plotData.sensors.temperature.status === 'online' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                          {plotData.sensors.temperature.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-orange-700 dark:text-orange-300">Battery</p>
                          <div className="flex items-center space-x-2">
                            <Battery className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <span className="font-semibold text-orange-900 dark:text-orange-100">
                              {plotData.sensors.temperature.battery}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-orange-700 dark:text-orange-300">Signal</p>
                          <p className="font-semibold text-orange-900 dark:text-orange-100">
                            {plotData.sensors.temperature.signal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border-2 border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                    onClick={addSensor}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Sensor
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {/* Advanced Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-xl">
                      <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>Advanced Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                          <p className="font-medium text-purple-900 dark:text-purple-100">Smart Scheduling</p>
                          <p className="text-sm text-purple-700 dark:text-purple-300">AI-powered watering optimization</p>
                        </div>
                      </div>
                      <Switch
                        checked={plotData.smartScheduling}
                        onCheckedChange={(value) => handleFieldChange('smartScheduling', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <p className="font-medium text-yellow-900 dark:text-yellow-100">Weather Integration</p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">Skip watering when rain is expected</p>
                        </div>
                      </div>
                      <Switch
                        checked={plotData.weatherIntegration}
                        onCheckedChange={(value) => handleFieldChange('weatherIntegration', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">Push Notifications</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">Get alerts for important events</p>
                        </div>
                      </div>
                      <Switch
                        checked={plotData.notifications}
                        onCheckedChange={(value) => handleFieldChange('notifications', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900 dark:to-rose-900 border-red-100 dark:border-red-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-red-800 dark:text-red-200">
                    <div className="p-2 bg-red-100 dark:bg-red-800 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span>Danger Zone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-red-200 dark:border-red-700">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Delete Plot</h4>
                    <p className="text-red-700 dark:text-red-300 text-sm mb-4">
                      This will permanently delete this plot and all associated data. This action cannot be undone.
                    </p>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Plot
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PlotSettingsScreen;
