
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Droplets, Leaf, Smartphone, Bot, ArrowRight, Check } from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Droplets,
      title: "Smart Watering",
      description: "AI-optimized irrigation schedules based on weather, soil, and plant needs"
    },
    {
      icon: Leaf,
      title: "Plant Health",
      description: "Real-time monitoring with actionable insights for healthier crops"
    },
    {
      icon: Smartphone,
      title: "Remote Control",
      description: "Manage your garden from anywhere with our mobile-first design"
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Get expert gardening advice and troubleshooting 24/7"
    }
  ];

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollArea className="h-screen">
        <div className="px-6 py-12 pb-32 min-h-screen">
          {/* Hero Section */}
          <div className="text-center mb-12 mt-8">
            <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to
              <span className="block text-green-600 mt-2">
                Miraqua
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
              The smartest way to water your garden. Save water, grow better, live sustainably.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <Check className="w-5 h-5 text-green-500 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats */}
          <Card className="border-0 bg-green-500 text-white mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 text-center">Join Thousands of Smart Gardeners</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">50M+</div>
                  <div className="text-xs opacity-90">Gallons Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs opacity-90">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs opacity-90">AI Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 space-y-4">
        <Button
          onClick={handleGetStarted}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-xl"
        >
          Get Started - It's Free
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <Button
          onClick={handleSignIn}
          variant="outline"
          className="w-full h-12 border-gray-300 text-gray-700 rounded-xl"
        >
          I Already Have an Account
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
