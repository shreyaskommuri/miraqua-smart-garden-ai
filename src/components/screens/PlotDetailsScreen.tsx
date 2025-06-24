
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Droplets, Thermometer, Sun, Calendar, Edit, MoreVertical, MapPin } from "lucide-react";

const PlotDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock plot data
  const plot = {
    id: 1,
    name: "Tomato Garden",
    crop: "Tomatoes",
    location: "Backyard South Corner",
    size: "4x4 feet",
    moisture: 85,
    temperature: 72,
    sunlight: 850,
    nextWatering: "Today 6:00 AM",
    status: "healthy",
    plantedDate: "March 15, 2024",
    expectedHarvest: "June 20, 2024"
  };

  const schedule = [
    { date: "Today", time: "6:00 AM", amount: "2.5L", status: "pending", weather: "Sunny 75°F" },
    { date: "Tomorrow", time: "6:00 AM", amount: "2.5L", status: "scheduled", weather: "Partly Cloudy 73°F" },
    { date: "March 28", time: "6:00 AM", amount: "2.0L", status: "scheduled", weather: "Light Rain 68°F" },
    { date: "March 30", time: "6:00 AM", amount: "3.0L", status: "scheduled", weather: "Sunny 76°F" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-700 border-green-200";
      case "needs-water": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overwatered": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-700";
      case "completed": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
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
            <div className="text-center flex-1">
              <h1 className="text-lg font-semibold text-gray-900">{plot.name}</h1>
              <p className="text-sm text-gray-500">{plot.crop}</p>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 h-12">
            <TabsTrigger value="details" className="h-10">Details</TabsTrigger>
            <TabsTrigger value="schedule" className="h-10">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Status Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Current Status</h3>
                  <Badge className={`border ${getStatusColor(plot.status)}`}>
                    Healthy
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-900">{plot.moisture}%</div>
                    <div className="text-sm text-blue-700">Moisture</div>
                    <Progress value={plot.moisture} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-orange-900">{plot.temperature}°F</div>
                    <div className="text-sm text-orange-700">Temperature</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <Sun className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-yellow-900">{plot.sunlight}</div>
                    <div className="text-sm text-yellow-700">Lux</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Next Watering</span>
                  </div>
                  <div className="text-lg font-bold text-green-900">{plot.nextWatering}</div>
                  <div className="text-sm text-green-700">Amount: ~2.5L</div>
                </div>
              </CardContent>
            </Card>

            {/* Plot Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Plot Information
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="font-medium">{plot.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{plot.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Planted</p>
                    <p className="font-medium">{plot.plantedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Harvest Expected</p>
                    <p className="font-medium">{plot.expectedHarvest}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-14 bg-blue-600 hover:bg-blue-700 text-white">
                <Droplets className="w-5 h-5 mr-2" />
                Water Now
              </Button>
              <Button variant="outline" className="h-14">
                <Calendar className="w-5 h-5 mr-2" />
                Adjust Schedule
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            {schedule.map((item, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.date}</h4>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <Badge className={getScheduleStatusColor(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">{item.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Weather</p>
                      <p className="font-medium">{item.weather}</p>
                    </div>
                  </div>

                  {item.status === "pending" && (
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Skip
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default PlotDetailsScreen;
