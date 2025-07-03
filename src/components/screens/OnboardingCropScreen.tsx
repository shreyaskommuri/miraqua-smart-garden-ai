
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, Leaf, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OnboardingCropScreen = () => {
  const navigate = useNavigate();
  const [plotName, setPlotName] = useState("");
  const [cropType, setCropType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const crops = [
    { 
      id: "tomatoes", 
      name: "Tomatoes", 
      icon: "🍅", 
      description: "Full sun, high water needs",
      waterFrequency: "Daily",
      difficulty: "Easy"
    },
    { 
      id: "lettuce", 
      name: "Lettuce", 
      icon: "🥬", 
      description: "Partial shade, moderate water",
      waterFrequency: "Every 2 days",
      difficulty: "Easy"
    },
    { 
      id: "peppers", 
      name: "Peppers", 
      icon: "🫑", 
      description: "Full sun, moderate water",
      waterFrequency: "Every 2-3 days",
      difficulty: "Medium"
    },
    { 
      id: "herbs", 
      name: "Herbs", 
      icon: "🌿", 
      description: "Full sun, low water needs",
      waterFrequency: "Every 3-4 days",
      difficulty: "Easy"
    },
    { 
      id: "carrots", 
      name: "Carrots", 
      icon: "🥕", 
      description: "Full sun, deep soil",
      waterFrequency: "Every 2 days",
      difficulty: "Medium"
    },
    { 
      id: "beans", 
      name: "Beans", 
      icon: "🫘", 
      description: "Full sun, climbing support",
      waterFrequency: "Daily",
      difficulty: "Easy"
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!plotName.trim()) {
      newErrors.plotName = "Plot name is required";
    } else if (plotName.length < 2) {
      newErrors.plotName = "Plot name must be at least 2 characters";
    } else if (plotName.length > 50) {
      newErrors.plotName = "Plot name must be less than 50 characters";
    }
    
    if (!cropType) {
      newErrors.cropType = "Please select a crop type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for any validation errors",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call or processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const selectedCrop = crops.find(crop => crop.id === cropType);
      
      navigate('/onboarding/location', { 
        state: { 
          plotName: plotName.trim(), 
          cropType,
          cropDetails: selectedCrop
        }
      });

      toast({
        title: "Great choice!",
        description: `${selectedCrop?.name} selected for ${plotName}`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigate('/welcome');
  };

  const isFormValid = plotName.trim().length >= 2 && plotName.trim().length <= 50 && cropType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackNavigation}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              disabled={isLoading}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Setup Your Plot</h1>
              <p className="text-sm text-gray-500">Step 1 of 4</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="px-6 py-6 space-y-8 pb-32">
          {/* Intro */}
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Create Your Garden Plot</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Tell us what you're growing and we'll create a personalized watering schedule
            </p>
          </div>

          {/* Plot Name Card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center space-x-2">
                <span>Plot Name</span>
                {plotName.trim().length >= 2 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="plotName" className="text-gray-700 font-medium">
                  Give your plot a memorable name
                </Label>
                <Input
                  id="plotName"
                  placeholder="e.g., Backyard Garden, Herb Corner, Tomato Paradise"
                  value={plotName}
                  onChange={(e) => {
                    setPlotName(e.target.value);
                    if (errors.plotName) {
                      setErrors(prev => ({ ...prev, plotName: '' }));
                    }
                  }}
                  className={`rounded-xl h-12 text-lg transition-all duration-200 ${
                    errors.plotName 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                      : plotName.trim().length >= 2 
                        ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  maxLength={50}
                  disabled={isLoading}
                />
                {errors.plotName ? (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.plotName}</span>
                  </p>
                ) : (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Choose something you'll remember easily</span>
                    <span>{plotName.length}/50 characters</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Crop Selection Card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center space-x-2">
                <span>What are you growing?</span>
                {cropType && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {crops.map((crop) => (
                  <Card
                    key={crop.id}
                    className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg transform hover:-translate-y-1 ${
                      cropType === crop.id
                        ? "bg-gradient-to-br from-green-50 to-green-100 border-green-500 shadow-lg ring-2 ring-green-200"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => {
                      if (!isLoading) {
                        setCropType(crop.id);
                        if (errors.cropType) {
                          setErrors(prev => ({ ...prev, cropType: '' }));
                        }
                      }
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-3">{crop.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{crop.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{crop.description}</p>
                      <div className="space-y-1">
                        <div className="text-xs text-blue-600 font-medium">
                          💧 {crop.waterFrequency}
                        </div>
                        <div className="text-xs text-purple-600 font-medium">
                          📊 {crop.difficulty}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {errors.cropType && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.cropType}</span>
                </p>
              )}

              {cropType && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Great Choice!</span>
                  </div>
                  <p className="text-sm text-green-800">
                    {crops.find(c => c.id === cropType)?.name} is perfect for smart irrigation. 
                    We'll optimize watering based on weather and soil conditions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Next Button - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-6 shadow-lg">
        <Button
          onClick={handleNext}
          disabled={!isFormValid || isLoading}
          className={`w-full h-14 font-semibold rounded-xl text-lg transition-all duration-300 ${
            isFormValid && !isLoading
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Next: Choose Location</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>
        
        {!isFormValid && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Complete all fields to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingCropScreen;
