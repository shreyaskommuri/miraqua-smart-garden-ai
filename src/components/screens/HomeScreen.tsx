
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Sun, Calendar, Plus, Bell, User, TrendingUp, ArrowRight } from "lucide-react";
import PlotCard from "@/components/PlotCard";

const HomeScreen = () => {
  const [plots] = useState([
    {
      id: 1,
      name: "Tomato Garden",
      crop: "Tomatoes",
      moisture: 85,
      temperature: 72,
      sunlight: 850,
      nextWatering: "Today 6:00 AM",
      status: "healthy"
    },
    {
      id: 2,
      name: "Herb Patch",
      crop: "Basil & Oregano",
      moisture: 65,
      temperature: 74,
      sunlight: 920,
      nextWatering: "Tomorrow 5:30 AM",
      status: "needs-water"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Miraqua</h1>
                <p className="text-sm text-gray-500">Smart Garden Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Link to="/account">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Weather & Environment Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-blue-900">Moisture</span>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">75%</div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-blue-700 mt-2">Optimal range</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-orange-900">Temperature</span>
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-1">73°F</div>
              <p className="text-xs text-orange-700">Perfect conditions</p>
            </CardContent>
          </Card>
        </div>

        {/* Next Watering Alert */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Next Watering</span>
                </div>
                <div className="text-2xl font-bold mb-1">Today 6:00 AM</div>
                <div className="text-sm opacity-90">In 8 hours • Tomato Garden</div>
              </div>
              <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100 shadow-md">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/add-plot">
            <Button className="h-16 w-full bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center space-y-2 shadow-lg">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Add Plot</span>
            </Button>
          </Link>
          <Link to="/chat">
            <Button className="h-16 w-full bg-purple-500 hover:bg-purple-600 text-white flex flex-col items-center justify-center space-y-2 shadow-lg">
              <Droplets className="w-6 h-6" />
              <span className="text-sm font-medium">AI Assistant</span>
            </Button>
          </Link>
        </div>

        {/* My Plots Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">My Plots</h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
              {plots.length} active
            </Badge>
          </div>

          <div className="space-y-4">
            {plots.map((plot) => (
              <Link key={plot.id} to={`/plot/${plot.id}`}>
                <PlotCard plot={plot} />
              </Link>
            ))}
          </div>
        </div>

        {/* Weekly Overview */}
        <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-indigo-900">This Week</span>
              </div>
              <Link to="/analytics">
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-900">12L</div>
                <div className="text-sm text-indigo-700">Water Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-900">8%</div>
                <div className="text-sm text-indigo-700">Water Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-900">100%</div>
                <div className="text-sm text-indigo-700">Plant Health</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default HomeScreen;
