
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
  Target
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PlotSettingsScreen = () => {
  const navigate = useNavigate();
  const { plotId } = useParams();
  const { toast } = useToast();
  
  const [plotName, setPlotName] = useState("Tomato Garden");
  const [cropType, setCropType] = useState("cherry-tomatoes");
  const [autoWatering, setAutoWatering] = useState(true);
  const [smartScheduling, setSmartScheduling] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [weatherIntegration, setWeatherIntegration] = useState(true);
  const [moistureThreshold, setMoistureThreshold] = useState([65]);
  const [wateringDuration, setWateringDuration] = useState([10]);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "✅ Settings saved",
        description: "Your plot settings have been updated successfully",
      });
    } catch (err) {
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
      navigate('/home');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 pt-16 lg:pt-0 lg:pl-72">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-16 lg:top-0 z-30 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-xl p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Plot Settings
                </h1>
                <p className="text-gray-600 mt-1">Configure your garden preferences</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl border-green-200 text-green-700 hover:bg-green-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="px-6 py-8 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-32 z-20 bg-white/95 backdrop-blur-lg -mx-6 px-6 py-4 border-b border-gray-100">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-2xl p-1">
                <TabsTrigger 
                  value="general" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="watering" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Watering
                </TabsTrigger>
                <TabsTrigger 
                  value="sensors" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Sensors
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="mt-8 space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="plotName">Plot Name</Label>
                    <Input
                      id="plotName"
                      value={plotName}
                      onChange={(e) => setPlotName(e.target.value)}
                      className="rounded-xl border-gray-200 focus:border-green-300"
                      placeholder="Enter plot name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger className="rounded-xl border-gray-200">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cherry-tomatoes">Cherry Tomatoes</SelectItem>
                        <SelectItem value="bell-peppers">Bell Peppers</SelectItem>
                        <SelectItem value="basil">Basil</SelectItem>
                        <SelectItem value="oregano">Oregano</SelectItem>
                        <SelectItem value="lettuce">Lettuce</SelectItem>
                        <SelectItem value="carrots">Carrots</SelectItem>
                        <SelectItem value="strawberries">Strawberries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Location</span>
                      </div>
                      <p className="text-blue-700 text-sm">37.7749, -122.4194</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Planted</span>
                      </div>
                      <p className="text-green-700 text-sm">45 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="watering" className="mt-8 space-y-6">
              {/* Watering Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>Watering Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Auto Watering</p>
                        <p className="text-sm text-blue-700">Enable automatic irrigation</p>
                      </div>
                    </div>
                    <Switch
                      checked={autoWatering}
                      onCheckedChange={setAutoWatering}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Moisture Threshold ({moistureThreshold[0]}%)</Label>
                    <div className="px-4">
                      <Slider
                        value={moistureThreshold}
                        onValueChange={setMoistureThreshold}
                        max={100}
                        min={20}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>20%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Watering Duration ({wateringDuration[0]} minutes)</Label>
                    <div className="px-4">
                      <Slider
                        value={wateringDuration}
                        onValueChange={setWateringDuration}
                        max={30}
                        min={2}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>2 min</span>
                        <span>30 min</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="mt-8 space-y-6">
              {/* Sensor Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                      <Wifi className="w-5 h-5 text-orange-600" />
                    </div>
                    <span>Sensor Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Droplets className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Moisture Sensor</span>
                        </div>
                        <Badge className="bg-green-500 text-white">Online</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-green-700">Battery</p>
                          <p className="font-semibold text-green-900">89%</p>
                        </div>
                        <div>
                          <p className="text-green-700">Signal</p>
                          <p className="font-semibold text-green-900">Strong</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-900">Temperature Sensor</span>
                        </div>
                        <Badge className="bg-orange-500 text-white">Online</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-orange-700">Battery</p>
                          <p className="font-semibold text-orange-900">76%</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Signal</p>
                          <p className="font-semibold text-orange-900">Good</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Wifi className="w-4 h-4 mr-2" />
                    Add New Sensor
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-8 space-y-6">
              {/* Advanced Settings */}
              <Card className="border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <span>Advanced Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-purple-900">Smart Scheduling</p>
                          <p className="text-sm text-purple-700">AI-powered watering optimization</p>
                        </div>
                      </div>
                      <Switch
                        checked={smartScheduling}
                        onCheckedChange={setSmartScheduling}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Sun className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-900">Weather Integration</p>
                          <p className="text-sm text-yellow-700">Skip watering when rain is expected</p>
                        </div>
                      </div>
                      <Switch
                        checked={weatherIntegration}
                        onCheckedChange={setWeatherIntegration}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Push Notifications</p>
                          <p className="text-sm text-blue-700">Get alerts for important events</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-red-100">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-red-800">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <span>Danger Zone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white/50 rounded-2xl border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Delete Plot</h4>
                    <p className="text-red-700 text-sm mb-4">
                      This will permanently delete this plot and all associated data. This action cannot be undone.
                    </p>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 rounded-xl"
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
      </ScrollArea>
    </div>
  );
};

export default PlotSettingsScreen;
