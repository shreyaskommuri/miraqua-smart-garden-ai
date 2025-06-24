
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Droplets, Calendar, MapPin, Settings, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete: (plotData: any) => void;
  onCancel: () => void;
}

const OnboardingFlow = ({ onComplete, onCancel }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [plotData, setPlotData] = useState({
    name: "",
    crop: "",
    area: "",
    areaUnit: "sq ft",
    plantingDate: "",
    zipCode: "",
    flexType: "daily"
  });

  const steps = [
    {
      title: "Welcome to Miraqua",
      description: "Let's set up your first smart irrigation plot",
      icon: Droplets
    },
    {
      title: "Plot Basics",
      description: "Tell us about your garden or field",
      icon: Settings
    },
    {
      title: "Location & Schedule",
      description: "Configure location and watering preferences",
      icon: MapPin
    },
    {
      title: "Ready to Go!",
      description: "Your AI irrigation system is set up",
      icon: Check
    }
  ];

  const cropOptions = [
    "Tomatoes", "Lettuce", "Carrots", "Peppers", "Herbs", "Strawberries",
    "Cucumbers", "Beans", "Squash", "Corn", "Other"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const newPlot = {
        ...plotData,
        moisture: Math.floor(Math.random() * 40) + 60,
        temperature: Math.floor(Math.random() * 10) + 68,
        sunlight: Math.floor(Math.random() * 200) + 800,
        nextWatering: "Tomorrow 6:00 AM",
        status: "healthy"
      };
      onComplete(newPlot);
      toast({
        title: "Plot Added Successfully!",
        description: "Your AI irrigation system is now monitoring your plot.",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return plotData.name && plotData.crop && plotData.area && plotData.plantingDate;
      case 2:
        return plotData.zipCode.length === 5;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm border-green-100">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800">{steps[currentStep].title}</CardTitle>
          <CardDescription className="text-green-600">{steps[currentStep].description}</CardDescription>
          <Progress value={progress} className="mt-4 h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Droplets className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800">Smart Watering</h4>
                  <p className="text-sm text-green-600">AI-optimized irrigation schedules</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800">Weather Integration</h4>
                  <p className="text-sm text-blue-600">Real-time weather data</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-800">Easy Control</h4>
                  <p className="text-sm text-orange-600">Natural language commands</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="plotName">Plot Name</Label>
                <Input
                  id="plotName"
                  placeholder="e.g., Tomato Garden"
                  value={plotData.name}
                  onChange={(e) => setPlotData({ ...plotData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="crop">Crop Type</Label>
                <Select value={plotData.crop} onValueChange={(value) => setPlotData({ ...plotData, crop: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="100"
                    value={plotData.area}
                    onChange={(e) => setPlotData({ ...plotData, area: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={plotData.areaUnit} onValueChange={(value) => setPlotData({ ...plotData, areaUnit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq ft">Square Feet</SelectItem>
                      <SelectItem value="sq m">Square Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={plotData.plantingDate}
                  onChange={(e) => setPlotData({ ...plotData, plantingDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  placeholder="94583"
                  maxLength={5}
                  value={plotData.zipCode}
                  onChange={(e) => setPlotData({ ...plotData, zipCode: e.target.value.replace(/\D/g, '') })}
                />
                <p className="text-sm text-green-600 mt-1">Used for weather data and local conditions</p>
              </div>

              <div>
                <Label>Watering Flexibility</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Card 
                    className={`cursor-pointer transition-all ${plotData.flexType === 'daily' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setPlotData({ ...plotData, flexType: 'daily' })}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Daily</h4>
                      <p className="text-sm text-gray-600">Water every day as needed</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${plotData.flexType === 'flexible' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setPlotData({ ...plotData, flexType: 'flexible' })}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold">Flexible</h4>
                      <p className="text-sm text-gray-600">Skip days when possible</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">All Set!</h3>
                <p className="text-green-600">
                  Your plot "{plotData.name}" is ready for AI-powered irrigation. 
                  The system will analyze weather patterns and soil conditions to optimize watering.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Next Steps:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Monitor your plot's real-time metrics</li>
                  <li>• Check the 7-day watering schedule</li>
                  <li>• Use AI chat for natural language commands</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? onCancel : handlePrev}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {currentStep === 0 ? "Cancel" : "Previous"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
            >
              {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
