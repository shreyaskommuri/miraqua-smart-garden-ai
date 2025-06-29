
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UserProfileScreen = () => {
  const navigate = useNavigate();

  // This redirects to AccountScreen since they have the same functionality
  React.useEffect(() => {
    navigate('/account');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold">User Profile</h1>
          </div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to account settings...</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;
