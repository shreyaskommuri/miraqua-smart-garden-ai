
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // This is a wrapper that navigates through the onboarding flow
  React.useEffect(() => {
    // Redirect to the onboarding flow
    navigate('/onboarding/crop');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold">Add New Plot</h1>
          </div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to plot setup...</p>
        </div>
      </div>
    </div>
  );
};

export default AddPlotScreen;
