
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Leaf, 
  Calendar,
  Ruler,
  Settings,
  Check,
  Plus,
  Navigation,
  Map
} from "lucide-react";

interface AdvancedSettings {
  wateringDepth: string;
  fertilizer: boolean;
  mulch: boolean;
  drainageType: string;
}

interface FormData {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  cropType: string;
  plantingDate: string;
  area: string;
  soilType: string;
  flexType: string;
  advancedSettings: AdvancedSettings;
}

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [locationMethod, setLocationMethod] = useState<'coordinates' | 'current'>('coordinates');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    cropType: "",
    plantingDate: "",
    area: "",
    soilType: "",
    flexType: "",
    advancedSettings: {
      wateringDepth: "6",
      fertilizer: false,
      mulch: false,
      drainageType: "good"
    }
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const cropTypes = [
    { id: "tomatoes", name: "Tomatoes", icon: "🍅", difficulty: "Easy", season: "Spring/Summer" },
    { id: "herbs", name: "Herbs", icon: "🌿", difficulty: "Easy", season: "Year-round" },
    { id: "lettuce", name: "Lettuce", icon: "🥬", difficulty: "Easy", season: "Cool weather" },
    { id: "peppers", name: "Peppers", icon: "🌶️", difficulty: "Medium", season: "Summer" },
    { id: "carrots", name: "Carrots", icon: "🥕", difficulty: "Medium", season: "Cool weather" },
    { id: "cucumbers", name: "Cucumbers", icon: "🥒", difficulty: "Medium", season: "Summer" },
  ];

  const soilTypes = [
    { id: "clay", name: "Clay", description: "Heavy, retains water well" },
    { id: "sandy", name: "Sandy", description: "Light, drains quickly" },
    { id: "loamy", name: "Loamy", description: "Balanced, ideal for most plants" },
    { id: "silty", name: "Silty", description: "Smooth, holds nutrients well" },
  ];

  const flexTypes = [
    { id: "daily", name: "Daily Flexibility", description: "Adjust watering times within the same day", timeRange: "±2 hours" },
    { id: "weekly", name: "Weekly Flexibility", description: "Move watering days within the week", timeRange: "±2 days" },
  ];

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'advancedSettings') {
        setFormData(prev => ({
          ...prev,
          advancedSettings: {
            ...prev.advancedSettings,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        updateFormData("latitude", lat);
        updateFormData("longitude", lon);
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to get your location. Please enter coordinates manually.");
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const validateCoordinates = () => {
    const lat = parseFloat(formData.latitude);
    const lon = parseFloat(formData.longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      return false;
    }
    
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Store coordinates in session storage for persistence
    const plotData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };
    
    sessionStorage.setItem('new_plot_data', JSON.stringify(plotData));
    console.log('Submitting plot data:', plotData);
    navigate('/app');
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.name.trim() !== "";
      case 2: return validateCoordinates();
      case 3: return formData.cropType !== "" && formData.plantingDate !== "";
      case 4: return formData.area !== "" && formData.soilType !== "";
      case 5: return formData.flexType !== "";
      default: return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Name Your Plot</h2>
              <p className="text-gray-600">Give your new garden plot a memorable name</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plot Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Tomato Garden, Herb Corner"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your plot..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Location</h2>
              <p className="text-gray-600">We need precise coordinates for accurate weather data</p>
            </div>

            <Tabs value={locationMethod} onValueChange={(value) => setLocationMethod(value as 'coordinates' | 'current')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="coordinates" className="flex items-center space-x-2">
                  <Map className="w-4 h-4" />
                  <span>Coordinates</span>
                </TabsTrigger>
                <TabsTrigger value="current" className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4" />
                  <span>Current Location</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="coordinates" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude *</Label>
                    <Input
                      id="latitude"
                      type="number"
                      placeholder="37.7749"
                      value={formData.latitude}
                      onChange={(e) => updateFormData("latitude", e.target.value)}
                      className="h-12 text-lg"
                      min={-90}
                      max={90}
                      step={0.000001}
                    />
                    <p className="text-xs text-gray-500">Range: -90 to 90</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude *</Label>
                    <Input
                      id="longitude"
                      type="number"
                      placeholder="-122.4194"
                      value={formData.longitude}
                      onChange={(e) => updateFormData("longitude", e.target.value)}
                      className="h-12 text-lg"
                      min={-180}
                      max={180}
                      step={0.000001}
                    />
                    <p className="text-xs text-gray-500">Range: -180 to 180</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="current" className="space-y-4 mt-4">
                <div className="text-center">
                  <Button
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoadingLocation ? (
                      "Getting your location..."
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Current Location
                      </>
                    )}
                  </Button>
                  
                  {locationError && (
                    <p className="text-sm text-red-600 mt-2">{locationError}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {validateCoordinates() && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Valid Coordinates</h4>
                      <p className="text-sm text-blue-700">
                        Lat: {parseFloat(formData.latitude).toFixed(4)}, Lon: {parseFloat(formData.longitude).toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Crop Details</h2>
              <p className="text-gray-600">What are you growing and when did you plant it?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Crop Type *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {cropTypes.map((crop) => (
                    <Card
                      key={crop.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.cropType === crop.id
                          ? "border-green-500 bg-green-50 shadow-lg"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                      onClick={() => updateFormData("cropType", crop.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{crop.icon}</div>
                        <h3 className="font-semibold text-gray-900 text-sm">{crop.name}</h3>
                        <Badge className="text-xs mt-1" variant="outline">
                          {crop.difficulty}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plantingDate">Planting Date *</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => updateFormData("plantingDate", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Plot Details</h2>
              <p className="text-gray-600">Tell us about your growing space</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="area">Plot Area (sq ft) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 12"
                  value={formData.area}
                  onChange={(e) => updateFormData("area", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-4">
                <Label>Soil Type *</Label>
                <div className="space-y-3">
                  {soilTypes.map((soil) => (
                    <Card
                      key={soil.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.soilType === soil.id
                          ? "border-purple-500 bg-purple-50 shadow-lg"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                      onClick={() => updateFormData("soilType", soil.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{soil.name}</h3>
                            <p className="text-sm text-gray-600">{soil.description}</p>
                          </div>
                          {formData.soilType === soil.id && (
                            <Check className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Schedule Flexibility</h2>
              <p className="text-gray-600">How flexible can your watering schedule be?</p>
            </div>

            <div className="space-y-4">
              {flexTypes.map((flex) => (
                <Card
                  key={flex.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.flexType === flex.id
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:shadow-md"
                  }`}
                  onClick={() => updateFormData("flexType", flex.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{flex.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {flex.timeRange}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{flex.description}</p>
                      </div>
                      {formData.flexType === flex.id && (
                        <Check className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Location Summary */}
            {validateCoordinates() && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Plot Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700 font-medium">Location</p>
                      <p className="text-green-600">
                        {parseFloat(formData.latitude).toFixed(4)}, {parseFloat(formData.longitude).toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Area</p>
                      <p className="text-green-600">{formData.area} sq ft</p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Crop</p>
                      <p className="text-green-600">{cropTypes.find(c => c.id === formData.cropType)?.name}</p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Soil</p>
                      <p className="text-green-600">{soilTypes.find(s => s.id === formData.soilType)?.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
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
              onClick={() => step === 1 ? navigate(-1) : handlePrevious()}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Add New Plot</h1>
              <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 h-12"
            >
              Previous
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <Check className="w-4 h-4 mr-2" />
              Create Plot
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPlotScreen;
