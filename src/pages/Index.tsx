
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Sun, Calendar, MessageSquare, Plus } from "lucide-react";
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
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Miraqua
                </h1>
                <p className="text-sm text-gray-500">Smart Irrigation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowChat(!showChat)}
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
              <Button
                onClick={() => setShowOnboarding(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>
                Moisture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 mb-2">75%</div>
              <Progress value={75} className="h-1.5 mb-2" />
              <p className="text-sm text-gray-500">Optimal range</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                  <Thermometer className="w-4 h-4 text-orange-600" />
                </div>
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 mb-2">73°F</div>
              <p className="text-sm text-gray-500 mt-4">Perfect conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center mr-3">
                  <Sun className="w-4 h-4 text-yellow-600" />
                </div>
                Sunlight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900 mb-2">885 lux</div>
              <p className="text-sm text-gray-500 mt-4">Bright conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-gray-700 font-medium">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                Next Watering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-gray-900">Today</div>
              <div className="text-lg text-gray-700">6:00 AM</div>
              <p className="text-sm text-gray-500 mt-1">In 8 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Plot List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Plots</h2>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0">
            {plots.length} Active
          </Badge>
        </div>

        {plots.length === 0 ? (
          <Card className="bg-white border-0 shadow-sm text-center py-16">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No plots yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">Start by adding your first plot to begin smart irrigation monitoring</p>
              <Button
                onClick={() => setShowOnboarding(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Plot
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plots.map((plot) => (
              <PlotCard key={plot.id} plot={plot} />
            ))}
          </div>
        )}
      </div>

      {/* Chat Interface */}
      {showChat && (
        <ChatInterface onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default Index;
