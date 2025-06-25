
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Droplets, Calendar, Bell, ArrowRight } from "lucide-react";

const OnboardingCompleteScreen = () => {
  const navigate = useNavigate();

  const completedSteps = [
    { title: "Plot Created", description: "Tomato Garden is ready to go", icon: Check },
    { title: "Schedule Generated", description: "AI-optimized watering plan created", icon: Calendar },
    { title: "Notifications Set", description: "You'll get alerts for important events", icon: Bell },
  ];

  const handleContinue = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-scale-in">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            You're All Set! 🎉
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your smart garden is ready to flourish
          </p>
        </div>

        {/* Completion Summary */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6 space-y-4">
            {completedSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">What's Next?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Droplets className="w-4 h-4" />
                <span>Your first watering is scheduled for tomorrow at 6:00 AM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4" />
                <span>You'll receive notifications for all watering events</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4" />
                <span>View and adjust your schedule anytime in the app</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <Card className="border-0 shadow-lg bg-amber-50 border-amber-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Pro Tip</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Check your garden daily during the first week. Our AI learns from your feedback 
                  and adjusts the schedule for optimal results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Start Growing
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCompleteScreen;
