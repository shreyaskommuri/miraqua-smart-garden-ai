
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Smartphone, TrendingUp, Shield, ArrowRight } from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Droplets,
      title: "Smart Watering",
      description: "AI-powered irrigation schedules that adapt to weather and soil conditions"
    },
    {
      icon: Smartphone,
      title: "Mobile Control",
      description: "Monitor and control your garden from anywhere with real-time notifications"
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track plant health, water usage, and harvest predictions with detailed insights"
    },
    {
      icon: Shield,
      title: "Plant Protection",
      description: "Early disease detection and weather alerts to keep your plants safe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Miraqua
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Transform your garden with AI-powered smart irrigation and plant care
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-blue-600 text-white mb-12">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-6 text-center">
              Join thousands of smart gardeners
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-sm opacity-90">Gardens</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">30%</div>
                <div className="text-sm opacity-90">Water Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-sm opacity-90">App Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/onboarding/crop")}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold shadow-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Skip for now
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Setup takes less than 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
