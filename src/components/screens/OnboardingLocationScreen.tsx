
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, MapPin, Crosshair, Loader2 } from "lucide-react";

const OnboardingLocationScreen = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapError, setMapError] = useState("");
  const [addressError, setAddressError] = useState("");
  const mapRef = useRef(null);

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setMapError("");
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (error) {
      setMapError("Unable to get your location. Please enter coordinates manually.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const validateCoordinates = (lat, lon) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return "Latitude must be between -90 and 90";
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return "Longitude must be between -180 and 180";
    }
    return "";
  };

  const handleLatitudeChange = (value) => {
    const error = validateCoordinates(value, location.longitude);
    setAddressError(error);
    setLocation(prev => ({ ...prev, latitude: parseFloat(value) || null }));
  };

  const handleLongitudeChange = (value) => {
    const error = validateCoordinates(location.latitude, value);
    setAddressError(error);
    setLocation(prev => ({ ...prev, longitude: parseFloat(value) || null }));
  };

  const isValid = location.latitude !== null && location.longitude !== null && !addressError;

  const handleContinue = () => {
    if (isValid) {
      localStorage.setItem('onboarding_location', JSON.stringify(location));
      navigate("/onboarding/advanced");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
              <h1 className="text-lg font-semibold text-gray-900">Location</h1>
              <p className="text-sm text-gray-500">Step 2 of 3</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-32">
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

          {/* Intro */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where's Your Garden?</h2>
            <p className="text-gray-600">We need your location to provide accurate weather data and watering schedules</p>
          </div>

          {/* Map Placeholder */}
          <Card className="border-0 shadow-md mb-6">
            <CardContent className="p-0">
              <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map will load here</p>
                    {location.latitude && location.longitude && (
                      <div className="mt-2 p-2 bg-white rounded-lg shadow-sm">
                        <p className="text-sm font-medium">
                          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Location Button */}
          <Button
            onClick={handleUseCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full h-12 mb-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoadingLocation ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <Crosshair className="w-4 h-4 mr-2" />
                Use My Current Location
              </>
            )}
          </Button>

          {/* Manual Input */}
          <Card className="border-0 shadow-md mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Or Enter Coordinates Manually</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0001"
                    min="-90"
                    max="90"
                    placeholder="37.7749"
                    onChange={(e) => handleLatitudeChange(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0001"
                    min="-180"
                    max="180"
                    placeholder="-122.4194"
                    onChange={(e) => handleLongitudeChange(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
              
              {addressError && (
                <p className="text-sm text-red-600">{addressError}</p>
              )}
              
              {mapError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{mapError}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Search */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Search by Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Garden St, San Francisco, CA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-gray-500">
                  Address search will be implemented with map integration
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLocationScreen;
