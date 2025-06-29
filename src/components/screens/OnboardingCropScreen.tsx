
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, Leaf, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const OnboardingCropScreen = () => {
  const navigate = useNavigate();
  const [plotName, setPlotName] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
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

  const validateForm = () => {
    let isValid = true;
    
    if (plotName.length < 3) {
      setPlotNameError("Plot name must be at least 3 characters");
      isValid = false;
    } else {
      setPlotNameError("");
    }
    
    if (!selectedCrop) {
      setCropError("Select a crop type");
      isValid = false;
    } else {
      setCropError("");
    }
    
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save to localStorage for wizard persistence
      localStorage.setItem('onboarding_basic', JSON.stringify({
        plotName,
        selectedCrop
      }));
      navigate("/onboarding/location");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header with Progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
              <h1 className="text-lg font-semibold text-gray-900">Create Your Plot</h1>
              <p className="text-sm text-gray-500">Step 1 of 4</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">25%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-1/4 transition-all duration-300"></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-32">
          {/* Intro */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's set up your garden plot</h2>
            <p className="text-gray-600">Give your plot a name and choose what you'd like to grow</p>
          </div>

          {/* Plot Name Input */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                Plot Name
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 ml-2">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
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
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                Crop Type
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 ml-2">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the main crop you'll be growing in this plot. This helps us optimize watering schedules.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
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
            <Card className="border-green-200 bg-green-50 mb-6">
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
      </ScrollArea>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6">
        <Button
          onClick={handleContinue}
          disabled={!plotName || !selectedCrop}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium disabled:bg-gray-300"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCropScreen;
