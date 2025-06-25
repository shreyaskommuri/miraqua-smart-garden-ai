
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Droplets, 
  Thermometer, 
  Sun, 
  Clock,
  Calendar,
  Play,
  Edit,
  Save,
  X
} from "lucide-react";

const SpecificDayScreen = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [waterDuration, setWaterDuration] = useState(15);
  const [notes, setNotes] = useState("");
  const [isWatering, setIsWatering] = useState(false);

  // Mock data - in real app this would come from API
  const dayData = {
    date: `December ${date}, 2024`,
    scheduledTime: "6:00 AM",
    scheduledVolume: "2.5L",
    estimatedDuration: "15 minutes",
    status: "scheduled", // scheduled, completed, skipped
    moisture: 65,
    temperature: 73,
    sunlight: 85,
    weather: "Sunny, 75°F",
    notes: "Plants looking healthy. No signs of stress."
  };

  const handleWaterNow = () => {
    setIsWatering(true);
    // Simulate watering process
    setTimeout(() => {
      setIsWatering(false);
      // In real app, this would update the backend
      navigate(`/plot/${id}`);
    }, 3000);
  };

  const handleSaveNotes = () => {
    setIsEditing(false);
    // In real app, this would save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
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
              <h1 className="text-lg font-semibold text-gray-900">{dayData.date}</h1>
              <p className="text-sm text-gray-500">Tomato Garden</p>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Schedule Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-bold">Today's Schedule</h2>
                  <p className="text-sm opacity-90">Planned watering session</p>
                </div>
              </div>
              <Badge className={`${
                dayData.status === 'completed' ? 'bg-green-100 text-green-700' :
                dayData.status === 'skipped' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              } border-0`}>
                {dayData.status === 'completed' ? 'Completed' :
                 dayData.status === 'skipped' ? 'Skipped' : 'Scheduled'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 opacity-80" />
                <div className="text-lg font-bold">{dayData.scheduledTime}</div>
                <div className="text-xs opacity-80">Time</div>
              </div>
              <div className="text-center">
                <Droplets className="w-5 h-5 mx-auto mb-2 opacity-80" />
                <div className="text-lg font-bold">{dayData.scheduledVolume}</div>
                <div className="text-xs opacity-80">Volume</div>
              </div>
              <div className="text-center">
                <Play className="w-5 h-5 mx-auto mb-2 opacity-80" />
                <div className="text-lg font-bold">{dayData.estimatedDuration}</div>
                <div className="text-xs opacity-80">Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Snapshot */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Environmental Snapshot</CardTitle>
            <p className="text-sm text-gray-600">{dayData.weather}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">{dayData.moisture}%</div>
                <div className="text-xs text-blue-700">Moisture</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-900">{dayData.temperature}°F</div>
                <div className="text-xs text-orange-700">Temperature</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-900">{dayData.sunlight}%</div>
                <div className="text-xs text-yellow-700">Sunlight</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Now Section */}
        {dayData.status === 'scheduled' && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Manual Watering</CardTitle>
              <p className="text-sm text-gray-600">Water your plants now if needed</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={waterDuration}
                  onChange={(e) => setWaterDuration(parseInt(e.target.value))}
                  min="1"
                  max="60"
                  className="h-12"
                />
              </div>
              
              <Button
                onClick={handleWaterNow}
                disabled={isWatering}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isWatering ? (
                  <>
                    <Droplets className="w-5 h-5 mr-2 animate-pulse" />
                    Watering... ({waterDuration}min)
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Water Now ({waterDuration} minutes)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notes</CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={handleSaveNotes}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={notes || dayData.notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your observations..."
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {notes || dayData.notes || "No notes added yet."}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weather Impact */}
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-900">Weather Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-800 leading-relaxed">
              Today's sunny conditions are perfect for your tomatoes. The moderate temperature 
              and good sunlight will help with photosynthesis. No rain expected, so proceed 
              with scheduled watering.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default SpecificDayScreen;
