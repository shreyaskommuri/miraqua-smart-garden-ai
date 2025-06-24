
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Droplets, Clock, CloudRain, Sun, Thermometer, CheckCircle } from "lucide-react";

const SpecificDayScreen = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific day
  const dayData = {
    date: "March 26, 2024",
    time: "6:00 AM",
    amount: "2.5L",
    status: "pending",
    weather: {
      condition: "Sunny",
      temperature: 75,
      humidity: 65,
      precipitation: 0
    },
    soilMoisture: 72,
    notes: "",
    plotName: "Tomato Garden"
  };

  const handleWaterNow = () => {
    // Water now logic
    console.log("Watering now...");
  };

  const handleSkip = () => {
    // Skip watering logic
    console.log("Skipping watering...");
  };

  const handleComplete = () => {
    // Mark as completed logic
    console.log("Marking as completed...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-lg font-semibold text-gray-900">{dayData.plotName}</h1>
              <p className="text-sm text-gray-500">{dayData.date}</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Watering Schedule Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Scheduled Watering</h3>
                  <p className="text-blue-100">{dayData.time}</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                {dayData.status.charAt(0).toUpperCase() + dayData.status.slice(1)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Amount</p>
                <p className="text-2xl font-bold">{dayData.amount}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Duration</p>
                <p className="text-2xl font-bold">15 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Conditions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Sun className="w-5 h-5 text-orange-500" />
              <span>Weather Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-900">{dayData.weather.temperature}°F</div>
                <div className="text-sm text-orange-700">{dayData.weather.condition}</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <CloudRain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">{dayData.weather.humidity}%</div>
                <div className="text-sm text-blue-700">Humidity</div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">Soil Moisture</span>
                <span className="text-green-900 font-bold">{dayData.soilMoisture}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dayData.soilMoisture}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendation */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardContent className="p-5">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 mb-2">Smart Recommendation</h4>
                <p className="text-purple-700 text-sm">
                  Perfect conditions for watering! Soil moisture is at optimal level. 
                  The sunny weather will help plants absorb water efficiently.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes about today's watering session..."
              className="min-h-20"
              value={dayData.notes}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {dayData.status === "pending" && (
            <>
              <Button
                onClick={handleWaterNow}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow-lg"
              >
                <Droplets className="w-5 h-5 mr-2" />
                Water Now ({dayData.amount})
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleComplete}
                  variant="outline"
                  className="h-12 border-green-500 text-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="h-12"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Skip Today
                </Button>
              </div>
            </>
          )}

          {dayData.status === "completed" && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-900">Watering Completed</h4>
                <p className="text-sm text-green-700">Great job taking care of your plants!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default SpecificDayScreen;
