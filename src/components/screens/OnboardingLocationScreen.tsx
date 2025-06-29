
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, MapPin, Crosshair } from "lucide-react";

const OnboardingLocationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const plotData = location.state;

  const handleUseMyLocation = async () => {
    setIsLoading(true);
    setError("");
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setIsLoading(false);
      },
      (error) => {
        setError("Unable to access your location. Please enter coordinates manually.");
        setIsLoading(false);
      }
    );
  };

  const handleNext = () => {
    navigate('/onboarding/advanced-settings', {
      state: { ...plotData, latitude, longitude, address }
    });
  };

  const isValid = latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Progress Header - Sticky */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
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
              <h1 className="text-lg font-semibold text-gray-900">Plot Location</h1>
              <p className="text-sm text-gray-500">Step 2 of 4</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-2/4 transition-all duration-300"></div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="px-6 py-6 space-y-8 pb-32">
          {/* Intro */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where is your plot located?</h2>
            <p className="text-gray-600">We'll use this to get local weather data and optimize watering</p>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Map Preview */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                {/* Simulated Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {latitude.toFixed(4)}, {longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 12.5}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Controls */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Set Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={handleUseMyLocation}
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Crosshair className="w-4 h-4 mr-2" />
                {isLoading ? "Getting Location..." : "Use My Current Location"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or enter manually</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                    placeholder="37.7749"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                    placeholder="-122.4194"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address (Optional)</Label>
                <Input
                  id="address"
                  placeholder="e.g., 123 Garden St, San Francisco, CA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Sticky Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-300"
        >
          Next: Advanced Settings
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLocationScreen;
