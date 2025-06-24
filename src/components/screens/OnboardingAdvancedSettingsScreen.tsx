
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Settings, Droplets, Thermometer } from "lucide-react";

const OnboardingAdvancedSettingsScreen = () => {
  const navigate = useNavigate();
  const [rootDepth, setRootDepth] = useState([12]);
  const [soilPH, setSoilPH] = useState([6.5]);
  const [soilType, setSoilType] = useState("");

  const soilTypes = [
    { id: "clay", name: "Clay", drainage: "Poor", retention: "High" },
    { id: "sandy", name: "Sandy", drainage: "Excellent", retention: "Low" },
    { id: "loam", name: "Loam", drainage: "Good", retention: "Medium" },
    { id: "silt", name: "Silt", drainage: "Fair", retention: "High" }
  ];

  const handleContinue = () => {
    navigate("/onboarding/complete");
  };

  const handleSkip = () => {
    navigate("/onboarding/complete");
  };

  const getDrainageColor = (drainage: string) => {
    switch (drainage) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Fair": return "bg-yellow-100 text-yellow-700";
      case "Poor": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
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
              <h1 className="text-lg font-semibold text-gray-900">Advanced Settings</h1>
              <p className="text-sm text-gray-500">Step 3 of 3 (Optional)</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSkip}
              className="text-purple-600"
            >
              Skip
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Fine-tune Your Garden</h2>
          <p className="text-gray-600">Optional settings for even better results</p>
        </div>

        {/* Root Depth */}
        <Card className="border-0 shadow-md mb-6">
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
        <Card className="border-0 shadow-md mb-6">
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
        <Card className="border-0 shadow-md mb-8">
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

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            Complete Setup
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full h-10 border-gray-300 text-gray-700"
          >
            Skip Advanced Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAdvancedSettingsScreen;
