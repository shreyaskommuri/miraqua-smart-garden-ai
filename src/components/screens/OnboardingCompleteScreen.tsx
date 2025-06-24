
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Droplets, Calendar, TrendingUp, ArrowRight } from "lucide-react";

const OnboardingCompleteScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Droplets,
      title: "Smart Watering Schedule",
      description: "Personalized irrigation plan based on your crop and location"
    },
    {
      icon: Calendar,
      title: "Daily Reminders",
      description: "Never miss a watering with intelligent notifications"
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor your garden's health and optimize over time"
    }
  ];

  const handleGetStarted = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="px-6 py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            You're All Set! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
            Your smart garden is ready to grow. Let's start nurturing your plants!
          </p>
        </div>

        {/* What's Ready */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Your Garden Profile
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="opacity-90">Crop:</span>
                <span className="font-semibold">Tomatoes 🍅</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Location:</span>
                <span className="font-semibold">San Francisco, CA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Schedule:</span>
                <span className="font-semibold">Daily Flexibility</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">First watering:</span>
                <span className="font-semibold">Tomorrow 6:00 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold shadow-lg"
          >
            Start Growing
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              You can always adjust these settings later in your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCompleteScreen;
