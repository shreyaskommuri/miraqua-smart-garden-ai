
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="relative z-10 px-6 py-12 pb-32 min-h-screen">
          {/* Hero Section - Full-screen hero illustration/video */}
          <div className="text-center mb-8 mt-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-green-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-scale-in">
              <Droplets className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
                Miraqua
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-sm mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The smartest way to water your garden. Save water, grow better, live sustainably.
            </p>
          </div>

          {/* 3-4 "Why Miraqua" benefit bullets with icons */}
          <div className="flex-1 mb-8">
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
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
          </div>

          {/* Stats Preview */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-8 mx-auto max-w-md w-full animate-fade-in" style={{ animationDelay: '0.7s' }}>
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

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              No credit card required • Start in under 2 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Sticky "Get Started" button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <Button
          onClick={handleGetStarted}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Get Started - It's Free
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <Button
          onClick={handleSignIn}
          variant="outline"
          className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
        >
          I Already Have an Account
        </Button>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
