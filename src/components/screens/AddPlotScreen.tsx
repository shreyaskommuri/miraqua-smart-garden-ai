import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  ArrowRight, 
  Leaf, 
  Calendar,
  Ruler,
  Settings,
  Check,
  Plus,
  Save,
  MapPin,
  Map
} from "lucide-react";
import { LocationPicker } from "@/components/ui/LocationPicker";

interface AdvancedSettings {
  wateringDepth: string;
  fertilizer: boolean;
  mulch: boolean;
  drainageType: string;
  irrigationType: string;
  soilPh: string;
}

interface FormData {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  cropType: string;
  plantingDate: string;
  area: string;
  areaUnit: 'sqft' | 'sqm';
  soilType: string;
  flexType: string;
  advancedSettings: AdvancedSettings;
}

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [canResume, setCanResume] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    cropType: "",
    plantingDate: "",
    area: "",
    areaUnit: 'sqft',
    soilType: "",
    flexType: "",
    advancedSettings: {
      wateringDepth: "6",
      fertilizer: false,
      mulch: false,
      drainageType: "good",
      irrigationType: "drip",
      soilPh: "neutral"
    }
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // Load saved data on mount
  React.useEffect(() => {
    const saved = sessionStorage.getItem('add_plot_draft');
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(data.formData);
      setStep(data.step);
      setCanResume(true);
    }
  }, []);

  // Auto-save draft
  React.useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem('add_plot_draft', JSON.stringify({ formData, step }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, step]);

  const cropTypes = [
    { id: "tomatoes", name: "Tomatoes", icon: "🍅", difficulty: "Easy", season: "Spring/Summer", waterNeeds: "Medium" },
    { id: "herbs", name: "Herbs", icon: "🌿", difficulty: "Easy", season: "Year-round", waterNeeds: "Low" },
    { id: "lettuce", name: "Lettuce", icon: "🥬", difficulty: "Easy", season: "Cool weather", waterNeeds: "High" },
    { id: "peppers", name: "Peppers", icon: "🌶️", difficulty: "Medium", season: "Summer", waterNeeds: "Medium" },
    { id: "carrots", name: "Carrots", icon: "🥕", difficulty: "Medium", season: "Cool weather", waterNeeds: "Medium" },
    { id: "cucumbers", name: "Cucumbers", icon: "🥒", difficulty: "Medium", season: "Summer", waterNeeds: "High" },
  ];

  const soilTypes = [
    { id: "clay", name: "Clay", description: "Heavy, retains water well", drainageRate: "Slow" },
    { id: "sandy", name: "Sandy", description: "Light, drains quickly", drainageRate: "Fast" },
    { id: "loamy", name: "Loamy", description: "Balanced, ideal for most plants", drainageRate: "Medium" },
    { id: "silty", name: "Silty", description: "Smooth, holds nutrients well", drainageRate: "Medium" },
  ];

  const flexTypes = [
    { id: "daily", name: "Daily Flexibility", description: "Adjust watering times within the same day", timeRange: "±2 hours", efficiency: "+15%" },
    { id: "weekly", name: "Weekly Flexibility", description: "Move watering days within the week", timeRange: "±2 days", efficiency: "+25%" },
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

  const handleLocationChange = ({ lat, lon }: { lat: number; lon: number }) => {
    updateFormData('latitude', lat);
    updateFormData('longitude', lon);
  };

  const validateCoordinates = () => {
    return formData.latitude >= -90 && formData.latitude <= 90 && 
           formData.longitude >= -180 && formData.longitude <= 180 &&
           formData.latitude !== 0 && formData.longitude !== 0;
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

  const handleSaveDraft = () => {
    sessionStorage.setItem('add_plot_draft', JSON.stringify({ formData, step }));
    navigate('/app');
  };

  const handleSubmit = () => {
    const plotData = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    sessionStorage.removeItem('add_plot_draft');
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
                <p className="text-xs text-gray-500">Choose a unique, descriptive name</p>
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

            {canResume && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">
                    💡 We found a saved draft from your previous session. Continue where you left off!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Location</h2>
              <p className="text-gray-600">Precise coordinates help us provide accurate weather data</p>
            </div>

            <LocationPicker
              initialLat={formData.latitude || 37.7749}
              initialLon={formData.longitude || -122.4194}
              onChange={handleLocationChange}
            />

            {validateCoordinates() && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">Location Set</h4>
                      <p className="text-sm text-green-700">
                        {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
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
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{crop.name}</h3>
                        <div className="flex justify-center space-x-1 mb-2">
                          <Badge className="text-xs" variant="outline">
                            {crop.difficulty}
                          </Badge>
                          <Badge className="text-xs" variant="outline">
                            {crop.waterNeeds}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{crop.season}</p>
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
                <p className="text-xs text-gray-500">This helps calculate optimal watering schedules</p>
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
                <Label htmlFor="area">Plot Area *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="area"
                    type="number"
                    placeholder="25"
                    value={formData.area}
                    onChange={(e) => updateFormData("area", e.target.value)}
                    className="h-12 flex-1"
                  />
                  <Select value={formData.areaUnit} onValueChange={(value) => updateFormData("areaUnit", value)}>
                    <SelectTrigger className="w-24 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sqft">sq ft</SelectItem>
                      <SelectItem value="sqm">sq m</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="font-semibold text-gray-900">{soil.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {soil.drainageRate} drainage
                              </Badge>
                            </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Smart Scheduling</h2>
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
                          <Badge className="text-xs bg-green-100 text-green-700">
                            {flex.efficiency} more efficient
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

            {/* Review Summary */}
            {validateCoordinates() && formData.cropType && formData.area && formData.soilType && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Ready to Create
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700 font-medium">Plot Name</p>
                      <p className="text-green-600">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Crop</p>
                      <p className="text-green-600">{cropTypes.find(c => c.id === formData.cropType)?.name}</p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Area</p>
                      <p className="text-green-600">{formData.area} {formData.areaUnit}</p>
                    </div>
                    <div>
                      <p className="text-green-700 font-medium">Location</p>
                      <p className="text-green-600">
                        {formData.latitude.toFixed(3)}, {formData.longitude.toFixed(3)}
                      </p>
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSaveDraft}
              className="p-2"
            >
              <Save className="w-5 h-5" />
            </Button>
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
          <Progress value={progress} className="h-3" />
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
