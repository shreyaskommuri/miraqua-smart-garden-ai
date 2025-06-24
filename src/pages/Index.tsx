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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Miraqua
                </h1>
                <p className="text-sm text-green-600">AI Irrigation Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowChat(!showChat)}
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                onClick={() => setShowOnboarding(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-green-700">
                <Droplets className="w-5 h-5 mr-2" />
                Avg Moisture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">75%</div>
              <Progress value={75} className="mt-2 h-2" />
              <p className="text-sm text-green-600 mt-2">Optimal range</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-orange-700">
                <Thermometer className="w-5 h-5 mr-2" />
                Avg Temp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800">73°F</div>
              <p className="text-sm text-orange-600 mt-4">Perfect conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-yellow-700">
                <Sun className="w-5 h-5 mr-2" />
                Avg Light
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-800">885 lux</div>
              <p className="text-sm text-yellow-600 mt-4">Bright conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Calendar className="w-5 h-5 mr-2" />
                Next Watering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-800">Today</div>
              <div className="text-lg text-blue-700">6:00 AM</div>
              <p className="text-sm text-blue-600 mt-1">In 8 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Plot List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Your Plots</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {plots.length} Active Plots
          </Badge>
        </div>

        {plots.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-sm border-green-100 text-center py-16">
            <CardContent>
              <Droplets className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">No plots yet</h3>
              <p className="text-green-600 mb-6">Start by adding your first plot to begin smart irrigation</p>
              <Button
                onClick={() => setShowOnboarding(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
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
