import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Mic, Camera, Droplets, Thermometer, Sun, MapPin, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlotData {
  id: number;
  name: string;
  crop: string;
  moisture: number;
  temperature: number;
  sunlight: number;
  status: string;
  nextWatering: string;
  location: string;
  waterUsage: number;
  sensorStatus: string;
  batteryLevel: number;
  soilPh: number;
  lastWatered: string;
}

const FarmerChatScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your AI irrigation assistant. I can help you optimize watering schedules, diagnose plant issues, and provide expert gardening advice.",
      time: "now"
    }
  ]);

  useEffect(() => {
    // Check if we have plot data from navigation
    const plotData = sessionStorage.getItem('selectedPlotForChat');
    if (plotData) {
      const plot = JSON.parse(plotData);
      setSelectedPlot(plot);
      
      // Add initial message about the selected plot
      const plotMessage = {
        id: Date.now(),
        sender: "bot" as const,
        text: `I see you're asking about your ${plot.name}. Here's what I know: It's growing ${plot.crop} with ${plot.moisture}% soil moisture, ${plot.temperature}°F temperature, and ${plot.sunlight}% sunlight. The sensor battery is at ${plot.batteryLevel}% and pH is ${plot.soilPh}. How can I help optimize this plot?`,
        time: "now"
      };
      
      setMessages(prev => [...prev, plotMessage]);
      
      // Clear the session storage
      sessionStorage.removeItem('selectedPlotForChat');
    }
  }, []);

  const quickActions = selectedPlot ? [
    `Water ${selectedPlot.name} now`,
    `Skip next watering for ${selectedPlot.name}`,
    `Check ${selectedPlot.crop} health`,
    `Optimize ${selectedPlot.name} schedule`,
    "Weather impact analysis",
    `${selectedPlot.crop} care tips`
  ] : [
    "Water my plants now",
    "Skip next watering",
    "Plant health check",
    "Adjust schedule",
    "Weather impact",
    "Fertilizer advice"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user" as const,
        text: message,
        time: "now"
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate AI response with plot context
      setTimeout(() => {
        let botResponse = "I understand your concern. Let me analyze your garden data and provide personalized recommendations.";
        
        if (selectedPlot) {
          if (message.toLowerCase().includes('water')) {
            botResponse = `Based on ${selectedPlot.name}'s current moisture level of ${selectedPlot.moisture}%, I ${selectedPlot.moisture < 50 ? 'recommend watering soon' : 'suggest waiting until tomorrow'}. The soil pH of ${selectedPlot.soilPh} is ${selectedPlot.soilPh > 7 ? 'slightly alkaline' : selectedPlot.soilPh < 6.5 ? 'slightly acidic' : 'optimal'} for ${selectedPlot.crop}.`;
          } else if (message.toLowerCase().includes('health') || message.toLowerCase().includes('problem')) {
            botResponse = `Your ${selectedPlot.name} shows ${selectedPlot.status} status. With ${selectedPlot.sunlight}% sunlight and ${selectedPlot.temperature}°F temperature, conditions are ${selectedPlot.temperature > 80 ? 'quite warm' : selectedPlot.temperature < 60 ? 'cool' : 'good'} for ${selectedPlot.crop}. ${selectedPlot.batteryLevel < 30 ? 'Note: The sensor battery is low and should be replaced soon.' : ''}`;
          } else if (message.toLowerCase().includes('schedule')) {
            botResponse = `For ${selectedPlot.name}, the next watering is scheduled for ${selectedPlot.nextWatering}. Based on current moisture (${selectedPlot.moisture}%) and weather conditions, this timing looks ${selectedPlot.moisture > 70 ? 'possibly too frequent - consider extending the interval' : 'appropriate'}.`;
          }
        }
        
        const aiMessage = {
          id: messages.length + 2,
          sender: "bot" as const,
          text: botResponse,
          time: "now"
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleChatWithPlot = (plot: PlotData) => {
    sessionStorage.setItem('selectedPlotForChat', JSON.stringify(plot));
    navigate('/app/chat');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Selected Plot Info */}
      {selectedPlot && (
        <div className="bg-green-50 border-b border-green-100 p-4 flex-shrink-0">
          <Card className="border-green-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{selectedPlot.name}</h3>
                  <p className="text-sm text-gray-600">{selectedPlot.crop} • {selectedPlot.location}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-600">{selectedPlot.moisture}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-gray-600">{selectedPlot.temperature}°F</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sun className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{selectedPlot.sunlight}%</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${selectedPlot.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {selectedPlot.status === 'healthy' ? 'Healthy' : 'Attention'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white border-b border-gray-100 p-4 flex-shrink-0">
        <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.slice(0, 4).map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setMessage(action)}
              className="text-xs h-8 px-2"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-br from-green-500 to-blue-600'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Garden Status Summary at bottom of messages */}
        <div className="mt-6">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {selectedPlot ? `${selectedPlot.name} Status` : 'Garden Status'}
                    </p>
                    <p className="text-xs text-green-700">
                      {selectedPlot 
                        ? `${selectedPlot.status} • Next watering: ${selectedPlot.nextWatering}`
                        : 'All plots monitored • AI optimization active'
                      }
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {selectedPlot?.status === 'healthy' ? 'Optimal' : 'Monitoring'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="w-10 h-10 p-0">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="w-10 h-10 p-0">
            <Mic className="w-4 h-4" />
          </Button>
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder={selectedPlot 
                ? `Ask about your ${selectedPlot.name}...` 
                : "Ask me anything about your garden..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="h-10"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
              className="w-10 h-10 p-0 bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerChatScreen;
