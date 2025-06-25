import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Leaf, 
  Calendar,
  Ruler,
  Settings,
  Check,
  Plus
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
  zipCode: string;
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    zipCode: "",
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
    // In real app, this would submit to API
    console.log('Submitting plot data:', formData);
    navigate('/app');
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.name.trim() !== "";
      case 2: return formData.zipCode.length === 5;
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
              <p className="text-gray-600">We need your location for accurate weather data</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  className="h-12 text-lg"
                  maxLength={5}
                />
              </div>

              {formData.zipCode.length === 5 && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Location Found</h4>
                        <p className="text-sm text-blue-700">San Francisco, CA - Zone 10a</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
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
