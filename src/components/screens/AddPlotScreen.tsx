
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, MapPin, Calendar } from "lucide-react";

const AddPlotScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    crop: "",
    size: "",
    location: "",
    notes: ""
  });
  const [selectedCrop, setSelectedCrop] = useState("");

  const popularCrops = [
    { id: "tomatoes", name: "Tomatoes", icon: "🍅" },
    { id: "herbs", name: "Herbs", icon: "🌿" },
    { id: "lettuce", name: "Lettuce", icon: "🥬" },
    { id: "peppers", name: "Peppers", icon: "🌶️" },
    { id: "carrots", name: "Carrots", icon: "🥕" },
    { id: "cucumbers", name: "Cucumbers", icon: "🥒" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add plot logic here
    navigate("/");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Add New Plot</h1>
              <p className="text-sm text-gray-500">Create a new garden plot</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Basic Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Plot Name</Label>
              <Input
                id="name"
                placeholder="e.g., Front Yard Tomatoes"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700">Crop Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {popularCrops.map((crop) => (
                  <Button
                    key={crop.id}
                    type="button"
                    variant={selectedCrop === crop.id ? "default" : "outline"}
                    onClick={() => {
                      setSelectedCrop(crop.id);
                      updateFormData("crop", crop.name);
                    }}
                    className="h-12 flex flex-col items-center justify-center text-xs"
                  >
                    <span className="text-lg mb-1">{crop.icon}</span>
                    {crop.name}
                  </Button>
                ))}
              </div>
              {selectedCrop && (
                <Input
                  placeholder="Or specify another crop"
                  value={formData.crop}
                  onChange={(e) => updateFormData("crop", e.target.value)}
                  className="h-10"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location & Size */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Location & Size</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Backyard, Greenhouse, Balcony"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-gray-700">Plot Size</Label>
              <Input
                id="size"
                placeholder="e.g., 4x4 feet, 2x6 meters"
                value={formData.size}
                onChange={(e) => updateFormData("size", e.target.value)}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Preview */}
        <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Watering Schedule Preview</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">First watering:</span>
                <Badge className="bg-green-100 text-green-700">Tomorrow 6:00 AM</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Frequency:</span>
                <Badge variant="outline">Every 2-3 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount:</span>
                <Badge variant="outline">~2.5L per session</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any special requirements, soil type, previous growing experience..."
              value={formData.notes}
              onChange={(e) => updateFormData("notes", e.target.value)}
              className="min-h-20"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!formData.name || !formData.crop}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Plot
        </Button>
      </form>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default AddPlotScreen;
