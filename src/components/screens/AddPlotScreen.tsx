import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Leaf, MapPin, Settings, Droplets, Thermometer } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    basic: null,
    location: null,
    advanced: null
  });

  const steps = [
    { id: 1, title: "Basic Info", component: "crop" },
    { id: 2, title: "Location", component: "location" },
    { id: 3, title: "Advanced", component: "advanced" },
    { id: 4, title: "Review", component: "review" }
  ];

  // Load saved data on mount
  useEffect(() => {
    const savedBasic = localStorage.getItem('addplot_basic');
    const savedLocation = localStorage.getItem('addplot_location');
    const savedAdvanced = localStorage.getItem('addplot_advanced');
    
    setWizardData({
      basic: savedBasic ? JSON.parse(savedBasic) : null,
      location: savedLocation ? JSON.parse(savedLocation) : null,
      advanced: savedAdvanced ? JSON.parse(savedAdvanced) : null
    });
  }, []);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleComplete = async () => {
    try {
      // Save plot data - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear wizard data
      localStorage.removeItem('addplot_basic');
      localStorage.removeItem('addplot_location');
      localStorage.removeItem('addplot_advanced');
      
      navigate("/app");
    } catch (error) {
      console.error("Failed to save plot:", error);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return wizardData.basic?.plotName && wizardData.basic?.selectedCrop;
      case 2:
        return wizardData.location?.latitude && wizardData.location?.longitude;
      case 3:
        return true; // Advanced settings are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CropStepContent 
          data={wizardData.basic}
          onDataChange={(data) => {
            setWizardData(prev => ({ ...prev, basic: data }));
            localStorage.setItem('addplot_basic', JSON.stringify(data));
          }} 
        />;
      case 2:
        return <LocationStepContent 
          data={wizardData.location}
          onDataChange={(data) => {
            setWizardData(prev => ({ ...prev, location: data }));
            localStorage.setItem('addplot_location', JSON.stringify(data));
          }} 
        />;
      case 3:
        return <AdvancedStepContent 
          data={wizardData.advanced}
          onDataChange={(data) => {
            setWizardData(prev => ({ ...prev, advanced: data }));
            localStorage.setItem('addplot_advanced', JSON.stringify(data));
          }} 
        />;
      case 4:
        return <ReviewStepContent data={wizardData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Fixed Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Add New Plot</h1>
              <p className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-32">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id 
                    ? 'bg-green-500 text-white'
                    : currentStep === step.id 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs text-gray-600 mt-1">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-96">
            {renderStepContent()}
          </div>
        </div>
      </ScrollArea>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 space-y-3">
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
        >
          {currentStep === 4 ? 'Complete Setup' : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        {currentStep > 1 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full h-10"
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

// Step Components
const CropStepContent = ({ data, onDataChange }) => {
  const [plotName, setPlotName] = useState(data?.plotName || "");
  const [selectedCrop, setSelectedCrop] = useState(data?.selectedCrop || "");
  const [plotNameError, setPlotNameError] = useState("");
  const [cropError, setCropError] = useState("");

  const cropTypes = [
    { id: "tomatoes", name: "Tomatoes", icon: "🍅", difficulty: "Easy", season: "Spring/Summer" },
    { id: "herbs", name: "Herbs", icon: "🌿", difficulty: "Easy", season: "Year-round" },
    { id: "lettuce", name: "Lettuce", icon: "🥬", difficulty: "Easy", season: "Cool weather" },
    { id: "peppers", name: "Peppers", icon: "🌶️", difficulty: "Medium", season: "Summer" },
    { id: "carrots", name: "Carrots", icon: "🥕", difficulty: "Medium", season: "Cool weather" },
    { id: "cucumbers", name: "Cucumbers", icon: "🥒", difficulty: "Medium", season: "Summer" },
    { id: "beans", name: "Beans", icon: "🫘", difficulty: "Easy", season: "Spring/Summer" },
    { id: "spinach", name: "Spinach", icon: "🥬", difficulty: "Easy", season: "Cool weather" },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    if (plotName && selectedCrop) {
      onDataChange({ plotName, selectedCrop });
    }
  }, [plotName, selectedCrop, onDataChange]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's set up your garden plot</h2>
        <p className="text-gray-600">Give your plot a name and choose what you'd like to grow</p>
      </div>

      {/* Plot Name Input */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            Plot Name
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 ml-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose a memorable name for your garden plot</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="plotName">What would you like to call this plot?</Label>
            <Input
              id="plotName"
              placeholder="e.g., Tomato Garden, Herb Corner"
              value={plotName}
              onChange={(e) => {
                setPlotName(e.target.value);
                if (plotNameError) setPlotNameError("");
              }}
              className={`h-12 ${plotNameError ? 'border-red-500' : ''}`}
            />
            {plotNameError && (
              <p className="text-sm text-red-600">{plotNameError}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Crop Selection */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Crop Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>What would you like to grow?</Label>
            
            {/* Crop Grid */}
            <div className="grid grid-cols-2 gap-3">
              {cropTypes.map((crop) => (
                <Card
                  key={crop.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCrop === crop.id
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-200 hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedCrop(crop.id);
                    if (cropError) setCropError("");
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{crop.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{crop.name}</h3>
                    <div className="space-y-1">
                      <Badge className={`text-xs ${getDifficultyColor(crop.difficulty)}`}>
                        {crop.difficulty}
                      </Badge>
                      <p className="text-xs text-gray-500">{crop.season}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {cropError && (
              <p className="text-sm text-red-600">{cropError}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Crop Info */}
      {selectedCrop && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {cropTypes.find(c => c.id === selectedCrop)?.icon}
              </div>
              <div>
                <h4 className="font-semibold text-green-900">
                  Great choice! {cropTypes.find(c => c.id === selectedCrop)?.name}
                </h4>
                <p className="text-sm text-green-700">
                  We'll create a personalized watering schedule for your {selectedCrop}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const LocationStepContent = ({ data, onDataChange }) => {
  const [location, setLocation] = useState(data || { latitude: null, longitude: null });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapError, setMapError] = useState("");

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setMapError("");
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });
      
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      
      setLocation(newLocation);
      onDataChange(newLocation);
    } catch (error) {
      setMapError("Unable to get your location. Please enter coordinates manually.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLatitudeChange = (value) => {
    const newLocation = { ...location, latitude: parseFloat(value) || null };
    setLocation(newLocation);
    onDataChange(newLocation);
  };

  const handleLongitudeChange = (value) => {
    const newLocation = { ...location, longitude: parseFloat(value) || null };
    setLocation(newLocation);
    onDataChange(newLocation);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Where's Your Garden?</h2>
        <p className="text-gray-600">We need your location to provide accurate weather data and watering schedules</p>
      </div>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map will load here</p>
                {location.latitude && location.longitude && (
                  <div className="mt-2 p-2 bg-white rounded-lg shadow-sm">
                    <p className="text-sm font-medium">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Location Button */}
      <Button
        onClick={handleUseCurrentLocation}
        disabled={isLoadingLocation}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoadingLocation ? "Getting Location..." : "Use My Current Location"}
      </Button>

      {/* Manual Input */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Or Enter Coordinates Manually</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="0.0001"
                min="-90"
                max="90"
                placeholder="37.7749"
                onChange={(e) => handleLatitudeChange(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="0.0001"
                min="-180"
                max="180"
                placeholder="-122.4194"
                onChange={(e) => handleLongitudeChange(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
          
          {mapError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{mapError}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const AdvancedStepContent = ({ data, onDataChange }) => {
  const [rootDepth, setRootDepth] = useState(data?.rootDepth || [12]);
  const [soilPH, setSoilPH] = useState(data?.soilPH || [6.5]);
  const [soilType, setSoilType] = useState(data?.soilType || "");

  const soilTypes = [
    { id: "clay", name: "Clay", drainage: "Poor", retention: "High" },
    { id: "sandy", name: "Sandy", drainage: "Excellent", retention: "Low" },
    { id: "loam", name: "Loam", drainage: "Good", retention: "Medium" },
    { id: "silt", name: "Silt", drainage: "Fair", retention: "High" }
  ];

  const getDrainageColor = (drainage) => {
    switch (drainage) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Fair": return "bg-yellow-100 text-yellow-700";
      case "Poor": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    onDataChange({ rootDepth, soilPH, soilType });
  }, [rootDepth, soilPH, soilType, onDataChange]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Fine-tune Your Garden</h2>
        <p className="text-gray-600">Optional settings for even better results</p>
      </div>

      {/* Root Depth */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span>Root Depth</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-gray-700">Planting depth (inches)</Label>
              <Badge variant="outline">{rootDepth[0]}"</Badge>
            </div>
            <Slider
              value={rootDepth}
              onValueChange={setRootDepth}
              max={24}
              min={4}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Shallow (4")</span>
              <span>Deep (24")</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil pH */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-orange-600" />
            <span>Soil pH</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-gray-700">pH Level</Label>
              <Badge variant="outline">{soilPH[0]}</Badge>
            </div>
            <Slider
              value={soilPH}
              onValueChange={setSoilPH}
              max={8}
              min={5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Acidic (5.0)</span>
              <span>Neutral (7.0)</span>
              <span>Alkaline (8.0)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Type */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Soil Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {soilTypes.map((soil) => (
              <Card
                key={soil.id}
                className={`cursor-pointer transition-all duration-200 ${
                  soilType === soil.id
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-200 hover:shadow-md"
                }`}
                onClick={() => setSoilType(soil.id)}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{soil.name}</h3>
                  <div className="space-y-1">
                    <Badge className={`text-xs ${getDrainageColor(soil.drainage)}`}>
                      {soil.drainage} drainage
                    </Badge>
                    <p className="text-xs text-gray-500">{soil.retention} retention</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ReviewStepContent = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Review & Confirm</h2>
        <p className="text-gray-600">Check your plot details before saving</p>
      </div>
      
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Plot Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plot Name:</span>
              <span className="font-medium">{data.basic?.plotName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Crop:</span>
              <span className="font-medium">{data.basic?.selectedCrop || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">
                {data.location?.latitude ? 
                  `${data.location.latitude.toFixed(4)}, ${data.location.longitude.toFixed(4)}` : 
                  'Not set'}
              </span>
            </div>
            {data.advanced?.soilType && (
              <div className="flex justify-between">
                <span className="text-gray-600">Soil Type:</span>
                <span className="font-medium capitalize">{data.advanced.soilType}</span>
              </div>
            )}
            {data.advanced?.rootDepth && (
              <div className="flex justify-between">
                <span className="text-gray-600">Root Depth:</span>
                <span className="font-medium">{data.advanced.rootDepth[0]}"</span>
              </div>
            )}
            {data.advanced?.soilPH && (
              <div className="flex justify-between">
                <span className="text-gray-600">Soil pH:</span>
                <span className="font-medium">{data.advanced.soilPH[0]}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Ready to Go!</h4>
              <p className="text-sm text-green-700">
                Your plot will be created with an optimized watering schedule based on your settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPlotScreen;
