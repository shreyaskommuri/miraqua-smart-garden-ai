
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock, Navigation, Map } from "lucide-react";

const OnboardingLocationScreen = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedFlex, setSelectedFlex] = useState("");
  const [locationMethod, setLocationMethod] = useState<'coordinates' | 'current'>('coordinates');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

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

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        setLatitude(lat);
        setLongitude(lon);
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to get your location. Please enter coordinates manually.");
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const validateCoordinates = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      return false;
    }
    
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  };

  const handleContinue = () => {
    if (validateCoordinates() && selectedFlex) {
      // Store coordinates in localStorage for later use
      localStorage.setItem('onboarding_location', JSON.stringify({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        flexType: selectedFlex
      }));
      navigate("/onboarding/advanced");
    }
  };

  const isValid = validateCoordinates() && selectedFlex;

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
          <p className="text-gray-600 mb-4">We need precise coordinates for accurate weather data</p>
          
          <Tabs value={locationMethod} onValueChange={(value) => setLocationMethod(value as 'coordinates' | 'current')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coordinates" className="flex items-center space-x-2">
                <Map className="w-4 h-4" />
                <span>Enter Coordinates</span>
              </TabsTrigger>
              <TabsTrigger value="current" className="flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Use Current Location</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="coordinates" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-gray-700">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    placeholder="37.7749"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="h-12 text-lg"
                    min={-90}
                    max={90}
                    step={0.000001}
                  />
                  <p className="text-xs text-gray-500">Range: -90 to 90</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-gray-700">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    placeholder="-122.4194"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="h-12 text-lg"
                    min={-180}
                    max={180}
                    step={0.000001}
                  />
                  <p className="text-xs text-gray-500">Range: -180 to 180</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="current" className="space-y-4 mt-4">
              <div className="text-center">
                <Button
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoadingLocation ? (
                    "Getting your location..."
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Current Location
                    </>
                  )}
                </Button>
                
                {locationError && (
                  <p className="text-sm text-red-600 mt-2">{locationError}</p>
                )}
                
                {latitude && longitude && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Location found:</strong><br />
                      Lat: {latitude}, Lon: {longitude}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {validateCoordinates() && (
            <Card className="border-blue-200 bg-blue-50 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Valid Coordinates</h4>
                    <p className="text-sm text-blue-700">
                      Lat: {parseFloat(latitude).toFixed(4)}, Lon: {parseFloat(longitude).toFixed(4)}
                    </p>
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
          disabled={!isValid}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-300"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLocationScreen;
