
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, MapPin, Loader2, CheckCircle } from "lucide-react";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [plotData, setPlotData] = useState({
    name: "",
    crop: "",
    area: "",
    location: null as LocationCoords | null,
    soilType: "",
    rootDepth: 12,
    ph: 7.0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const crops = [
    { value: "tomatoes", label: "Tomatoes", image: "🍅" },
    { value: "peppers", label: "Bell Peppers", image: "🫑" },
    { value: "herbs", label: "Herbs", image: "🌿" },
    { value: "lettuce", label: "Lettuce", image: "🥬" },
    { value: "carrots", label: "Carrots", image: "🥕" }
  ];

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sand", label: "Sand" },
    { value: "loam", label: "Loam" },
    { value: "silt", label: "Silt" }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!plotData.name || plotData.name.length < 3) {
        newErrors.name = "Plot name must be at least 3 characters";
      }
      if (!plotData.crop) {
        newErrors.crop = "Please select a crop type";
      }
    }

    if (step === 2) {
      if (!plotData.location) {
        newErrors.location = "Please select a location";
      }
    }

    if (step === 3) {
      if (!plotData.soilType) {
        newErrors.soilType = "Please select a soil type";
      }
      if (!plotData.area || parseFloat(plotData.area) <= 0) {
        newErrors.area = "Please enter a valid area";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLocationSelect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPlotData({
            ...plotData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        () => {
          // Fallback to default location
          setPlotData({
            ...plotData,
            location: {
              latitude: 37.7749,
              longitude: -122.4194
            }
          });
        }
      );
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/app");
    } catch (error) {
      console.error("Failed to create plot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="plotName">Plot Name *</Label>
        <Input
          id="plotName"
          value={plotData.name}
          onChange={(e) => setPlotData({ ...plotData, name: e.target.value })}
          placeholder="e.g., Tomato Garden"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label>Crop Type *</Label>
        <Select value={plotData.crop} onValueChange={(value) => setPlotData({ ...plotData, crop: value })}>
          <SelectTrigger className={errors.crop ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a crop" />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop.value} value={crop.value}>
                <div className="flex items-center space-x-2">
                  <span>{crop.image}</span>
                  <span>{crop.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.crop && <p className="text-sm text-red-600 mt-1">{errors.crop}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Set Plot Location</h3>
        
        <Card className="p-6">
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Map Preview</p>
              {plotData.location && (
                <p className="text-xs text-gray-500 mt-1">
                  {plotData.location.latitude.toFixed(4)}, {plotData.location.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
          
          <Button onClick={handleLocationSelect} className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Use My Location
          </Button>
        </Card>

        {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>Soil Type *</Label>
        <Select value={plotData.soilType} onValueChange={(value) => setPlotData({ ...plotData, soilType: value })}>
          <SelectTrigger className={errors.soilType ? "border-red-500" : ""}>
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            {soilTypes.map((soil) => (
              <SelectItem key={soil.value} value={soil.value}>
                {soil.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.soilType && <p className="text-sm text-red-600 mt-1">{errors.soilType}</p>}
      </div>

      <div>
        <Label htmlFor="area">Plot Area (m²) *</Label>
        <Input
          id="area"
          type="number"
          value={plotData.area}
          onChange={(e) => setPlotData({ ...plotData, area: e.target.value })}
          placeholder="e.g., 25"
          className={errors.area ? "border-red-500" : ""}
        />
        {errors.area && <p className="text-sm text-red-600 mt-1">{errors.area}</p>}
      </div>

      <div>
        <Label>Root Depth: {plotData.rootDepth} inches</Label>
        <input
          type="range"
          min="6"
          max="36"
          value={plotData.rootDepth}
          onChange={(e) => setPlotData({ ...plotData, rootDepth: parseInt(e.target.value) })}
          className="w-full mt-2"
        />
      </div>

      <div>
        <Label htmlFor="ph">Soil pH (optional)</Label>
        <Input
          id="ph"
          type="number"
          step="0.1"
          min="5.0"
          max="9.0"
          value={plotData.ph}
          onChange={(e) => setPlotData({ ...plotData, ph: parseFloat(e.target.value) })}
          placeholder="7.0"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
      <h3 className="text-xl font-bold">Review Your Plot</h3>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{plotData.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Crop:</p>
                <p className="font-medium">{crops.find(c => c.value === plotData.crop)?.label}</p>
              </div>
              <div>
                <p className="text-gray-600">Area:</p>
                <p className="font-medium">{plotData.area} m²</p>
              </div>
              <div>
                <p className="text-gray-600">Soil:</p>
                <p className="font-medium">{soilTypes.find(s => s.value === plotData.soilType)?.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => currentStep === 1 ? navigate(-1) : handleBack()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold">Add New Plot</h1>
              <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
            </div>
            <div className="w-16"></div>
          </div>
          
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full h-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Plot...
            </>
          ) : currentStep === 4 ? (
            "Create Plot"
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddPlotScreen;
