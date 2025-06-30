
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

const OnboardingCropScreen = () => {
  const navigate = useNavigate();
  const [plotName, setPlotName] = useState("");
  const [cropType, setCropType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const crops = [
    { id: "tomatoes", name: "Tomatoes", icon: "🍅", description: "Full sun, high water needs" },
    { id: "lettuce", name: "Lettuce", icon: "🥬", description: "Partial shade, moderate water" },
    { id: "peppers", name: "Peppers", icon: "🫑", description: "Full sun, moderate water" },
    { id: "herbs", name: "Herbs", icon: "🌿", description: "Full sun, low water needs" },
    { id: "carrots", name: "Carrots", icon: "🥕", description: "Full sun, deep soil" },
    { id: "beans", name: "Beans", icon: "🫘", description: "Full sun, climbing support" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!plotName.trim()) {
      newErrors.plotName = "Plot name is required";
    } else if (plotName.length < 3) {
      newErrors.plotName = "Plot name must be at least 3 characters";
    }
    
    if (!cropType) {
      newErrors.cropType = "Please select a crop type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/onboarding/location', { 
        state: { plotName, cropType }
      });
    }
  };

  const isFormValid = plotName.length >= 3 && cropType;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
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
              <h1 className="text-lg font-semibold text-gray-900">Setup Your Plot</h1>
              <p className="text-sm text-gray-500">Step 1 of 4</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-1/4 transition-all duration-300"></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="px-6 py-6 space-y-8 pb-32">
          {/* Intro */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's Create Your Garden Plot</h2>
            <p className="text-gray-600">Tell us what you're growing and we'll optimize your watering schedule</p>
          </div>

          {/* Plot Name */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Plot Name</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plotName">Give your plot a memorable name</Label>
                <Input
                  id="plotName"
                  placeholder="e.g., Backyard Garden, Herb Corner"
                  value={plotName}
                  onChange={(e) => {
                    setPlotName(e.target.value);
                    if (errors.plotName) setErrors(prev => ({ ...prev, plotName: '' }));
                  }}
                  className={`rounded-xl ${errors.plotName ? "border-red-500" : ""}`}
                  maxLength={50}
                />
                {errors.plotName && <p className="text-sm text-red-600">{errors.plotName}</p>}
                <p className="text-xs text-gray-500">{plotName.length}/50 characters</p>
              </div>
            </CardContent>
          </Card>

          {/* Crop Type */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">What are you growing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {crops.map((crop) => (
                  <Card
                    key={crop.id}
                    className={`cursor-pointer transition-all duration-200 border-0 shadow-sm ${
                      cropType === crop.id
                        ? "bg-green-50 ring-2 ring-green-500"
                        : "bg-white hover:shadow-md"
                    }`}
                    onClick={() => {
                      setCropType(crop.id);
                      if (errors.cropType) setErrors(prev => ({ ...prev, cropType: '' }));
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{crop.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{crop.name}</h3>
                      <p className="text-xs text-gray-500">{crop.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.cropType && <p className="text-sm text-red-600">{errors.cropType}</p>}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl disabled:bg-gray-300"
        >
          Next: Choose Location
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCropScreen;
