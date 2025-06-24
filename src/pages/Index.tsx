
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Sun, Calendar, MessageSquare, Plus, Bell, User, Settings, TrendingUp } from "lucide-react";
import OnboardingFlow from "@/components/OnboardingFlow";
import PlotCard from "@/components/PlotCard";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [plots, setPlots] = useState([
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

  const handleAddPlot = (newPlot: any) => {
    setPlots([...plots, { ...newPlot, id: plots.length + 1 }]);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleAddPlot} onCancel={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Miraqua</h1>
                <p className="text-xs text-gray-500">Smart Garden</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Bell className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <User className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Moisture</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">75%</div>
              <Progress value={75} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Temp</span>
              </div>
              <div className="text-2xl font-bold text-orange-900">73°F</div>
              <div className="text-xs text-orange-700 mt-1">Perfect</div>
            </CardContent>
          </Card>
        </div>

        {/* Next Watering Card */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Next Watering</span>
                </div>
                <div className="text-xl font-bold">Today 6:00 AM</div>
                <div className="text-sm opacity-90">In 8 hours</div>
              </div>
              <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowChat(!showChat)}
            className="h-14 bg-purple-500 hover:bg-purple-600 text-white flex flex-col items-center justify-center space-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">AI Chat</span>
          </Button>
          <Button
            onClick={() => setShowOnboarding(true)}
            className="h-14 bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center space-y-1"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs">Add Plot</span>
          </Button>
        </div>

        {/* My Plots Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">My Plots</h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {plots.length}
            </Badge>
          </div>

          {plots.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">No plots yet</h3>
                <p className="text-sm text-gray-500 mb-4">Add your first plot to get started</p>
                <Button
                  onClick={() => setShowOnboarding(true)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Plot
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {plots.map((plot) => (
                <PlotCard key={plot.id} plot={plot} />
              ))}
            </div>
          )}
        </div>

        {/* Analytics Preview */}
        <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-indigo-900">This Week</span>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-600 h-auto p-1">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-900">12L</div>
                <div className="text-xs text-indigo-700">Water Used</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-900">8%</div>
                <div className="text-xs text-indigo-700">Saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-900">100%</div>
                <div className="text-xs text-indigo-700">Health</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>

      {/* Chat Interface */}
      {showChat && (
        <ChatInterface onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default Index;
