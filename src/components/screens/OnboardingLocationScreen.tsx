
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import { LocationPicker } from "@/components/ui/LocationPicker";
import { MiniMap } from "@/components/ui/MiniMap";

const OnboardingLocationScreen = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedFlex, setSelectedFlex] = useState("");

  const flexOptions = [
    {
      id: "daily",
      title: "Daily Flexibility",
      description: "Adjust watering times within the same day",
      icon: Clock,
      timeRange: "±2 hours",
      efficiency: "+15%",
      features: ["Weather-based timing", "Optimal absorption windows", "Energy cost savings"]
    },
    {
      id: "weekly",
      title: "Weekly Flexibility", 
      description: "Move watering days within the week",
      icon: Calendar,
      timeRange: "±2 days",
      efficiency: "+25%",
      features: ["Rain prediction integration", "Weekend convenience", "Maximum water savings"]
    }
  ];

  const handleLocationChange = ({ lat, lon }: { lat: number; lon: number }) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const validateCoordinates = () => {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 && latitude !== 0 && longitude !== 0;
  };

  const handleContinue = () => {
    if (validateCoordinates() && selectedFlex) {
      // Store coordinates in localStorage for later use
      localStorage.setItem('onboarding_location', JSON.stringify({
        latitude,
        longitude,
        flexType: selectedFlex
      }));
      navigate("/onboarding/advanced");
    }
  };

  const isValid = validateCoordinates() && selectedFlex;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
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
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full w-2/3 transition-all duration-300"></div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Your Location</h2>
          </div>
          <p className="text-gray-600 mb-6">We need precise coordinates for accurate weather data and optimal watering schedules</p>
          
          <LocationPicker
            initialLat={latitude || 37.7749}
            initialLon={longitude || -122.4194}
            onChange={handleLocationChange}
            className="mb-6"
          />

          {validateCoordinates() && (
            <Card className="border-blue-200 bg-blue-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Location Confirmed</h4>
                      <p className="text-sm text-blue-700">
                        {latitude.toFixed(4)}, {longitude.toFixed(4)}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        ✅ Weather data available • ✅ Optimal timing enabled
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <MiniMap 
                      latitude={latitude}
                      longitude={longitude}
                      showControls={false}
                      className="w-20 h-16"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Smart Scheduling Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Smart Scheduling</h2>
          <p className="text-gray-600 mb-6">Choose how flexible your watering schedule can be for maximum efficiency</p>
          
          <div className="space-y-4">
            {flexOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedFlex === option.id
                      ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                      : "border-gray-200 hover:shadow-md hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFlex(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-gray-900 text-lg">{option.title}</h3>
                          <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                            {option.efficiency} more efficient
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {option.timeRange}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-700">Key Benefits:</p>
                          <div className="flex flex-wrap gap-2">
                            {option.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                ✓ {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
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

          {selectedFlex && (
            <Card className="border-green-200 bg-green-50 mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Great Choice!</h4>
                    <p className="text-sm text-green-700">
                      {selectedFlex === 'daily' ? 
                        'Your plants will get perfectly timed watering based on weather conditions.' :
                        'Maximum water savings with intelligent weekly scheduling and rain prediction.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Benefits */}
        {isValid && (
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 mb-8">
            <CardContent className="p-6">
              <h4 className="font-semibold text-purple-900 mb-3">🚀 What you'll get:</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🌧️</span>
                  </div>
                  <span className="text-purple-800">Real-time weather integration for your exact location</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">💡</span>
                  </div>
                  <span className="text-purple-800">AI-powered watering recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">💰</span>
                  </div>
                  <span className="text-purple-800">
                    Up to {flexOptions.find(f => f.id === selectedFlex)?.efficiency} water savings
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium disabled:from-gray-300 disabled:to-gray-300 transition-all duration-300"
        >
          Continue to Advanced Settings
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {!isValid && (
          <p className="text-center text-sm text-gray-500 mt-3">
            {!validateCoordinates() ? 'Please set your location' : 'Please choose a scheduling option'}
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingLocationScreen;
