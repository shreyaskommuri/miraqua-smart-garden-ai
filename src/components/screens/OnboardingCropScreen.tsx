
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

const OnboardingCropScreen = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState("");

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

  const handleContinue = () => {
    if (selectedCrop) {
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
              <h1 className="text-lg font-semibold text-gray-900">Choose Your Crop</h1>
              <p className="text-sm text-gray-500">Step 1 of 3</p>
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
            <span className="text-sm text-gray-600">33%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-1/3 transition-all duration-300"></div>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What would you like to grow?</h2>
          <p className="text-gray-600">Select your crop to get personalized care recommendations</p>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {cropTypes.map((crop) => (
            <Card
              key={crop.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedCrop === crop.id
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : "border-gray-200 hover:shadow-md"
              }`}
              onClick={() => setSelectedCrop(crop.id)}
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

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedCrop}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCropScreen;
