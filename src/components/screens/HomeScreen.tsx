
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Calendar, 
  Search, 
  Filter, 
  Plus,
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Clock
} from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const summaryStats = [
    { label: "Active Plots", value: "8", change: "+2", trend: "up", icon: MapPin },
    { label: "Water Saved", value: "142L", change: "-8%", trend: "down", icon: Droplets },
    { label: "Next Watering", value: "2h 15m", change: "", trend: "neutral", icon: Clock },
  ];

  const recentPlots = [
    {
      id: 1,
      name: "Tomato Garden",
      crop: "Tomatoes",
      moisture: 65,
      temperature: 73,
      sunlight: 85,
      nextWater: "2h 15m",
      status: "optimal",
      location: "North Yard"
    },
    {
      id: 2,
      name: "Herb Corner",
      crop: "Basil & Oregano",
      moisture: 45,
      temperature: 71,
      sunlight: 78,
      nextWater: "4h 30m",
      status: "needs-water",
      location: "Kitchen Window"
    },
    {
      id: 3,
      name: "Pepper Patch",
      crop: "Bell Peppers",
      moisture: 72,
      temperature: 75,
      sunlight: 92,
      nextWater: "6h 45m",
      status: "optimal",
      location: "South Garden"
    },
  ];

  const recentActivity = [
    { id: 1, action: "Watered Tomato Garden", time: "2 hours ago", type: "water" },
    { id: 2, action: "Added new plot: Herb Corner", time: "1 day ago", type: "add" },
    { id: 3, action: "Schedule adjusted for rain", time: "2 days ago", type: "schedule" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-green-100 text-green-700 border-green-200";
      case "needs-water": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overwatered": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handlePlotClick = (plotId: number) => {
    navigate(`/plot/${plotId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Good Morning, Sarah
              </h1>
              <p className="text-gray-600">Let's check on your garden</p>
            </div>
            <Button variant="outline" size="sm" className="p-2">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search plots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-11 bg-white/50"
            />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {summaryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                    {stat.change && (
                      <div className={`flex items-center space-x-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-xs font-medium">{stat.change}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                <p className="text-sm opacity-90">Manage your garden efficiently</p>
              </div>
              <Button 
                onClick={() => navigate('/add-plot')}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plots Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Plots</h2>
            <Badge variant="outline" className="text-sm">
              {recentPlots.length} Active
            </Badge>
          </div>
          
          <div className="space-y-4">
            {recentPlots.map((plot) => (
              <Card 
                key={plot.id} 
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handlePlotClick(plot.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{plot.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(plot.status)}`}>
                          {plot.status === 'optimal' ? 'Optimal' : 
                           plot.status === 'needs-water' ? 'Needs Water' : 'Overwatered'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{plot.crop}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {plot.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{plot.nextWater}</p>
                      <p className="text-xs text-gray-500">Next water</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{plot.moisture}%</span>
                      </div>
                      <Progress value={plot.moisture} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Moisture</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">{plot.temperature}°F</span>
                      </div>
                      <Progress value={(plot.temperature - 50) * 2} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Temperature</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{plot.sunlight}%</span>
                      </div>
                      <Progress value={plot.sunlight} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Sunlight</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'water' ? 'bg-blue-500' :
                  activity.type === 'add' ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default HomeScreen;
