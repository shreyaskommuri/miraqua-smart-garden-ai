
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Mic, Camera, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FarmerChatScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your AI garden assistant. How can I help you today?",
      time: "now"
    },
    {
      id: 2,
      sender: "user",
      text: "My tomato leaves are turning yellow",
      time: "2m ago"
    },
    {
      id: 3,
      sender: "bot",
      text: "Yellow leaves on tomatoes can indicate several issues. Let me help you diagnose this. Are the yellow leaves at the bottom of the plant or throughout?",
      time: "2m ago"
    }
  ]);

  const quickActions = [
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
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: "bot" as const,
          text: "I understand your concern. Let me analyze your garden data and provide personalized recommendations.",
          time: "now"
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Garden Assistant</h1>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <div className="w-9"></div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="bg-white border-b border-gray-100 p-4">
        <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.slice(0, 4).map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setMessage(action)}
              className="text-xs h-8"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
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
                  : 'bg-gradient-to-br from-purple-500 to-blue-600'
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
      </div>

      {/* Garden Status */}
      <div className="bg-white border-t border-gray-100 p-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Droplets className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Garden Status</p>
                  <p className="text-xs text-green-700">All plots healthy • Next watering in 6h</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Optimal
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="w-10 h-10 p-0">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="w-10 h-10 p-0">
            <Mic className="w-4 h-4" />
          </Button>
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder="Ask me anything about your garden..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="h-10"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
              className="w-10 h-10 p-0 bg-purple-600 hover:bg-purple-700"
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
