
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import {
  Plus,
  Search,
  Settings,
  Bell,
  BarChart3,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlotCard from "@/components/PlotCard";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1200));
      } catch (err) {
        setError("Failed to load plots");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mockPlots = [
    {
      id: "1",
      name: "Cherry Tomato Garden",
      crop: "Cherry Tomatoes",
      variety: "Sweet 100",
      location: "Backyard Plot A",
      currentTemp: 72,
      currentMoisture: 68,
      currentSunlight: 85,
      healthScore: 87,
      nextWatering: "Tomorrow 6:00 AM",
      lastWatered: "2 hours ago",
      isOnline: true,
      coordinates: {
        lat: 37.7749,
        lon: -122.4194
      }
    },
    {
      id: "2", 
      name: "Herb Garden",
      crop: "Mixed Herbs",
      variety: "Basil & Rosemary",
      location: "Kitchen Window",
      currentTemp: 70,
      currentMoisture: 55,
      currentSunlight: 92,
      healthScore: 92,
      nextWatering: "Today 8:00 PM",
      lastWatered: "6 hours ago",
      isOnline: true,
      coordinates: {
        lat: 37.7849,
        lon: -122.4094
      }
    },
    {
      id: "3",
      name: "Pepper Patch",
      crop: "Bell Peppers",
      variety: "California Wonder",
      location: "Side Garden",
      currentTemp: 75,
      currentMoisture: 42,
      currentSunlight: 78,
      healthScore: 73,
      nextWatering: "In 2 hours",
      lastWatered: "1 day ago",
      isOnline: false,
      coordinates: {
        lat: 37.7649,
        lon: -122.4294
      }
    }
  ];

  const filteredPlots = mockPlots.filter(plot =>
    plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6 space-y-6">
          <div className="animate-pulse">
            <div className="h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6"></div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Oops! Something went wrong</h3>
              <p className="text-red-600 dark:text-red-300 mb-6 text-lg">{error}</p>
              <Button onClick={() => window.location.reload()} size="lg" className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="glass border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🌱</span>
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Gardens</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage and monitor your plots</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="btn-modern">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="btn-modern">
                <BarChart3 className="w-4 h-4" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="btn-modern" onClick={() => navigate("/app/account")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-6 space-y-6 pb-24">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search plots..."
              className="rounded-full pl-10 pr-4 shadow-lg glass border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {filteredPlots.filter(p => p.isOnline).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <Wifi className="w-4 h-4 mr-1" />
                  Online Plots
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {Math.round(filteredPlots.reduce((sum, p) => sum + p.currentMoisture, 0) / filteredPlots.length)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Moisture
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {Math.round(filteredPlots.reduce((sum, p) => sum + p.healthScore, 0) / filteredPlots.length)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Health
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plots Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Plots ({filteredPlots.length})
              </h2>
            </div>
            
            {filteredPlots.length === 0 ? (
              <Card className="glass border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {searchQuery ? 'No plots found' : 'No plots yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchQuery 
                      ? `No plots match "${searchQuery}". Try adjusting your search.`
                      : 'Create your first plot to start monitoring your garden.'
                    }
                  </p>
                  {!searchQuery && (
                    <Button 
                      onClick={() => navigate("/add-plot")}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white btn-modern"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Plot
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlots.map(plot => (
                  <PlotCard key={plot.id} plot={plot} />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <Button
          onClick={() => navigate("/add-plot")}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0 btn-modern"
        >
          <Plus className="w-6 h-6 mr-3" />
          Add New Plot
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
