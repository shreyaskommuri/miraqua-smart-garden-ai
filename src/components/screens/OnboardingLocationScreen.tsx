
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock } from "lucide-react";

const OnboardingLocationScreen = () => {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState("");
  const [selectedFlex, setSelectedFlex] = useState("");

  const flexOptions = [
    {
      id: "daily",
      title: "Daily Flexibility",
      description: "Adjust watering times within the same day",
      icon: Clock,
      timeRange: "±2 hours"
    },
    {
      id: "weekly",
      title: "Weekly Flexibility", 
      description: "Move watering days within the week",
      icon: Calendar,
      timeRange: "±2 days"
    }
  ];

  const handleContinue = () => {
    if (zipCode && selectedFlex) {
      navigate("/onboarding/advanced");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
              <h1 className="text-lg font-semibold text-gray-900">Location & Schedule</h1>
              <p className="text-sm text-gray-500">Step 2 of 3</p>
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
            <span className="text-sm text-gray-600">67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-2/3 transition-all duration-300"></div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Your Location</h2>
          </div>
          <p className="text-gray-600 mb-4">We need your ZIP code for accurate weather data</p>
          
          <div className="space-y-2">
            <Label htmlFor="zipcode" className="text-gray-700">ZIP Code</Label>
            <Input
              id="zipcode"
              type="text"
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="h-12 text-lg"
              maxLength={5}
            />
          </div>

          {zipCode.length === 5 && (
            <Card className="border-blue-200 bg-blue-50 mt-4">
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

        {/* Flexibility Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Flexibility</h2>
          <p className="text-gray-600 mb-6">How flexible can your watering schedule be?</p>
          
          <div className="space-y-4">
            {flexOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedFlex === option.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedFlex(option.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {option.timeRange}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{option.description}</p>
                      </div>
                      {selectedFlex === option.id && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!zipCode || !selectedFlex || zipCode.length !== 5}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLocationScreen;
